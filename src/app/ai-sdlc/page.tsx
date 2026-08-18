"use client";

/* AI-SDLC product sheet — governed delivery platform under the xDev AI umbrella.
   Mobile-first Tailwind layout: sticky topbar + hamburger drawer on < md; fixed rail on md+. */
import { ArrowUpRight, BookOpen, Box, ChevronRight, Code2, Copy, Database, ExternalLink, FolderTree, Globe, KeyRound, Layers3, Menu, Network, Plug, Server, ShieldCheck, Terminal, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import Image from "next/image";

const navItems = [
  ["01", "Platform", "platform"],
  ["02", "Spec Kit", "tree"],
  ["03", "Components", "components"],
  ["04", "Contract", "contract"],
  ["05", "Rule packs", "rules"],
  ["06", "Evidence", "resolution"],
  ["07", "Open record", "record"],
] as const;

const checkKinds = [
  ["01", "frontmatter_field_present", "Spec structure", "Kiểm field frontmatter bắt buộc"],
  ["02", "frontmatter_matches", "Spec structure", "Kiểm field theo regex"],
  ["03", "sections_present", "Spec structure", "Kiểm section Markdown bắt buộc"],
  ["04", "section_not_empty", "Spec structure", "Chặn section không có nội dung"],
  ["05", "id_format_valid", "ID grammar", "Kiểm grammar artifact ID"],
  ["06", "id_unique", "ID grammar", "Chặn ID khai báo trùng"],
  ["07", "graph_edge_exists", "Traceability", "Ép số cạnh trace tối thiểu"],
  ["08", "reference_resolves", "Traceability", "Kiểm reference có thể resolve"],
  ["09", "argv_must_contain", "Agent launch", "Bắt buộc cờ argv"],
  ["10", "argv_must_not_contain", "Agent launch", "Cấm cờ argv"],
];

const policyPacks = [
  {
    id: "AGENT-LAUNCH",
    file: "agent-launch.yml",
    type: "applies_to: command",
    tint: "cyan",
    summary: "Đưa policy launch agent vào deterministic gate thay vì chỉ nhắc bằng prompt.",
    rules: [
      ["LAUNCH-001", "error", "Bắt buộc pin --model"],
      ["LAUNCH-002", "error", "Cấm --bare"],
    ],
  },
  {
    id: "SPEC-STRUCT",
    file: "spec-structure.yml",
    type: "applies_to: spec",
    tint: "blue",
    summary: "Tạo cổng vào có cấu trúc để artifact đủ điều kiện đi vào graph.",
    rules: [
      ["SPEC-STRUCT-001", "error", "Có frontmatter id"],
      ["SPEC-STRUCT-002", "error", "ID đúng artifact grammar"],
      ["SPEC-STRUCT-003", "error", "Description không rỗng"],
      ["+03", "warning", "Acceptance Criteria, NFR, uniqueness"],
    ],
  },
  {
    id: "TRACE",
    file: "traceability.yml",
    type: "applies_to: spec",
    tint: "amber",
    summary: "Biến coverage từ requirement đến test thành bất biến của artifact graph.",
    rules: [
      ["TRACE-001", "error", "BR → verified_by → TC"],
      ["TRACE-002", "error", "REQ → refines → SPEC"],
      ["TRACE-003", "warning", "AC → tracked_by → TASK"],
      ["TRACE-004", "error", "Reference phải resolve"],
    ],
  },
];

const lifecycle = [
  ["01", "Intent", "Business requirement and decision context enter the record."],
  ["02", "Specification", "Typed artifacts make the delivery intent reviewable."],
  ["03", "Policy gate", "Versioned rules are resolved and enforced deterministically."],
  ["04", "Evidence", "Trace edges connect decision, implementation, test, and review."],
  ["05", "Release", "The delivery record carries proof, not only a passing claim."],
];

const platformSurfaces = [
  ["Platform", "Governed delivery lifecycle", "AI-SDLC frames the work around explicit decisions, gates, and accountable outcomes."],
  ["Spec Kit", "Versioned policy as data", "Rules, standards, templates, profiles, and domain packs evolve with the delivery system."],
  ["Evidence", "Traceable proof", "A graph connects requirements through tests and validation results so review does not depend on memory."],
  ["Open record", "Repository as source of truth", "Architecture notes, release work, and policy changes remain inspectable and versioned."],
];

export default function AiSdlc() {
  const { t } = useLang();
  const navLabels = [t.aiSdlc.navPlatform, t.aiSdlc.navSpec, t.aiSdlc.navContract, t.aiSdlc.navRules, t.aiSdlc.navEvidence, t.aiSdlc.navRecord];
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("platform");

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

  const copyText = (value: string, label: string) => {
    void navigator.clipboard?.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  };

  /* ---- shared rail/drawer content (rendered in both desktop rail and mobile drawer) ---- */
  const railNav = (
    <nav className="grid gap-1 py-2">
      {navItems.map(([number, , id], index) => (
        <button
          key={id}
          className={`flex items-center gap-3 rounded px-3 py-3 text-[15px] text-left transition-colors ${activeSection === id ? "bg-cyan-400/15 text-cyan-100" : "text-[#b9c9d7] hover:bg-[#143553]"}`}
          onClick={() => { setActiveSection(id); goTo(id); }}
        >
          <span className="font-mono text-[11px] text-[#6e89a7]">{number}</span>
          <span>{navLabels[index]}</span>
          <ChevronRight size={14} className="ml-auto opacity-60" />
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#eef4f2] text-[#152540]">
      {/* ============ MOBILE + DESKTOP TOPBAR (sticky, always on top) ============ */}
      <header className="sticky top-0 z-40 border-b border-[rgba(111,203,220,.23)] bg-[#102440] text-[#eaf3f4]">
        <div className="mx-auto flex h-14 items-center justify-between px-4 md:h-16 md:px-6">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => goTo("platform")}
          >
            <ShieldTraceMark className="size-9 text-cyan-300" />
            <span className="leading-tight">
              <strong className="block text-[15px] tracking-tight">AI-SDLC</strong>
              <em className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">a product of xDev AI</em>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <button
              type="button"
              className="grid size-10 place-items-center rounded border border-cyan-400/30 bg-[#143553] text-cyan-100 active:scale-95 md:hidden"
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
          <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t border-[rgba(129,192,205,.24)] bg-[#102440] md:hidden">
            <div className="px-4 pb-4">
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#8ea3bf]">AI.XDEV.ASIA / AI-SDLC</p>
              <div className="mt-3 grid grid-cols-2 gap-2 border-y border-[rgba(129,192,205,.24)] py-3 font-mono text-[11px]">
                <span className="text-[#6f8ba6]">PATH</span><code className="text-right text-cyan-200">/AI-SDLC</code>
                <span className="text-[#6f8ba6]">STATUS</span><strong className="text-right">PUBLIC / v1.0</strong>
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#8ea3bf]">{t.product.scopeLabel}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#c7d6de]">{t.aiSdlc.railScope}</p>
              {railNav}
              <div className="mt-2 grid gap-1 border-t border-[rgba(129,192,205,.24)] pt-3">
                <a className="flex items-center gap-2 rounded px-3 py-3 text-[14px] text-[#b9cad8] hover:bg-[#143553]" href="/"><span className="font-mono text-[11px] text-[#6f8ba6]">00</span>{t.product.siblingHome} <ArrowUpRight size={13} /></a>
                <a className="flex items-center gap-2 rounded px-3 py-3 text-[14px] text-[#b9cad8] hover:bg-[#143553]" href="/trace-ledger"><span className="font-mono text-[11px] text-[#6f8ba6]">02</span>{t.nav.traceLedger} <ArrowUpRight size={13} /></a>
                <a className="flex items-center gap-2 rounded px-3 py-3 text-[14px] text-[#b9cad8] hover:bg-[#143553]" href="/blog"><span className="font-mono text-[11px] text-[#6f8ba6]">03</span>{t.blog.navBlog} <ArrowUpRight size={13} /></a>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded border border-amber-400/30 bg-amber-400/10 px-3 py-3 text-[12px] text-amber-200">
                <span className="inline-block size-2 shrink-0 rounded-full bg-amber-400" />
                <span>{t.product.verified} — <strong className="font-mono text-[11px]">AI.XDEV.ASIA / AI-SDLC</strong></span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============ DESKTOP RAIL (md+) ============ */}
      <aside className="fixed inset-y-14 left-0 z-30 hidden w-[260px] flex-col overflow-y-auto border-r border-[rgba(111,203,220,.23)] bg-[#102440] px-5 pb-8 pt-6 text-[#eaf3f4] md:flex" aria-label="AI-SDLC điều hướng">
        <div className="flex items-center gap-2 text-[9px] text-[#8ea3bf]"><span className="inline-block w-[26px] bg-cyan-400/70" style={{ height: 1 }} /> AI.XDEV.ASIA / AI-SDLC</div>
        <div className="mt-5 grid grid-cols-2 gap-2 border-y border-[rgba(129,192,205,.24)] py-3 font-mono text-[11px]">
          <span className="text-[#6f8ba6]">PATH</span><code className="text-right text-cyan-200">/AI-SDLC</code>
          <span className="text-[#6f8ba6]">STATUS</span><strong className="text-right">PUBLIC / v1.0</strong>
        </div>
        <div className="mt-5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#8ea3bf]">{t.product.scopeLabel}</span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#c7d6de]">{t.aiSdlc.railScope}</p>
        </div>
        {railNav}
        <div className="mt-6 grid gap-1 border-t border-[rgba(129,192,205,.24)] pt-4">
          <a className="flex items-center gap-2 px-2 py-2 text-[11px] text-[#b9cad8] hover:text-[#f4f5ee]" href="/"><span className="font-mono text-[8px] text-[#6f8ba6]">00</span>{t.product.siblingHome} <ArrowUpRight size={13} /></a>
          <a className="flex items-center gap-2 px-2 py-2 text-[11px] text-[#b9cad8] hover:text-[#f4f5ee]" href="/trace-ledger"><span className="font-mono text-[8px] text-[#6f8ba6]">02</span>{t.nav.traceLedger} <ArrowUpRight size={13} /></a>
          <a className="flex items-center gap-2 px-2 py-2 text-[11px] text-[#b9cad8] hover:text-[#f4f5ee]" href="/blog"><span className="font-mono text-[8px] text-[#6f8ba6]">03</span>{t.blog.navBlog} <ArrowUpRight size={13} /></a>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-6 text-[12px] text-[#8ea3bf]">
          <span className="inline-block size-2 shrink-0 rounded-full bg-amber-400" />
          <span>{t.product.verified}<br /><strong className="font-mono text-[11px]">AI.XDEV.ASIA / AI-SDLC</strong></span>
        </div>
      </aside>

      {/* ============ MAIN CONTENT ============ */}
      <main className="min-w-0 max-w-4xl px-4 pb-10 pt-0 md:ml-[260px] md:px-8 md:w-full">
        <section id="platform" className="relative overflow-hidden bg-[#102340] px-4 py-16 text-[#f8f7f0] md:px-8 md:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-28" style={{ backgroundImage: "linear-gradient(rgba(100,191,214,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(100,191,214,.13) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "linear-gradient(90deg, black, transparent 80%)" }} />
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cyan-300/90">
              <span className="inline-block h-[2px] w-8 bg-cyan-400 shadow-[0_0_12px_rgba(41,211,232,.8)]" />
              {t.aiSdlc.heroEyebrow}
            </div>
            <h1 className="text-balance text-[clamp(2.2rem,7vw,4.4rem)] font-semibold leading-[1.06] tracking-tight">
              {t.aiSdlc.heroTitle1}<br /><i className="text-cyan-300">{t.aiSdlc.heroTitle2}</i>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#cad6df] md:text-base">{t.aiSdlc.heroCopy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a className="inline-flex items-center justify-center gap-2 rounded border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 hover:bg-cyan-400/20" href="https://github.com/xdev-ai/ai-sdlc" target="_blank" rel="noreferrer">
                {t.product.openRepo} <ArrowUpRight size={16} />
              </a>
              <button className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-[#cad6df] underline-offset-4 hover:underline" onClick={() => goTo("tree")}>
                Đi vào Spec Kit <ChevronRight size={16} />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 divide-y divide-[#1d3a5c] gap-3 border-y border-[#1d3a5c] sm:grid-cols-3 sm:divide-y-0 sm:gap-6">
              <div className="py-3 sm:border-r sm:border-[#1d3a5c] sm:py-2"><span className="block text-[10px] uppercase tracking-[0.18em] text-[#76a8c0]">{t.aiSdlc.heroMeta1S}</span><strong className="font-mono text-[11px] text-[#e9f3f3]">{t.aiSdlc.heroMeta1V}</strong></div>
              <div className="py-3 sm:border-r sm:border-[#1d3a5c] sm:py-2"><span className="block text-[10px] uppercase tracking-[0.18em] text-[#76a8c0]">{t.aiSdlc.heroMeta2S}</span><strong className="font-mono text-[11px] text-[#e9f3f3]">{t.aiSdlc.heroMeta2V}</strong></div>
              <div className="py-3 sm:py-2"><span className="block text-[10px] uppercase tracking-[0.18em] text-[#76a8c0]">{t.aiSdlc.heroMeta3S}</span><strong className="font-mono text-[11px] text-[#e9f3f3]">{t.aiSdlc.heroMeta3V}</strong></div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">01</span><span>{t.aiSdlc.s01Label}</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#142641]">
              {t.aiSdlc.s01Title1}<br /><i className="text-[#1d5f7c]">{t.aiSdlc.s01Title2}</i>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#526b83]">{t.aiSdlc.s01Copy}</p>
          </div>
          <figure className="overflow-hidden rounded-lg border border-[#b5c6c9] bg-white">
            <Image
              src="/images/pipeline-diagram.png"
              alt="AI-SDLC five-stage pipeline: Intent → Spec → Policy Gate → Evidence → Release — every step leaves a verifiable trace"
              width={1400}
              height={560}
              className="h-auto w-full"
              priority
            />
          </figure>
          <div className="mt-12 grid gap-4 border-y border-[#9fb6bd] sm:grid-cols-2 lg:grid-cols-5">
            {["lc1", "lc2", "lc3", "lc4", "lc5"].map((key, index) => { const lc = t.aiSdlc[key as keyof typeof t.aiSdlc] as unknown as string[]; return { number: String(index + 1).padStart(2, "0"), name: lc[0], copy: lc[1], gate: index === 2, last: index === 4 }; }).map(({ number, name, copy, gate }) => (
              <article key={name} className={`border-b border-[#b5c6c9] py-5 sm:border-b-0 ${gate ? "border-l-2 border-l-amber-400 bg-amber-400/10 sm:border-b sm:border-[#b5c6c9]" : ""}`}>
                <span className="font-mono text-[11px] text-[#5a8090]">{number}</span>
                <strong className="mt-2 block text-[16px] tracking-tight text-[#173b59]">{name}</strong>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#597286]">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {["sf0", "sf1", "sf2", "sf3"].map((key, index) => { const sf = t.aiSdlc[key as keyof typeof t.aiSdlc] as unknown as string[]; return { number: String(index).padStart(2, "0"), label: sf[0], title: sf[1], copy: sf[2], idx: index }; }).map(({ label, title, copy, idx }) => (
              <article key={label} className="flex gap-5 border border-[#b5c6c9] bg-white p-6 transition-transform hover:-translate-y-1">
                <span className="font-mono text-[28px] text-[#0a6e7f]/35">0{idx + 1}</span>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#5a8090]">{label}</span>
                  <h3 className="mt-2 text-[17px] tracking-tight text-[#142641]">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#5b7082]">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#ccd6d6] bg-[rgba(247,244,235,.93)] px-4 py-14 md:px-8 md:py-20">
          <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">02</span><span>SPEC KIT IN THE PLATFORM</span></div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#5a8090]">DESIGN DECISION / DD-03</span>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2e4854]"><strong>Rust = engine.</strong> Tập check kinds hữu hạn, đóng. <strong>Spec Kit = luật.</strong> YAML và Markdown versioned, có thể mở rộng bằng Domain Pack.</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-2 border border-[#b5c6c9] bg-white p-4 text-center">
                <Code2 size={18} className="text-[#0a6e7f]" /><span className="text-[13px] font-medium text-[#142641]">CLI / validator</span><em className="text-[11px] not-italic text-[#4a6470]">parse · graph · validate</em>
              </div>
              <div className="flex flex-col items-center gap-2 border border-[#0a6e7f] bg-[#0a6e7f]/10 p-4 text-center">
                <ShieldCheck size={18} className="text-[#0a6e7f]" /><span className="text-[13px] font-medium text-[#142641]">Spec Kit</span><em className="text-[11px] not-italic text-[#4a6470]">rules · standards · policies</em>
              </div>
              <div className="flex flex-col items-center gap-2 border border-[#b5c6c9] bg-white p-4 text-center">
                <Network size={18} className="text-[#0a6e7f]" /><span className="text-[13px] font-medium text-[#142641]">Control plane</span><em className="text-[11px] not-italic text-[#4a6470]">evidence · registry · audit</em>
              </div>
            </div>
          </div>
        </section>

        <section id="tree" className="px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">03</span><span>COMPONENT MAP</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#142641]">Một kit. <i className="text-[#1d5f7c]">Ba tầng trách nhiệm.</i></h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#526b83]">Tất cả nội dung trong <code className="rounded bg-[#102340] px-1.5 py-0.5 text-[13px] text-cyan-200">spec-kit/</code> là data hoặc contract; không có code thực thi. Code xử lý nằm trong các Rust crates riêng biệt.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="overflow-hidden rounded border border-[#8ca5b2] bg-[#f7f5ed] shadow-[8px_8px_0_rgba(29,84,114,.11)] lg:col-span-3">
              <div className="flex items-center justify-between border-b border-[#8ca5b2] bg-[#e8eeea] px-4 py-2.5 font-mono text-[11px]">
                <span className="flex gap-1.5"><i className="inline-block size-2.5 rounded-full bg-[#d75b5b]" /><i className="inline-block size-2.5 rounded-full bg-[#e5a73d]" /><i className="inline-block size-2.5 rounded-full bg-[#57b376]" /></span>
                <code>repository / spec-kit</code><span className="text-[#188da4]">10 ITEMS</span>
              </div>
              <div className="space-y-2 p-5 font-mono text-[13px] leading-7 text-[#3d5a70]">
                <p><FolderTree size={16} /> <b>spec-kit/</b></p>
                <p className="pl-4"><BookOpen size={15} /> constitution/<span>constitution.md</span></p>
                <p className="pl-4"><Code2 size={15} /> commands/<span>commands.md</span></p>
                <p className="pl-4"><Layers3 size={15} /> domains/<span>domains.md</span></p>
                <p className="pl-4"><Box size={15} /> profiles/<span>profiles.md</span></p>
                <p className="pl-4"><BookOpen size={15} /> standards/<span>standards.md</span></p>
                <p className="pl-4"><BookOpen size={15} /> templates/<span>templates.md</span></p>
                <p className="pl-4"><ShieldCheck size={15} /> validators/</p>
                <p className="pl-8"><span aria-hidden="true">▤</span> check-kinds.md <em className="text-[#95661c]">ENGINE ↔ LAW CONTRACT</em></p>
                <p className="pl-8"><FolderTree size={15} /> rules/</p>
                <p className="pl-12"><span aria-hidden="true">▤</span> agent-launch.yml</p>
                <p className="pl-12"><span aria-hidden="true">▤</span> spec-structure.yml</p>
                <p className="pl-12"><span aria-hidden="true">▤</span> traceability.yml</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              {[
                ["A", "Contract", "Xác định engine hiểu được loại luật nào. Thay đổi phải đi cùng schema và validator."],
                ["B", "Luật thực thi", "Rule packs YAML được load lúc runtime. Publish policy mới không cần recompile."],
                ["C", "Chính sách tổ chức", "Standards, templates và profiles được version-pin qua Kit Registry."],
              ].map(([idx, title, copy]) => (
                <article key={title as string} className="relative border-b border-[#a4bac3] pb-4 pl-8">
                  <span className="absolute left-0 top-1 font-mono text-[13px] text-[#b57416]">{idx}</span>
                  <h3 className="text-[15px] text-[#142641]">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#61778b]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="components" className="bg-[#102340] px-4 py-14 text-[#eaf3f4] md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cyan-300/90"><span className="font-mono text-xs">03</span><span>{t.aiSdlc.s03cLabel}</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight">{t.aiSdlc.s03cTitle1} <i className="text-cyan-300">{t.aiSdlc.s03cTitle2}</i></h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#c7d6de]">{t.aiSdlc.s03cCopy}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.aiSdlc.components.map(({ name, copy, stack, icon }, i) => {
              const Icon = (icon === "code" ? Code2 : icon === "key" ? KeyRound : icon === "db" ? Database : icon === "terminal" ? Terminal : icon === "globe" ? Globe : icon === "plug" ? Plug : Server) as typeof Code2;
              return (
                <article key={name} className="border border-[rgba(129,192,205,.24)] bg-[#143553] p-5">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#6f8ba6]">0{i + 1}</span>
                    <Icon size={17} className="text-cyan-300/80" />
                  </div>
                  <h3 className="mt-3 text-[16px] tracking-tight">{name}</h3>
                  <code className="mt-1 block text-[10px] text-cyan-300/70">{stack}</code>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-[#c7d6de]">{copy}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-6 flex items-start gap-4 border border-amber-400/25 bg-amber-400/8 p-5">
            <span className="mt-0.5 inline-block size-2.5 shrink-0 rounded-full bg-amber-400" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber-300/80">{t.aiSdlc.s03cInvariant}</span>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#dfe9d9]">{t.aiSdlc.s03cInvariantCopy}<code className="font-mono text-[12px] text-cyan-200">{t.aiSdlc.s03cBare}</code>{t.aiSdlc.s03cInvariantTail}</p>
            </div>
          </div>
        </section>

        <section id="contract" className="px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">05</span><span>THE CENTRAL CONTRACT</span></div>
            <h2 className="text-balance text-[clamp(1.6rem,5vw,2.8rem)] font-semibold leading-[1.12] tracking-tight text-[#142641]">
              <code className="text-[#1d5f7c]">check-kinds.md</code><br /><i className="text-[#1d5f7c]">nơi engine và luật gặp nhau.</i>
            </h2>
          </div>
          <div className="mb-8 max-w-2xl">
            <p className="text-[15px] leading-relaxed text-[#2e4854]">Mọi check trong rule pack phải map đúng một trong 10 check kinds của contract. <strong>Unknown kind luôn là engine change</strong> — không thể trở thành silent no-op để tránh drift ngầm giữa luật và máy.</p>
            <blockquote className="mt-5 border-l-2 border-[#0a6e7f] pl-4 text-[15px] italic text-[#1d5f7c]">“Thêm rule không cần thay engine. Thêm check kind thì có.”</blockquote>
          </div>
          <div className="overflow-hidden rounded border border-[#b5c6c9]">
            <div className="hidden grid-cols-[44px_1fr_130px_1fr] gap-3 bg-[#e8eeea] px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-[#5e7a8c] md:grid">
              <span>#</span><span>CHECK KIND</span><span>CATEGORY</span><span>BEHAVIOR</span>
            </div>
            {checkKinds.map(([n, kind, cat, behavior], i) => (
              <div key={kind} className={`grid grid-cols-[32px_1fr_1fr] items-center gap-2 px-4 py-3 text-[12px] md:grid-cols-[44px_1fr_130px_1fr] ${i % 2 ? "bg-white" : "bg-[#f7faf9]"}`}>
                <span className="font-mono text-[10px] text-[#6e8491]">{n}</span>
                <code className="truncate text-[#102340]">{kind}</code>
                <span className="hidden rounded px-2 py-0.5 text-[10px] text-[#0a6e7f] md:inline-block" style={{ border: "1px solid rgba(10,110,127,.3)", background: "rgba(10,110,127,.08)" }}>{cat}</span>
                <span className="col-span-2 text-[#4a6470] md:col-span-1">{behavior || t.aiSdlc.checks.find((c) => c.id === kind)?.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="rules" className="bg-[#102340] px-4 py-14 text-[#eaf3f4] md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cyan-300/90"><span className="font-mono text-xs">06</span><span>RUNTIME LAW</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight">13 rules. <i className="text-cyan-300">Không cần rebuild.</i></h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#c7d6de]">Ba YAML rule packs chuyển policy thành deterministic gate — chạy như nhau ở local workspace, CI và bề mặt review.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {policyPacks.map((pack, i) => (
              <article key={pack.id} className={`border p-6 ${pack.tint === "cyan" ? "border-cyan-400/30 bg-cyan-400/5" : pack.tint === "blue" ? "border-[#5b8ec7]/40 bg-[#5b8ec7]/5" : "border-amber-400/30 bg-amber-400/5"}`}>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#6f8ba6]">0{i + 1}</span>
                  <span className="text-cyan-300/70">v1.0.0</span>
                </div>
                <h3 className="mt-3 text-xl tracking-tight">{pack.id}</h3>
                <code className="mt-1 block text-[12px] text-[#8ea3bf]">{pack.file}</code>
                <p className="mt-4 text-[13px] leading-relaxed text-[#c7d6de]">{t.aiSdlc.rulePacks[i]?.copy}</p>
                <div className="mt-5 space-y-2.5 border-t border-[rgba(129,192,205,.24)] pt-4">
                  {pack.rules.map(([rule, severity, desc]) => (
                    <div key={rule as string} className="grid grid-cols-[84px_1fr] gap-2 text-[12px]">
                      <span className={`font-mono text-[10px] ${severity === "error" ? "text-[#e08a8a]" : "text-[#e5b272]"}`}>{severity}</span>
                      <div>
                        <span className="font-mono text-[11px] text-[#eaf3f4]">{rule}</span>
                        <em className="mt-0.5 block text-[11px] not-italic text-[#8ea3bf]">{desc}</em>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6f8ba6]">{pack.type}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="resolution" className="px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">06</span><span>{t.aiSdlc.s06bLabel}</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#142641]">{t.aiSdlc.s06bTitle1}<br /><i className="text-[#1d5f7c]">{t.aiSdlc.s06bTitle2}</i></h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded border border-[#8ca5b2] bg-[#f7f5ed] shadow-[8px_8px_0_rgba(29,84,114,.11)]">
              <div className="border-b border-[#8ca5b2] bg-[#e8eeea] px-4 py-2.5 font-mono text-[11px]">
                <span className="flex gap-1.5"><i className="inline-block size-2.5 rounded-full bg-[#d75b5b]" /><i className="inline-block size-2.5 rounded-full bg-[#e5a73d]" /><i className="inline-block size-2.5 rounded-full bg-[#57b376]" /></span>{" "}
                <code>locate_rules_dir(root)</code>
              </div>
              <div className="space-y-0 divide-y divide-[#d8e1e2] p-4 font-mono text-[12px] leading-7 text-[#3d5a70]">
                <div><span className="text-[#95661c]">01</span> <code>.ai-sdlc/validators/rules</code> <em className="not-italic text-[#5e7a8c]">local override · priority</em></div>
                <div><span className="text-[#95661c]">02</span> <code>spec-kit/validators/rules</code> <em className="not-italic text-[#5e7a8c]">bundled kit</em></div>
                <div><span className="text-[#95661c]">03</span> <code>&lt;manifest&gt;/../spec-kit/rules</code> <em className="not-italic text-[#5e7a8c]">crate fallback</em></div>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#5a8090]">DISTRIBUTION PATH</span>
              <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <code className="rounded bg-[#f3e7d3] px-2 py-1.5 text-[#95661c]">.ai-sdlc/config.yml</code>
                <ChevronRight size={15} className="text-[#b57416]" />
                <code className="rounded bg-[#f3e7d3] px-2 py-1.5 text-[#95661c]">resolve registry</code>
                <ChevronRight size={15} className="text-[#b57416]" />
                <code className="rounded bg-[#f3e7d3] px-2 py-1.5 text-[#95661c]">SHA256 + signature</code>
                <ChevronRight size={15} className="text-[#b57416]" />
                <code className="rounded bg-[#f3e7d3] px-2 py-1.5 text-[#95661c]">compatibility</code>
                <ChevronRight size={15} className="text-[#b57416]" />
                <strong>install</strong>
              </div>
              <p className="mt-5 text-[14px] leading-relaxed text-[#5b7082]">CLI ưu tiên rule local để dự án có không gian điều chỉnh, sau đó lần lượt tìm bundled kit và fallback bên cạnh crate — quyền điều chỉnh gần, authority xa.</p>
            </div>
          </div>
        </section>

        <section id="record" className="bg-[#e8eeea] px-4 py-14 md:px-8 md:py-20">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#0a6e7f]"><span className="font-mono text-xs">08</span><span>OPEN RECORD</span></div>
            <h2 className="text-balance text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#142641]">Mọi claim cần có<br /><i className="text-[#1d5f7c]">đường dẫn đến record.</i></h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-5">
            <article className="border border-[#b5c6c9] bg-white p-6 lg:col-span-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#5a8090]">CURRENT SOURCE OF TRUTH</span>
              <h3 className="mt-3 text-xl tracking-tight text-[#142641]">Repository trước. Website sau.</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#5b7082]">AI-SDLC được xây dựng công khai. Code, rule pack, architecture notes và release history là record có thể kiểm tra; trang này chỉ render một lát cắt dễ đọc hơn.</p>
              <a className="mt-5 inline-flex items-center gap-2 border-b border-[#1b6181] pb-1 text-[13px] font-semibold text-[#1b6181] hover:gap-3 hover:text-[#0d2d4c]" href="https://github.com/xdev-ai/ai-sdlc" target="_blank" rel="noreferrer">
                Mở AI-SDLC repository <ExternalLink size={15} />
              </a>
            </article>
            <div className="flex flex-col gap-3 lg:col-span-2">
              <a className="flex items-center gap-3 border border-[#b5c6c9] bg-white p-4 hover:border-[#0a6e7f]" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
                <span className="font-mono text-[10px] text-[#6f8ba6]">01</span>
                <div className="flex-1"><strong className="block text-[14px] text-[#142641]">xDev AI</strong><em className="block text-[12px] not-italic text-[#4a6470]">Open engineering organization</em></div>
                <ExternalLink size={16} className="text-[#0a6e7f]" />
              </a>
              <button className="flex items-center gap-3 border border-[#b5c6c9] bg-white p-4 text-left hover:border-[#0a6e7f]" onClick={() => copyText("https://ai.xdev.asia/ai-sdlc", "product")}>
                <span className="font-mono text-[10px] text-[#6f8ba6]">02</span>
                <div className="flex-1"><strong className="block text-[14px] text-[#142641]">{copied === "product" ? t.aiSdlc.copiedUrl : "ai.xdev.asia/ai-sdlc"}</strong><em className="block text-[12px] not-italic text-[#4a6470]">Product path on the umbrella</em></div>
                <Copy size={16} className="text-[#0a6e7f]" />
              </button>
              <button className="flex items-center gap-3 border border-[#b5c6c9] bg-white p-4 text-left hover:border-[#0a6e7f]" onClick={() => goTo("tree")}>
                <span className="font-mono text-[10px] text-[#6f8ba6]">03</span>
                <div className="flex-1"><strong className="block text-[14px] text-[#142641]">Spec Kit baseline</strong><em className="block text-[12px] not-italic text-[#4a6470]">Components, contract, and rule packs</em></div>
                <ChevronRight size={16} className="text-[#0a6e7f]" />
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="grid gap-8 border-y border-[#ccd6d6] py-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#5a8090]">THE GOVERNANCE PRINCIPLE</span>
              <h2 className="mt-3 text-balance text-[clamp(1.6rem,4.5vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#142641]">AI có thể drafting.<br />Luật phải <i className="text-[#1d5f7c]">deterministic.</i></h2>
            </div>
            <div className="max-w-md">
              <p className="mb-4 text-[13px] leading-relaxed text-[#5b7082]">Khi policy là YAML versioned và engine là tập đóng, thay đổi có thể review, pin, phân phối và audit — không cần tin vào một prompt.</p>
              <a className="inline-flex items-center gap-2 rounded border border-[#0a6e7f] px-5 py-3 text-sm font-medium text-[#0a6e7f] hover:bg-[#0a6e7f] hover:text-white" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
                Theo dõi xDev AI <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ccd6d6] px-4 py-6 text-[10px] uppercase tracking-[0.18em] text-[#4a6470] md:px-8">
          <span className="flex items-center gap-2"><ShieldTraceMark decorative className="size-4" /> AI-SDLC / XDEV AI</span>
          <span>GOVERNED DELIVERY PLATFORM — 2026</span>
          <span><code className="font-mono">AI.XDEV.ASIA / AI-SDLC</code></span>
        </footer>
      </main>
    </div>
  );
}

function FileIcon() {
  return <span aria-hidden="true">▤</span>;
}
