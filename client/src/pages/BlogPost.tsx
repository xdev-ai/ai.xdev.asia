/* Blog post detail page — xDev AI engineering notes, bilingual (EN/VI). */
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Link, useParams } from "wouter";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { useLang } from "@/i18n/LanguageContext";
import { resetOgMeta, updateOgMeta } from "@/lib/ogMeta";
import NewsletterForm from "@/components/NewsletterForm";
import { getPost, posts, type Post } from "@/data/posts";
import { useEffect, useMemo } from "react";

function formatDate(iso: string, locale: "en" | "vi"): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useLang();
  const post: Post | undefined = useMemo(() => getPost(params.slug ?? ""), [params.slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  useEffect(() => {
    document.title = post
      ? `${locale === "vi" ? post.vi.title : post.en.title} — xDev AI Blog`
      : "Post not found — xDev AI";
  }, [post, locale]);

  useEffect(() => {
    if (!post) {
      resetOgMeta();
      return;
    }
    const meta_ = locale === "vi" ? post.vi : post.en;
    updateOgMeta({
      title: meta_.title,
      description: meta_.summary,
      image: post.cover ? `https://ai.xdev.asia${post.cover}` : undefined,
      url: `https://ai.xdev.asia/blog/${post.slug}`,
    });
  }, [post, locale]);

  const index = posts.findIndex((p) => p.slug === params.slug);
  const prev = index > 0 ? posts[index - 1] : undefined;
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#eef4f2] px-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[#142641]">Post not found</h1>
        <p className="mt-2 text-[14px] text-[#597286]">The requested article does not exist or has been removed.</p>
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
    if (!post.faq || post.faq.length === 0) return null;
    const lang = locale === "vi" ? "vi" : "en";
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q[lang as "en" | "vi"],
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a[lang as "en" | "vi"],
        },
      })),
    };
  }, [post, locale]);

  const faqs = post.faq ?? [];
  const faqLang: "en" | "vi" = locale === "vi" ? "vi" : "en";

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
            <LanguageSwitch />
          </div>
        </div>
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
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#5a8090]">
            <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {formatDate(post.dateISO, locale)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} /> {meta.readingMinutes} {t.blog.minutes}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag size={13} /> {post.tags.join(" / ")}
            </span>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-[#4a6470]">{meta.summary}</p>
          <img
            src={post.cover}
            alt={locale === "vi" ? post.coverAlt.vi : post.coverAlt.en}
            loading="eager"
            className="mt-8 w-full rounded border border-[#b5c6c9] object-cover shadow-[8px_8px_0_rgba(29,84,114,.08)]"
          />
        </div>
      </section>

      {/* ============ BODY ============ */}
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        {meta.sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="text-[clamp(1.2rem,3vw,1.5rem)] font-semibold leading-[1.25] tracking-tight text-[#142641]">{s.heading}</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-[#33495a]">{s.body}</p>
            {s.image && (
              <figure className="mt-6">
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  loading="lazy"
                  className="w-full rounded border border-[#b5c6c9] object-cover shadow-[6px_6px_0_rgba(29,84,114,.07)]"
                />
              </figure>
            )}
          </section>
        ))}

        {faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5a8090]">{t.blog.faqLabel}</h2>
            <div className="mt-4 space-y-4">
              {faqs.map((f) => (
                <details key={f.q.en} className="group border border-[#b5c6c9] bg-white p-5 open:shadow-[6px_6px_0_rgba(29,84,114,.08)]">
                  <summary className="cursor-pointer list-none text-[15px] font-semibold leading-snug text-[#142641]">
                    {f.q[faqLang]}
                  </summary>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[#33495a]">{f.a[faqLang]}</p>
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
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6f8ba6]">← {t.blog.published}</span>
              <span className="mt-1.5 block text-[14px] font-medium leading-snug text-[#142641] group-hover:underline">
                {locale === "vi" ? prev.vi.title : prev.en.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="group border border-[#b5c6c9] bg-white p-5 text-right hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(29,84,114,.1)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6f8ba6]">→ </span>
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
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-[12px] text-[#4a6470] md:flex-row md:text-left">
          <span className="font-mono tracking-[0.18em]">AI.XDEV.ASIA / ENGINEERING NOTES</span>
          <span>OPEN ENGINEERING ORGANIZATION — 2026</span>
        </div>
      </footer>
    </div>
  );
}
