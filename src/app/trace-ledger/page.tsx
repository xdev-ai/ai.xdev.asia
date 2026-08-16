"use client";

/* Trace Ledger — product concept page /trace-ledger.
   Reuses the umbrella design system (navy / ivory / cyan trace, amber witness) with
   an amber-forward accent to show the umbrella can carry sibling products with
   distinct accents while staying recognizable. This is a CONCEPT stage page.
   Mobile-first Tailwind layout: sticky topbar + hamburger drawer on < md; fixed rail on md+. */
import { ArrowUpRight, ArrowRight, FileJson2, Fingerprint, GitBranch, Hash, Menu, ScrollText, X } from "lucide-react";
import { useState } from "react";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLang } from "@/i18n/LanguageContext";

const navItems = [
  ["01", "Concept", "concept"],
  ["02", "Model", "model"],
  ["03", "Entry", "entry"],
  ["04", "Why", "why"],
  ["05", "Status", "status"],
] as const;

const ledgerEntries = [
  ["E-000014", "2026-08-15 09:41", "spec.write", "SPEC-047 authored — title, intent, acceptance criteria", "sha256:7f3a...c92e"],
  ["E-000015", "2026-08-15 09:52", "spec.validate", "SPEC-047 passed structure + trace checks (10/10)", "sha256:b104...f7a1"],
  ["E-000016", "2026-08-15 10:03", "agent.run", "Agent run — model gpt-4.x pinned, --bare absent", "sha256:e2c8...33bd"],
  ["E-000017", "2026-08-15 10:31", "code.diff", "3 files, +212/−57; trace edge → SPEC-047", "sha256:4a91...dd07"],
  ["E-000018", "2026-08-15 11:02", "review.approve", "Human review passed — verifier duy@xdev.asia", "sha256:9c57...1140"],
];

const model = [
  ["agent.act", "Ai thực hiện hành động (draft spec, viết code, chạy test)"],
  ["hash.compute", "Hash của output + context được tính ngay lập tức"],
  ["entry.append", "Entry được append vào ledger — không có edit, chỉ có append và void"],
  ["edge.link", "Entry liên kết với spec, diff, run, hoặc review trước đó"],
  ["audit.read", "Audit đọc ledger thay vì lục lại chat history"],
];

export default function TraceLedger() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("concept");

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setOpen(false);
  };

  const navLabels = [t.traceLedger.navConcept, t.traceLedger.navModel, t.traceLedger.navEntry, t.traceLedger.navWhy, t.traceLedger.navStatus];

  /* ---- rail/drawer nav shared by mobile drawer and desktop rail ---- */
  const railNav = (
    <nav className="grid gap-1 py-2">
      {navItems.map(([number, , id], index) => (
        <button
          key={id}
          className={`flex items-center gap-3 rounded px-3 py-3 text-[15px] text-left transition-colors ${activeSection === id ? "bg-amber-400/15 text-amber-100" : "text-[#b9c9d7] hover:bg-[#1a2d44]"}`}
          onClick={() => { setActiveSection(id); goTo(id); }}
        >
          <span className="font-mono text-[11px] text-[#6f8ba6]">{number}</span>
          <span>{navLabels[index]}</span>
          <ArrowRight size={14} className="ml-auto opacity-60" />
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#eef4f2] text-[#152540]">
      {/* ============ MOBILE + DESKTOP TOPBAR ============ */}
      <header className="sticky top-0 z-40 border-b border-[rgba(229,180,76,.3)] bg-[#122441] text-[#eaf3f4]">
        <div className="mx-auto flex h-14 items-center justify-between px-4 md:h-16 md:px-6">
          <button className="flex items-center gap-3 text-left" onClick={() => goTo("concept")}>
            <ShieldTraceMark className="size-9 text-amber-300" />
            <span className="leading-tight">
              <strong className="block text-[15px] tracking-tight">Trace Ledger</strong>
              <em className="block text-[10px] uppercase tracking-[0.18em] text-amber-300/70">a concept of xDev AI</em>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <button
              type="button"
              className="grid size-10 place-items-center rounded border border-amber-400/40 bg-[#1a2d44] text-amber-100 active:scale-95 md:hidden"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* ============ MOBILE DRAWER ============ */}
        {open && (
          <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t border-[rgba(229,180,76,.3)] bg-[#122441] md:hidden">
            <div className="px-4 pb-4">
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#8ea3bf]">AI.XDEV.ASIA / TRACE-LEDGER</p>
              <div className="mt-3 grid grid-cols-2 gap-2 border-y border-[rgba(229,180,76,.3)] py-3 font-mono text-[11px]">
                <span className="text-[#6f8ba6]">PATH</span><code className="text-right text-amber-200">/TRACE-LEDGER</code>
                <span className="text-[#6f8ba6]">STATUS</span><strong className="text-right">CONCEPT / v0.1</strong>
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#8ea3bf]">{t.traceLedger.railScopeLabel}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#c7d6de]">{t.traceLedger.railScope}</p>
              {railNav}
              <div className="mt-2 grid gap-1 border-t border-[rgba(229,180,76,.3)] pt-3">
                <a className="flex items-center gap-2 rounded px-3 py-3 text-[14px] text-[#b9cad8] hover:bg-[#1a2d44]" href="/"><span className="font-mono text-[11px] text-[#6f8ba6]">00</span>{t.product.siblingHome} <ArrowUpRight size={13} /></a>
                <a className="flex items-center gap-2 rounded px-3 py-3 text-[14px] text-[#b9cad8] hover:bg-[#1a2d44]" href="/ai-sdlc"><span className="font-mono text-[11px] text-[#6f8ba6]">01</span>{t.nav.aiSdlc} <ArrowUpRight size={13} /></a>
                <a className="flex items-center gap-2 rounded px-3 py-3 text-[14px] text-[#b9cad8] hover:bg-[#1a2d44]" href="/blog"><span className="font-mono text-[11px] text-[#6f8ba6]">02</span>{t.blog.navBlog} <ArrowUpRight size={13} /></a>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded border border-amber-400/30 bg-amber-400/10 px-3 py-3 text-[12px] text-amber-200">
                <span className="inline-block size-2 shrink-0 rounded-full bg-amber-400" />
                <span>{t.traceLedger.railDraft} — <strong className="font-mono text-[11px]">AI.XDEV.ASIA / TRACE-LEDGER</strong></span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============ DESKTOP RAIL (md+) ============ */}
      <aside className="fixed inset-y-14 left-0 z-30 hidden w-[260px] flex-col overflow-y-auto border-r border-[rgba(229,180,76,.3)] bg-[#122441] px-5 pb-8 pt-6 text-[#eaf3f4] md:flex" aria-label="Trace Ledger điều hướng">
        <div className="flex items-center gap-2 text-[9px] text-[#8ea3bf]"><span className="inline-block w-[26px] bg-amber-400/70" style={{ height: 1 }} /> AI.XDEV.ASIA / TRACE-LEDGER</div>
        <div className="mt-5 grid grid-cols-2 gap-2 border-y border-[rgba(229,180,76,.3)] py-3 font-mono text-[11px]">
          <span className="text-[#6f8ba6]">PATH</span><code className="text-right text-amber-200">/TRACE-LEDGER</code>
          <span className="text-[#6f8ba6]">STATUS</span><strong className="text-right">CONCEPT / v0.1</strong>
        </div>
        <div className="mt-5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#8ea3bf]">{t.traceLedger.railScopeLabel}</span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#c7d6de]">{t.traceLedger.railScope}</p>
        </div>
        {railNav}
        <div className="mt-6 grid gap-1 border-t border-[rgba(229,180,76,.3)] pt-4">
          <a className="flex items-center gap-2 px-2 py-2 text-[11px] text-[#b9cad8] hover:text-[#f4f5ee]" href="/"><span className="font-mono text-[8px] text-[#6f8ba6]">00</span>{t.product.siblingHome} <ArrowUpRight size={13} /></a>
          <a className="flex items-center gap-2 px-2 py-2 text-[11px] text-[#b9cad8] hover:text-[#f4f5ee]" href="/ai-sdlc"><span className="font-mono text-[8px] text-[#6f8ba6]">01</span>{t.nav.aiSdlc} <ArrowUpRight size={13} /></a>
          <a className="flex items-center gap-2 px-2 py-2 text-[11px] text-[#b9cad8] hover:text-[#f4f5ee]" href="/blog"><span className="font-mono text-[8px] text-[#6f8ba6]">02</span>{t.blog.navBlog} <ArrowUpRight size={13} /></a>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-6 text-[12px] text-[#8ea3bf]">
          <span className="inline-block size-2 shrink-0 rounded-full bg-amber-400" />
          <span>{t.traceLedger.railDraft}<br /><strong className="font-mono text-[11px]">AI.XDEV.ASIA / TRACE-LEDGER</strong></span>
        </div>
      </aside>

      {/* ============ MAIN CONTENT ============ */}
      <main className="min-w-0 max-w-5xl px-4 pb-10 pt-0 md:ml-[260px] md:px-8 md:w-[calc(100vw-260px)]">
        <section id="concept" className="relative overflow-hidden bg-[#122441] px-4 py-16 text-[#f8f7f0] md:px-8 md:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(229,180,76,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(229,180,76,.1) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "linear-gradient(90deg, black, transparent 80%)" }} />
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#efbd74]">
              <span className="inline-block h-[2px] w-8 bg-amber-400 shadow-[0_0_12px_rgba(229,180,76,.8)]" />
              {t.traceLedger.heroEyebrow}
            </div>
            <h1 className="text-balance text-[clamp(2.2rem,7vw,4.2rem)] font-semibold leading-[1.06] tracking-tight">
              {t.traceLedger.heroTitle1}<br /><i className="text-amber-300">{t.traceLedger.heroTitle2}</i>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#c9d4df] md:text-base">{t.traceLedger.heroCopy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded bg-[#f3e7d3] px-5 py-3 text-sm font-medium text-[#102340] hover:bg-amber-400" onClick={() => goTo("model")}>
                {t.traceLedger.ctaViewModel} <ArrowRight size={16} />
              </button>
              <a className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-[#c9d4df] underline-offset-4 hover:underline" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
                {t.traceLedger.ctaRfcGithub} <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="mt-8 inline-block rounded border border-amber-400/45 bg-[rgba(20,40,62,.55)] px-3 py-1.5 font-mono text-[10px] tracking-[0.09em] text-amber-300">{t.traceLedger.heroBadge}</div>
          </div>
        </section>

        <section id="model" className="bg-[rgba(247,244,235,.93)] px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">01</span><span>THE LEDGER MODEL</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#142641]">
              {t.traceLedger.modelTitle} <i className="text-[#1d5f7c]">{t.traceLedger.modelSubtitle}</i>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#526b83]">{t.traceLedger.modelCopy}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 border-y border-[#9fb6bd] py-2 sm:grid-cols-2 lg:grid-cols-5">
            {model.map(([step, desc], i) => (
              <div key={step} className="border-b border-[#b5c6c9] px-2 py-4 transition-transform hover:-translate-y-1 hover:bg-[#f6f6ee] sm:border-b-0 sm:border-r sm:px-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#5a8090]">STEP / {String(i + 1).padStart(2, "0")}</span>
                <strong className="mt-2 block text-[15px] tracking-tight text-[#173b59]">{step}</strong>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#597286]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="entry" className="border-b border-[#bdced0] bg-[#e8eeea] px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">02</span><span>ENTRY ANATOMY</span></div>
          </div>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="overflow-hidden border border-[#8ca5b2] bg-[#f7f5ed] shadow-[8px_8px_0_rgba(29,84,114,.11)] lg:col-span-3">
              <div className="flex items-center justify-between border-b border-[#8ca5b2] bg-[#e8eeea] px-4 py-2.5 font-mono text-[11px]">
                <span className="flex gap-1.5"><i className="inline-block size-2.5 rounded-full bg-[#d75b5b]" /><i className="inline-block size-2.5 rounded-full bg-[#e5a73d]" /><i className="inline-block size-2.5 rounded-full bg-[#57b376]" /></span>
                <code>ledger / entries</code><span className="text-[#188da4]">5 ENTRIES</span>
              </div>
              <div className="divide-y divide-[#d8e1e2] overflow-x-auto p-4 font-mono text-[11px] leading-6 text-[#3d5a70]">
                <div className="mb-1 grid grid-cols-[64px_88px_90px_1fr] gap-2 pb-2 text-[8px] uppercase tracking-[0.14em] text-[#5e7a8c]">
                  <span>ID</span><span>TS</span><span>EVENT</span><span>PAYLOAD</span>
                </div>
                {ledgerEntries.map(([id, ts, event, payload]) => (
                  <div key={id} className="grid grid-cols-[64px_88px_90px_1fr] gap-2 py-2">
                    <code className="text-[#95661c]">{id}</code><span>{ts}</span>
                    <span className="rounded px-1.5 py-0.5 text-center text-[9px] text-[#95661c]" style={{ border: "1px solid rgba(211,159,65,.5)", background: "rgba(229,180,76,.16)" }}>{event}</span>
                    <span>{payload}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              {[
                ["A", "Append-only", "Không có edit hay delete. Sai thì append entry void tham chiếu entry gốc — lịch sử luôn nguyên vẹn."],
                ["B", "Linked entries", "Mỗi entry tham chiếu entry trước theo loại sự kiện: run nối spec, diff nối run, approve nối diff."],
                ["C", "Portable ledger", "Ledger là file có version; mỗi sản phẩm của xDev AI có thể emit cùng định dạng để audit liên tổ chức."],
              ].map(([idx, title, copy]) => (
                <article key={title as string} className="relative border-b border-[#a4bac3] pb-4 pl-8">
                  <span className="absolute left-0 top-1 font-mono text-[12px] text-[#b57416]">{idx}</span>
                  <h3 className="text-[15px] text-[#142641]">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#61778b]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="bg-[rgba(247,244,235,.88)] px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">03</span><span>WHY LEDGER, WHY NOW</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#142641]">Chat history là memory.<br /><i className="text-[#1d5f7c]">Ledger là bằng chứng.</i></h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="border border-[#c5cfcf] bg-[#faf8ef] p-6">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#607d91]">MEMORY</span>
              <ul className="mt-4 grid gap-2.5 text-[13px] leading-relaxed text-[#5b7082]">
                <li className="pl-4 [--marker:#9aacb6] relative before:absolute before:left-0 before:top-[10px] before:h-px before:w-[7px] before:bg-[var(--marker)] before:content-['']">Context trôi, session mất</li>
                <li className="pl-4 [--marker:#9aacb6] relative before:absolute before:left-0 before:top-[10px] before:h-px before:w-[7px] before:bg-[var(--marker)] before:content-['']">Chat có thể bị sửa hoặc xóa</li>
                <li className="pl-4 [--marker:#9aacb6] relative before:absolute before:left-0 before:top-[10px] before:h-px before:w-[7px] before:bg-[var(--marker)] before:content-['']">Không liên kết được với artifact</li>
                <li className="pl-4 [--marker:#9aacb6] relative before:absolute before:left-0 before:top-[10px] before:h-px before:w-[7px] before:bg-[var(--marker)] before:content-['']">Audit phụ thuộc vào người nhớ</li>
              </ul>
            </div>
            <div className="border border-amber-400/55 bg-[#f3e7d3] p-6 shadow-[inset_0_3px_0_#e5a73d]">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#95661c]">LEDGER</span>
              <ul className="mt-4 grid gap-2.5 text-[13px] leading-relaxed text-[#4a4028]">
                <li className="pl-4 [--marker:#b57416] relative before:absolute before:left-0 before:top-[9px] before:h-[3px] before:w-[7px] before:bg-[var(--marker)] before:content-['']">Entry hash, chuỗi nguyên vẹn</li>
                <li className="pl-4 [--marker:#b57416] relative before:absolute before:left-0 before:top-[9px] before:h-[3px] before:w-[7px] before:bg-[var(--marker)] before:content-['']">Append-only, void minh bạch</li>
                <li className="pl-4 [--marker:#b57416] relative before:absolute before:left-0 before:top-[9px] before:h-[3px] before:w-[7px] before:bg-[var(--marker)] before:content-['']">Liên kết trực tiếp với spec, diff, review</li>
                <li className="pl-4 [--marker:#b57416] relative before:absolute before:left-0 before:top-[9px] before:h-[3px] before:w-[7px] before:bg-[var(--marker)] before:content-['']">Audit đọc file, không cần ký ức</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="status" className="bg-[#12314d] px-4 py-14 text-[#eaf3f2] md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#7ec8d1]"><span className="font-mono text-xs">04</span><span>CONCEPT STATUS</span></div>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-[7vw]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#7ec8d1]">CURRENT STATE</span>
              <strong className="mt-3 block text-xl tracking-tight text-[#f3f2e9]">Concept only</strong>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#b6cbd7]">Trang này là bài kiểm tra kiến trúc umbrella: Trace Ledger chưa có repository. Khi concept được chấp nhận, nó sẽ nhận path riêng <code className="font-mono text-[#8fdbe2]">ai.xdev.asia/trace-ledger</code>, repo riêng trong org xdev-ai, và tuân cùng nguyên tắc shared principles với AI-SDLC.</p>
              <div className="my-7 h-px w-full bg-[rgba(166,211,218,.38)]" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#7ec8d1]">NEXT STEP</span>
              <strong className="mt-3 block text-xl tracking-tight text-[#f3f2e9]">RFC open in discussions</strong>
            </div>
            <div className="border border-[rgba(148,207,216,.38)] bg-[rgba(16,48,73,.54)] p-7">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#7ec8d1]">UMBRELLA FIT TEST</span>
              <h3 className="mt-7 text-[24px] leading-[1.15] tracking-tight text-[#f4f3ea]">Một umbrella, nhiều sản phẩm.</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#b8cdd7]">Trang này dùng chính hệ design của AI-SDLC — navy, ivory, cyan trace, amber witness — với accent amber đẩy lên vai trò chính, chứng minh umbrella nhận được sản phẩm mới có bản sắc riêng mà không phá thương hiệu.</p>
              <ul className="mt-5 grid gap-3 text-[12px] leading-[1.6] text-[#c4d4dc]">
                <li className="flex items-start gap-2.5"><ScrollText size={14} className="mt-0.5 shrink-0 text-amber-400" /><span>Layout product-sheet dùng lại rail + hero + section marker</span></li>
                <li className="flex items-start gap-2.5"><GitBranch size={14} className="mt-0.5 shrink-0 text-amber-400" /><span>Sibling navigation giữa các sản phẩm (/ai-sdlc, /trace-ledger)</span></li>
                <li className="flex items-start gap-2.5"><FileJson2 size={14} className="mt-0.5 shrink-0 text-amber-400" /><span>Ledger format dự kiến dùng chung với evidence của AI-SDLC</span></li>
                <li className="flex items-start gap-2.5"><Fingerprint size={14} className="mt-0.5 shrink-0 text-amber-400" /><span>Signature color riêng: amber thay vì cyan làm chủ đạo</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="grid gap-8 border-y border-[#ccd6d6] py-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#5a8090]">THE UMBRELLA QUESTION</span>
              <h2 className="mt-3 text-balance text-[clamp(1.6rem,4.5vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#142641]">Sản phẩm mới —<br /><i className="text-[#1d5f7c]">cùng luật chơi.</i></h2>
            </div>
            <div className="max-w-md">
              <p className="mb-4 text-[13px] leading-relaxed text-[#5b7082]">Mỗi sản phẩm của xDev AI trả lời cùng một bộ câu hỏi: ai quyết, theo luật nào, version nào, evidence ở đâu. Trace Ledger đưa câu thứ tư lên làm sản phẩm.</p>
              <a className="inline-flex items-center gap-2 rounded border border-[#0a6e7f] px-5 py-3 text-sm font-medium text-[#0a6e7f] hover:bg-[#0a6e7f] hover:text-white" href="/">
                Về xDev AI <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ccd6d6] px-4 py-6 text-[10px] uppercase tracking-[0.18em] text-[#4a6470] md:px-8">
          <span className="flex items-center gap-2"><ShieldTraceMark decorative className="size-4" /> TRACE LEDGER / XDEV AI</span>
          <span>CONCEPT PAGE — 2026</span>
          <span><code className="font-mono">AI.XDEV.ASIA / TRACE-LEDGER</code></span>
        </footer>
      </main>
    </div>
  );
}
