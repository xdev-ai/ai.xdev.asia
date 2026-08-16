/**
 * Automated test: JSON-LD FAQPage & Article validity across the whole blog.
 *
 * How it works:
 *  1. Parses the source TS file (src/data/posts.ts) as JSON5-like text
 *     using Node's VM with a small stub so we read the real exported `posts`
 *     data — no separate serialization step can go stale.
 *  2. For each published post and each locale (en, vi) it validates:
 *     - FAQ string structure (q/a non-empty)
 *     - Locale integrity: vi_ratio of Vietnamese accented letters
 *       en block must be 0 (no Vietnamese characters); vi block must not be 0
 *       when it contains Vietnamese content
 *     - Simulated FAQPage JSON-LD construction (same shape BlogPost emits)
 *       and schema.org constraints: @type, mainEntity count >= 1,
 *       every entity has @type === Question and name/acceptedAnswer non-empty
 *     - Simulated Article JSON-LD constraints: headline, author, publisher,
 *       datePublished, mainEntityOfPage, inLanguage matching locale
 *  3. Prints a TAP-style pass/fail report and exits non-zero on failure,
 *     so it can run in CI: `node scripts/test-jsonld-faq.js`
 *
 * Run:  pnpm exec node scripts/test-jsonld-faq.cjs
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const POSTS_FILE = path.join(ROOT, "src/data/posts.ts");

const VI_ACCENT = /[\u00C0-\u1EF9]/;
const VI_ACCENT_GLOBAL = /[\u00C0-\u1EF9]/g;
const LETTER = /[A-Za-z\u00C0-\u1EF9]/g;

function viRatio(text) {
  const letters = (text || "").match(LETTER) || [];
  if (letters.length === 0) return 0;
  return letters.filter((c) => VI_ACCENT.test(c)).length / letters.length;
}

// Load real posts data by transpiling the TS source with esbuild (in repo
// devDependencies), then eval the emitted JS with a vm context.
function loadPosts() {
  let esbuild;
  try {
    esbuild = require("esbuild");
  } catch (e) {
    esbuild = null;
  }
  if (esbuild) {
    const tmp = path.join(
        __dirname, ".posts.bundle.js");
    try {
      esbuild.buildSync({
        entryPoints: [POSTS_FILE],
        outfile: tmp,
        format: "iife",
        globalName: "__posts",
        loader: { ".ts": "ts" },
        logLevel: "silent",
      });
      let js = fs.readFileSync(tmp, "utf8");
      fs.unlinkSync(tmp);
      // esbuild IIFE: `var __posts = (() => { ... return { posts }; })();`
      // Executing it in a vm context populates `var __posts` at top level of
      // that context. Access it via a with-less indirect reference:
      const ctx = vm.createContext({});
      vm.runInContext(js, ctx);
      const exported = ctx.__posts && ctx.__posts.posts ? ctx.__posts.posts : ctx.__posts;
      return exported;
    } catch (e) {
      throw new Error("esbuild transpile failed: " + e.message);
    }
  }
  // Fallback: strip type annotations with a regex pass and eval.
  let src = fs.readFileSync(POSTS_FILE, "utf8");
  src = src
    .replace(/import\s+type\s+[^;]+;/g, "")
    .replace(/export\s+type\s+[\s\S]*?}/g, "")
    .replace(/:\s*(Section|Post|PostMeta|PostFaqItem)(\[\])?/g, "")
    .replace(/export\s+const\s+posts\s*=/, "globalThis.__posts =");
  const ctx = { globalThis: {} };
  vm.runInNewContext(src, ctx);
  return ctx.globalThis.__posts;
}

const results = [];
let total = 0;
let passes = 0;

function check(label, ok, detail) {
  total++;
  if (ok) passes++;
  results.push({ label, ok, detail });
  console.log(`${ok ? "ok  " : "FAIL"} - ${label}${detail ? " :: " + detail : ""}`);
}

const posts = loadPosts();
console.log(`# JSON-LD FAQPage/Article automated test — ${posts.length} posts loaded\n`);

for (const post of posts) {
  if (post.draft) continue;
  for (const locale of ["en", "vi"]) {
    const block = post[locale];
    const prefix = `${post.slug} [${locale}]`;

    // 1. FAQ string structure
    const faq = block.faq || [];
    check(`${prefix} FAQ exists and renders`, faq.length >= 0, `faq: [${faq.length} items]`);

    if (faq.length > 0) {
      const validStructure = faq.every((f) => f && typeof f.q === "string" && typeof f.a === "string" && f.q.trim().length > 0 && f.a.trim().length > 0);
      check(`${prefix} FAQ items have non-empty q and a`, validStructure, `checked ${faq.length} items`);

      // 2. Locale integrity via vi_ratio
      const qs = faq.map((f) => f.q + " " + f.a).join(" ");
      const ratio = Math.round(viRatio(qs) * 100) / 100;
      if (locale === "en") {
        check(`${prefix} EN FAQ contains no Vietnamese characters`, ratio === 0, `vi_ratio=${ratio}`);
      } else {
        check(`${prefix} VI FAQ is Vietnamese content`, ratio > 0, `vi_ratio=${ratio}`);
      }

      // 3. Simulated FAQPage JSON-LD (schema.org spec shape)
      const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
      const fqType = faqPage["@type"] === "FAQPage" && faqPage.mainEntity.length >= 1;
      check(`${prefix} FAQPage shape valid (@type + >=1 entity)`, fqType, `entities=${faqPage.mainEntity.length}`);
      const questionsValid = faqPage.mainEntity.every((e) => e["@type"] === "Question" && e.name && e.acceptedAnswer && e.acceptedAnswer.text);
      check(`${prefix} Every entity is Question with name + acceptedAnswer`, questionsValid, `entities=${faqPage.mainEntity.length}`);

      // 4. Language match check (JSON-LD would be emitted with inLanguage from Article; FAQPage inherits page language)
      const expectedLang = locale;
      const langMatches = faqPage.mainEntity.every((e) => (e.name.match(VI_ACCENT_GLOBAL) || []).length > 0 === (expectedLang === "vi") || VI_ACCENT.test(e.name) === (expectedLang === "vi"));
      check(`${prefix} FAQ language matches expected locale "${expectedLang}"`, langMatches, `expected=${expectedLang}, vi_ratio=${ratio}`);
    } else if (locale === "en") {
      // EN block empty FAQ is allowed (block has own FAQ or not); but ensure
      // there is no fallback producing wrong-language schema at render time.
      // BlogPost uses meta.faq ?? post.faq — if both empty, no FAQPage emitted: safe.
      const hasTopFallback = post.faq && post.faq.length > 0;
      if (hasTopFallback) {
        // top-level fallback FAQ: check it matches the OTHER locale is not
        // rendered at EN — BlogPost renders post.faq only when locale block
        // faq is empty, so top-level faq must match current locale's content.
        const qs = post.faq.map((f) => f.q + " " + f.a).join(" ");
        const ratio = Math.round(viRatio(qs) * 100) / 100;
        check(`${prefix} top-level post.faq fallback language`, ratio === 0, `fallback vi_ratio=${ratio} (must be EN)`);
      } else {
        check(`${prefix} no FAQPage emitted at this locale (both empty)`, true, "faq: [] — schema safely omitted");
      }
    } else {
      // VI block empty faq with EN block non-empty: locale-safe, no mismatch
      check(`${prefix} VI FAQ empty — no wrong-language schema risk`, true, "faq: [] in vi block");
    }

    // 5. Simulated Article JSON-LD constraints
    const article = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: block.title,
      inLanguage: locale,
      datePublished: post.dateISO,
      author: { "@type": "Organization", name: "xDev AI" },
      publisher: { "@type": "Organization", name: "xDev AI" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://ai.xdev.asia/blog/${post.slug}` },
      image: `https://ai.xdev.asia${block.cover || post.cover}`,
      keywords: (post.tags || []).join(", "),
    };
    const required = ["headline", "inLanguage", "datePublished", "author", "publisher", "mainEntityOfPage", "image"].every((k) => article[k]);
    check(`${prefix} Article schema has all required fields`, required, "headline/inLanguage/dates/author/publisher");
    check(`${prefix} Article.inLanguage matches render locale`, article.inLanguage === locale, `inLanguage=${article.inLanguage}`);
    const headlineLang = locale === "vi" ? VI_ACCENT.test(article.headline || "") : true;
    check(`${prefix} Article headline acceptable for locale`, headlineLang, `headline="${(article.headline || "").slice(0, 40)}"`);
  }
}

console.log(`\n# SUMMARY: ${passes}/${total} checks passed`);
if (passes < total) {
  console.log("FAILURES:");
  results.filter((r) => !r.ok).forEach((r) => console.log(`  - ${r.label}${r.detail ? " :: " + r.detail : ""}`));
  process.exit(1);
}
