/* Blog listing page — xDev AI engineering notes, bilingual (EN/VI). */
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "wouter";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { useLang } from "@/i18n/LanguageContext";
import { posts } from "@/data/posts";
import { useEffect } from "react";

function formatDate(iso: string, locale: "en" | "vi"): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Blog() {
  const { t, locale } = useLang();
  const visible = posts.filter((p) => !p.draft);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#eef4f2] text-[#152540]">
      {/* ============ TOPBAR ============ */}
      <header className="sticky top-0 z-40 border-b border-[rgba(111,203,220,.23)] bg-[#102440] text-[#eaf3f4]">
        <div className="mx-auto flex h-14 items-center justify-between px-4 md:h-16 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <ShieldTraceMark className="size-9 text-cyan-300" />
            <span className="leading-tight">
              <strong className="block text-[15px] tracking-tight">xDev AI</strong>
              <em className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">Engineering notes</em>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/ai-sdlc"
              className="hidden items-center gap-1.5 rounded border border-cyan-400/30 px-3 py-1.5 text-[13px] text-cyan-100 hover:bg-[#143553] md:inline-flex"
            >
              {t.nav.aiSdlc}
            </Link>
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded border border-cyan-400/30 px-3 py-1.5 text-[13px] text-cyan-100 hover:bg-[#143553] md:inline-flex"
            >
              {t.nav.home}
            </Link>
            <LanguageSwitch />
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="bg-[#102440] text-[#eaf3f4]">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:px-6 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">{t.blog.heroEyebrow}</p>
          <h1 className="mt-5 text-balance text-[clamp(2rem,6vw,3.2rem)] font-semibold leading-[1.12] tracking-tight">
            {t.blog.heroTitle1} <br />
            <i className="text-cyan-300">{t.blog.heroTitle2}</i>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#b9c9d7]">{t.blog.heroCopy}</p>
        </div>
      </section>

      {/* ============ POST LIST ============ */}
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5a8090]">{t.blog.postsLabel}</p>
        <div className="mt-8 grid gap-6">
          {visible.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col border border-[#b5c6c9] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(29,84,114,.11)] md:p-8"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6f8ba6]">
                <span>{formatDate(post.dateISO, locale)}</span>
                <span>·</span>
                <span>
                  {(locale === "vi" ? post.vi : post.en).readingMinutes} {t.blog.minutes}
                </span>
                <span>·</span>
                <span>{post.tags.join(" / ")}</span>
              </div>
              <img
                src={post.cover}
                alt={locale === "vi" ? post.coverAlt.vi : post.coverAlt.en}
                loading="lazy"
                className="mt-4 w-full rounded border border-[#b5c6c9] object-cover shadow-[5px_5px_0_rgba(29,84,114,.08)]"
              />
              <h2 className="mt-5 text-[clamp(1.3rem,3.2vw,1.6rem)] font-semibold leading-[1.2] tracking-tight text-[#142641]">
                {locale === "vi" ? post.vi.title : post.en.title}
              </h2>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#4a6470]">
                {locale === "vi" ? post.vi.summary : post.en.summary}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#0a6e7f] hover:underline"
              >
                {t.blog.readMore} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="border border-dashed border-[#8ca5b2] p-10 text-center text-[14px] text-[#597286]">{t.blog.empty}</p>
          )}
        </div>

        {/* ============ OPEN RECORD NOTE ============ */}
        <div className="mt-14 flex items-start gap-4 rounded border border-amber-400/40 bg-amber-400/10 p-6">
          <FileText size={22} className="mt-0.5 shrink-0 text-[#8a6417]" />
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight text-[#142641]">{t.blog.openRecord}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#5a7180]">{t.blog.openRecordCopy}</p>
          </div>
        </div>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#c9d8d2] bg-[#e6efec]">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-[12px] text-[#4a6470] md:flex-row md:text-left">
          <span className="font-mono tracking-[0.18em]">AI.XDEV.ASIA / ENGINEERING NOTES</span>
          <div className="flex items-center gap-4">
            <a
              href="/blog/feed.xml"
              type="application/rss+xml"
              className="inline-flex items-center gap-1.5 font-mono tracking-[0.12em] text-[#4a6470] hover:text-[#152540]"
            >
              <FileText size={12} /> RSS
            </a>
            <Link href="/privacy" className="hover:text-[#152540]">
              {t.blog.legalNav}
            </Link>
            <span>OPEN ENGINEERING ORGANIZATION — 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
