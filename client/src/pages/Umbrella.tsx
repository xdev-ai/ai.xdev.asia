/* xDev AI umbrella landing: navy authority, ivory review surface, cyan trace signals, amber verification witness.
   Layout: Tailwind CSS, mobile-first. Desktop (md+) shows the fixed side rail; mobile shows a hamburger drawer. */
import { ArrowUpRight, ArrowRight, ExternalLink, FileCode2, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLang } from "@/i18n/LanguageContext";

/* NOTE (product-fit test):
   The umbrella page must stay neutral toward any single product so future products
   (AI-SDLC, Trace Ledger, ...) plug in as siblings under ai.xdev.asia/<product>. */

type ProductCard = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  status: string;
  statusTone: "live" | "incubating";
  copy: string;
  stack: string;
  href: string;
  cta: string;
};

const products: ProductCard[] = [
  {
    slug: "ai-sdlc",
    index: "01",
    name: "AI-SDLC",
    tagline: "Governed AI-assisted software delivery",
    status: "PUBLIC / v1.0",
    statusTone: "live",
    copy: "Lớp governance cho AI-assisted delivery: versioned policy-as-data, validation engine Rust đóng, và evidence trace từ requirement đến test — chạy nhất quán ở local, GitLab CI và GitHub Actions.",
    stack: "Rust · YAML policy · GitLab CI / GitHub Actions",
    href: "/ai-sdlc",
    cta: "Mở AI-SDLC",
  },
  {
    slug: "trace-ledger",
    index: "02",
    name: "Trace Ledger",
    tagline: "Deterministic change evidence, one ledger",
    status: "CONCEPT / v0.1",
    statusTone: "incubating",
    copy: "Sổ cái evidence hợp nhất: mỗi change của AI — code, spec, config — được ghi thành entry có hash, không thể sửa ngầm. Audit trở thành tra cứu ledger thay vì lục lại chat history.",
    stack: "Concept stage — RFC open in discussion",
    href: "/trace-ledger",
    cta: "Xem concept",
  },
];

const principles = [
  ["01", "Policy as data", "Luật là data có version — thay đổi được review, pin và phân phối, không nằm rải trong prompt."],
  ["02", "Closed execution", "Engine nhận đúng tập check kinds đã khai báo; semantic mới là engine change tường minh, không silent no-op."],
  ["03", "Evidence retained", "Validation và approval là output của quy trình — bằng chứng giữ sẵn, không dựng lại hồi tố."],
  ["04", "Audit-ready by default", "Mỗi sản phẩm của xDev AI phải trả lời được: ai quyết, theo luật nào, version nào, proof ở đâu."],
];

const record = [
  ["xdev-ai", "GitHub organization", "Mọi record công khai tại github.com/xdev-ai"],
  ["ai.xdev.asia", "Umbrella domain", "Trang chủ của tổ chức và các sản phẩm"],
  ["hello@xdev.asia", "Public contact", "Liên hệ công khai của tổ chức"],
];

export default function Umbrella() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#0f243f] text-[#eaf3f4]">
      {/* ===== Top bar: visible on ALL breakpoints, sticky, no side rail on mobile ===== */}
      <header className="sticky top-0 z-40 border-b border-[#1d3a5c] bg-[#0f243f]/95 backdrop-blur">
        <div className="mx-auto flex h-14 items-center justify-between gap-3 px-4 md:h-16 md:px-8">
          <a className="flex items-center gap-2.5" href="/">
            <ShieldTraceMark className="size-8 text-cyan-300" decorative />
            <span className="leading-tight">
              <strong className="block text-[15px] tracking-tight">xDev AI</strong>
              <em className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
                {t.umbrella.brandSub}
              </em>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 md:flex">
            <a className="text-sm hover:text-cyan-300" href="/ai-sdlc">{t.nav.aiSdlc}</a>
            <a className="text-sm hover:text-cyan-300" href="/trace-ledger">{t.nav.traceLedger}</a>
            <a className="flex items-center gap-1 text-sm hover:text-cyan-300" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
              {t.nav.github} <ExternalLink size={12} />
            </a>
            <LanguageSwitch />
          </nav>

          {/* Mobile controls: hamburger + lang switch */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitch />
            <button
              type="button"
              className="grid size-10 place-items-center rounded border border-cyan-400/30 bg-[#143553] text-cyan-100 active:scale-95"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="border-t border-[#1d3a5c] bg-[#0f243f] md:hidden">
            <div className="mx-auto px-4 pb-4 pt-2">
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-cyan-300/60">AI.XDEV.ASIA / NAV</p>
              <nav className="grid gap-1">
                <a className="flex items-baseline gap-3 rounded px-3 py-3 text-[15px] hover:bg-[#143553]" href="/" onClick={() => setOpen(false)}>
                  <span className="font-mono text-xs text-cyan-300/70">00</span><span>{t.nav.home}</span>
                </a>
                <a className="flex items-baseline gap-3 rounded px-3 py-3 text-[15px] hover:bg-[#143553]" href="/ai-sdlc" onClick={() => setOpen(false)}>
                  <span className="font-mono text-xs text-cyan-300/70">01</span><span>{t.nav.aiSdlc}</span>
                </a>
                <a className="flex items-baseline gap-3 rounded px-3 py-3 text-[15px] hover:bg-[#143553]" href="/trace-ledger" onClick={() => setOpen(false)}>
                  <span className="font-mono text-xs text-cyan-300/70">02</span><span>{t.nav.traceLedger}</span>
                </a>
                <a className="flex items-baseline gap-3 rounded px-3 py-3 text-[15px] hover:bg-[#143553]" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
                  <span className="font-mono text-xs text-cyan-300/70">03</span><span>{t.nav.github}</span>
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden px-4 py-14 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
              <span className="inline-block size-2 rounded-full bg-cyan-400/70" />
              {t.umbrella.eyebrow}
            </div>
            <h1 className="text-balance text-[clamp(2.4rem,8vw,4.6rem)] font-semibold leading-[1.08] tracking-tight">
              {t.umbrella.heroTitle1}<br />
              <i className="text-cyan-300">{t.umbrella.heroTitle2}</i>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#c7d6de] md:text-base">
              {t.umbrella.heroCopy}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a className="inline-flex items-center justify-center gap-2 rounded border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 hover:bg-cyan-400/20" href="/ai-sdlc">
                {t.umbrella.ctaExplore} <ArrowUpRight size={16} />
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-[#c7d6de] underline-offset-4 hover:underline" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
                {t.umbrella.ctaGithub} <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-1 divide-y divide-[#1d3a5c] gap-3 border-y border-[#1d3a5c] sm:grid-cols-3 sm:divide-y-0 sm:gap-6">
              <div className="py-3 sm:border-r sm:border-[#1d3a5c] sm:py-2">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/60">{t.umbrella.statProducts}</span>
                <strong className="text-xl text-cyan-200">02</strong>
              </div>
              <div className="py-3 sm:border-r sm:border-[#1d3a5c] sm:py-2">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/60">{t.umbrella.statModel}</span>
                <strong className="text-sm text-[#eaf3f4]">{t.umbrella.statModelValue}</strong>
              </div>
              <div className="py-3 sm:py-2">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/60">{t.umbrella.statRecord}</span>
                <strong className="text-sm text-[#eaf3f4]">{t.umbrella.statRecordValue}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Product catalog ===== */}
        <section className="border-t border-[#1d3a5c] bg-[#eef4f2] px-4 py-14 text-[#0f243f] md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]">
                <span className="font-mono text-xs">01</span> {t.umbrella.sectionCatalog}
              </p>
              <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight">
                {t.umbrella.catalogTitle1}<br />
                <i className="text-[#0a6e7f]">{t.umbrella.catalogTitle2}</i>
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {products.map((p) => (
                <article key={p.slug} className="flex flex-col border border-[#b5c6c9] bg-white p-6 md:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-3xl text-[#0a6e7f]/40">{p.index}</span>
                    <span className={`rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${p.statusTone === "live" ? "bg-cyan-400/15 text-[#0a6e7f]" : "bg-amber-400/20 text-[#8a6417]"}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm italic text-[#4a6470]">{p.tagline}</p>
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-[#2e4854]">{p.copy}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-[#dde7e4] pt-4 text-[11px] text-[#4a6470]">
                    <FileCode2 size={13} /><span>{p.stack}</span>
                  </div>
                  <a className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0a6e7f] hover:underline" href={p.href}>
                    {p.cta} {p.statusTone === "live" ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Shared principles ===== */}
        <section className="border-t border-[#1d3a5c] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                <span className="font-mono text-xs">02</span> {t.umbrella.sectionPrinciples}
              </p>
              <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight">
                {t.umbrella.principlesTitle}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {principles.map(([index, title, copy], i) => (
                <article key={title} className="relative border-l-2 border-cyan-400/50 bg-[#143553] p-5 md:p-6">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/60">PRINCIPLE / {index}</span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#c7d6de]">{copy}</p>
                  {i === 0 && <span className="absolute right-4 top-4 size-2 rounded-full bg-amber-400" aria-label="verified" />}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Open record ===== */}
        <section className="border-t border-[#1d3a5c] bg-[#eef4f2] px-4 py-14 text-[#0f243f] md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]">
                <span className="font-mono text-xs">03</span> {t.umbrella.sectionRecord}
              </p>
              <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight">
                {t.umbrella.recordTitle1}<br />
                <i className="text-[#0a6e7f]">{t.umbrella.recordTitle2}</i>
              </h2>
            </div>
            <div className="grid gap-3">
              {record.map(([label, title, copy], i) => (
                <a key={label} className="flex items-center gap-4 border border-[#b5c6c9] bg-white p-4 transition-colors hover:border-[#0a6e7f] md:p-5" href={i === 0 ? "https://github.com/xdev-ai" : i === 1 ? "https://ai.xdev.asia" : "mailto:hello@xdev.asia"} target="_blank" rel="noreferrer">
                  <span className="shrink-0 font-mono text-xs text-[#0a6e7f]">{label}</span>
                  <div className="flex-1">
                    <strong className="block text-[15px]">{title}</strong>
                    <em className="block text-[13px] not-italic text-[#4a6470]">{copy}</em>
                  </div>
                  {i < 2 ? <ExternalLink size={15} className="shrink-0 text-[#0a6e7f]" /> : <ShieldCheck size={15} className="shrink-0 text-[#0a6e7f]" />}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#1d3a5c] px-4 py-6 md:px-8">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-cyan-300/60">
          <span className="flex items-center gap-2"><ShieldTraceMark decorative size={16} /> xDev AI / UMBRELLA</span>
          <span>{t.umbrella.footerOrg}</span>
          <span><code className="font-mono">AI.XDEV.ASIA</code> / PRODUCT ROUTING</span>
        </div>
      </footer>
    </div>
  );
}
