"use client";
/* Blog post detail: bilingual EN/VI, JSON-LD Article + FAQPage, OG meta per-post, newsletter CTA. */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { posts } from "@/data/posts-data";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Github, Linkedin, Mail, Menu, Tag, X } from "lucide-react";
import { ArticleTable } from "@/components/ArticleTable";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import NewsletterForm from "@/components/NewsletterForm";
import { useLang } from "@/i18n/LanguageContext";
import type { Post } from "@/data/posts-data";
function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return locale === "vi"
    ? d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogPostClient({ post }: { post: Post }) {
    const { t, locale } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  useEffect(() => {
    document.title = post
      ? `${locale === "vi" ? post.vi.title : post.en.title} — xDev AI Blog`
      : "Post not found — xDev AI";
  }, [post, locale]);

  useEffect(() => {
    if (!post) {
      return;
    }
    const meta_ = locale === "vi" ? post.vi : post.en;
    
  }, [post, locale]);

  const index = posts.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? posts[index - 1] : undefined;
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#eef4f2] px-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[#142641]">Post not found</h1>
        <p className="mt-2 text-[14px] text-[#52697c]">The requested article does not exist or has been removed.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0a6e7f] hover:underline">
          <ArrowLeft size={15} /> {t.blog.backToBlog}
        </Link>
      </div>
    );
  }

  const meta = locale === "vi" ? post.vi : post.en;

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.summary,
      datePublished: post.dateISO,
      dateModified: post.dateISO,
      inLanguage: locale === "vi" ? "vi" : "en",
      author: { "@type": "Organization", name: "xDev AI", url: "https://ai.xdev.asia" },
      publisher: { "@type": "Organization", name: "xDev AI", url: "https://ai.xdev.asia", logo: "https://ai.xdev.asia/brand/xdevai-mark-512.png" },
      mainEntityOfPage: `https://ai.xdev.asia/blog/${post.slug}`,
      url: `https://ai.xdev.asia/blog/${post.slug}`,
      keywords: post.tags.join(", "),
      image: `https://ai.xdev.asia${post.cover}`,
    }),
    [meta, post, locale],
  );

  const jsonLdFaq = useMemo(() => {
    const faqList = meta.faq ?? post.faq ?? [];
    if (!faqList.length) return null;
    const lang = locale === "vi" ? "vi" : "en";
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((f) => ({
        "@type": "Question",
        name: typeof f.q === "string" ? f.q : f.q[lang as "en" | "vi"],
        acceptedAnswer: {
          "@type": "Answer",
          text: typeof f.a === "string" ? f.a : f.a[lang as "en" | "vi"],
        },
      })),
    };
  }, [post, locale, meta]);

  const faqs = meta.faq ?? post.faq ?? [];
  const faqLang: "en" | "vi" = locale === "vi" ? "vi" : "en";
  const faqQ = (f: NonNullable<Post["faq"]>[number]) =>
    typeof f.q === "string" ? f.q : f.q[faqLang];
  const faqA = (f: NonNullable<Post["faq"]>[number]) =>
    typeof f.a === "string" ? f.a : f.a[faqLang];

  /* Lightweight markdown inline rendering: **bold**, *italic*. Batch-4
     articles carry emphasis markers verbatim in their locale strings. */
  const richText = (text: string | undefined): React.ReactNode => {
    if (!text) return null;
    const parts: React.ReactNode[] = [];
    // Split on **...** first, then *...* inside each part
    const reBold = /\*\*([^*]+)\*\*/g;
    let rest = text;
    let idx = 0;
    let m: RegExpExecArray | null;
    reBold.lastIndex = 0;
    while ((m = reBold.exec(rest)) !== null) {
      parts.push(rest.slice(idx, m.index));
      parts.push(<strong key={`b${idx}`} className="font-semibold text-[#142641]">{m[1]}</strong>);
      idx = m.index + m[0].length;
    }
    parts.push(rest.slice(idx));
    return parts.map((p, i) =>
      typeof p === "string" && /\*[^*\n]+\*/.test(p) ? (
        <span key={i}>
          {p.split(/\*([^*\n]+)\*/).map((seg, j) =>
            j % 2 === 1 ? <em key={j}>{seg}</em> : seg,
          )}
        </span>
      ) : (
        <span key={i}>{p}</span>
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#eef4f2] text-[#152540]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {jsonLdFaq ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      ) : null}

      {/* ============ TOPBAR ============ */}
      <header className="sticky top-0 z-40 border-b border-[rgba(111,203,220,.23)] bg-[#102440] text-[#eaf3f4]">
        <div className="mx-auto flex h-14 items-center justify-between px-4 md:h-16 md:px-6">
          <Link href="/blog" className="flex items-center gap-3">
            <ShieldTraceMark className="size-9 text-cyan-300" />
            <span className="leading-tight">
              <strong className="block text-[15px] tracking-tight">xDev AI</strong>
              <em className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">Engineering notes</em>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/blog" className="hidden items-center gap-1.5 rounded border border-cyan-400/30 px-3 py-1.5 text-[13px] text-cyan-100 hover:bg-[#143553] md:inline-flex">
              <ArrowLeft size={14} /> Blog
            </Link>
            <button
              type="button"
              className="grid size-9 place-items-center rounded border border-cyan-400/30 text-cyan-100 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <LanguageSwitch />
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-cyan-400/20 bg-[#0d1e36] px-4 py-3 md:hidden" aria-label="Mobile navigation">
            <div className="grid gap-1">
              {[
                ["/", locale === "vi" ? "Trang chủ" : "Home"],
                ["/ai-sdlc", "AI-SDLC"],
                ["/trace-ledger", "Trace Ledger"],
                ["/tools/maturity-assessment", locale === "vi" ? "Đánh giá Maturity" : "Maturity Assessment"],
                ["/blog", "Blog"],
              ].map(([href, label]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/10 py-2.5 text-sm text-cyan-50">
                  {label}<ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* ============ ARTICLE HERO ============ */}
      <section className="border-b border-[#c9d8d2] bg-[#e6efec]">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] font-medium text-[#0a6e7f] hover:underline">
            <ArrowLeft size={14} /> {t.blog.backToBlog}
          </Link>
          <h1 className="mt-4 text-balance text-[clamp(1.7rem,5vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#142641]">
            {meta.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6791a4]">
            <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {formatDate(post.dateISO, locale)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} /> {meta.readingMinutes} {t.blog.minutes}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag size={13} /> {post.tags.join(" / ")}
            </span>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-[#52697c]">{meta.summary}</p>
          <ResponsiveImage
            src={post.cover}
            alt={locale === "vi" ? post.coverAlt.vi : post.coverAlt.en}
            eager
            className="mt-8 w-full rounded border border-[#b5c6c9] object-cover shadow-[8px_8px_0_rgba(29,84,114,.08)]"
          />
        </div>
      </section>

      {/* ============ BODY ============ */}
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        {meta.sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="text-[clamp(1.2rem,3vw,1.5rem)] font-semibold leading-[1.25] tracking-tight text-[#142641]">{richText(s.heading)}</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-[#33495a]">{richText(s.body)}</p>
            {s.table && <ArticleTable headers={s.table.headers} rows={s.table.rows} />}
            {s.image && (
              <figure className="mt-6">
                <ResponsiveImage
                  src={s.image.src}
                  alt={s.image.alt}
                  className="w-full rounded border border-[#b5c6c9] object-cover shadow-[6px_6px_0_rgba(29,84,114,.07)]"
                />
              </figure>
            )}
          </section>
        ))}

        {/* Locale-aware in-body illustrations (batch-4 style images array) */}
        {(meta.images ?? []).map((img, idx) => (
          <figure key={img.src + String(idx)} className="mb-10">
            <ResponsiveImage
              src={img.src}
              alt={img.alt}
              className="w-full rounded border border-[#b5c6c9] object-cover shadow-[6px_6px_0_rgba(29,84,114,.07)]"
            />
          </figure>
        ))}

        {faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6791a4]">{t.blog.faqLabel}</h2>
            <div className="mt-4 space-y-4">
              {faqs.map((f) => (
                <details key={typeof f.q === "string" ? f.q.slice(0, 60) : f.q.en.slice(0, 60)} className="group border border-[#b5c6c9] bg-white p-5 open:shadow-[6px_6px_0_rgba(29,84,114,.08)]">
                  <summary className="cursor-pointer list-none text-[15px] font-semibold leading-snug text-[#142641]">
                    {richText(faqQ(f))}
                  </summary>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[#33495a]">{richText(faqA(f))}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <hr className="my-10 border-[#c9d8d2]" />

        {/* ============ PREV / NEXT ============ */}
        <nav className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group border border-[#b5c6c9] bg-white p-5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(29,84,114,.1)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6791a4]">← {t.blog.published}</span>
              <span className="mt-1.5 block text-[14px] font-medium leading-snug text-[#142641] group-hover:underline">
                {locale === "vi" ? prev.vi.title : prev.en.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="group border border-[#b5c6c9] bg-white p-5 text-right hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(29,84,114,.1)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6791a4]">→ </span>
              <span className="mt-1.5 block text-[14px] font-medium leading-snug text-[#142641] group-hover:underline">
                {locale === "vi" ? next.vi.title : next.en.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <NewsletterForm />
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#c9d8d2] bg-[#e6efec]">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-[12px] text-[#52697c] md:flex-row md:text-left">
          <span className="font-mono tracking-[0.18em]">AI.XDEV.ASIA / ENGINEERING NOTES</span>
          <span>OPEN ENGINEERING ORGANIZATION — 2026</span>
        </div>
      </footer>
    </div>
  );
}
