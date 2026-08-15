/* Governance Blueprint Docs: bilingual technical manual with a clear adoption path and evidence-oriented sections. */
import { ArrowUpRight, CheckCircle2, ChevronRight, FileCode2, GitBranch, Layers3, ShieldCheck } from "lucide-react";
import { PortalShell, type Locale } from "@/components/PortalShell";

const copy = {
  en: {
    eyebrow: "AI-SDLC DOCUMENTATION / 02",
    title: <>Build the delivery record<br />before you <i style={{ color: "#dbe7e5" }}>ship the change.</i></>,
    lead: "A concise, implementation-oriented guide to governed AI-assisted delivery: what AI-SDLC enforces, where Spec Kit fits, and how a team begins without treating policy as prose.",
    action: "Open Policy Registry",
    facts: [["MODEL", "POLICY AS DATA"], ["ENGINE", "RUST / CLOSED SET"], ["RECORD", "VERSIONED ARTIFACTS"]],
    outline: [["start", "Start here"], ["model", "Platform model"], ["kit", "Spec Kit"], ["adoption", "Adoption path"]],
    quickLabel: "READ THIS FIRST",
    quickTitle: "Four questions frame the system.",
    quick: [
      ["01", "What is controlled?", "Rules, templates, standards, and agent launch constraints are versioned artifacts — not a set of chat instructions."],
      ["02", "What remains deterministic?", "The validator only executes a closed set of check kinds. Unknown behavior is an engine change, never an implied no-op."],
      ["03", "What is proven?", "Trace edges connect requirements, specifications, tasks, tests, and validation results into a reviewable record."],
      ["04", "Where does it live?", "The repository is the record. The portal makes the current model easier to inspect and share."],
    ],
    modelLabel: "01 / PLATFORM MODEL",
    modelTitle: "AI assists the work. The platform governs the evidence.",
    modelText: "AI-SDLC does not position an LLM as the decision-maker. AI can help draft or review artifacts, while declared policy, deterministic validation, and accountable review remain in the delivery path.",
    modelList: ["Intent becomes a typed requirement or decision artifact.", "Specification gives the validator a reviewable shape.", "Policy packs evaluate that shape through explicit check kinds.", "Evidence is retained as trace links and validation output."],
    kitLabel: "02 / SPEC KIT",
    kitTitle: "Version policy separately from the validator.",
    kitText: "Spec Kit is the distributable law layer. YAML packs express rules; Markdown holds contracts, templates, standards, and future domain packs. Rust remains the deterministic engine that interprets the data.",
    codeCaption: "Minimal project pin / illustrative configuration",
    adoptionLabel: "03 / ADOPTION PATH",
    adoptionTitle: "Start with one bounded flow.",
    adoption: [
      ["01", "Pin the baseline", "Add the AI-SDLC configuration and resolve a known Kit version for one project."],
      ["02", "Validate the entry", "Use SPEC-STRUCT first so every eligible spec has a stable ID and usable sections."],
      ["03", "Add trace evidence", "Introduce requirement-to-spec and business-rule-to-test edges before expanding policy coverage."],
      ["04", "Review exceptions", "Keep overrides explicit, owned, and time-bounded rather than burying them in local instructions."],
    ],
    record: "Open record",
    recordText: "The current repository remains the implementation source of truth. This documentation describes its public baseline.",
    repo: "View repository",
  },
  vi: {
    eyebrow: "AI-SDLC DOCUMENTATION / 02",
    title: <>Lập delivery record<br />trước khi <i style={{ color: "#dbe7e5" }}>ship thay đổi.</i></>,
    lead: "Hướng dẫn ngắn gọn, thiên về triển khai cho AI-assisted delivery có governance: AI-SDLC enforce điều gì, Spec Kit đứng ở đâu và cách team bắt đầu mà không biến policy thành văn xuôi trong chat.",
    action: "Mở Kho chính sách",
    facts: [["MODEL", "POLICY AS DATA"], ["ENGINE", "RUST / CLOSED SET"], ["RECORD", "VERSIONED ARTIFACTS"]],
    outline: [["start", "Bắt đầu"], ["model", "Mô hình nền tảng"], ["kit", "Spec Kit"], ["adoption", "Lộ trình áp dụng"]],
    quickLabel: "ĐỌC PHẦN NÀY TRƯỚC",
    quickTitle: "Bốn câu hỏi định hình hệ thống.",
    quick: [
      ["01", "Hệ thống kiểm soát điều gì?", "Rules, templates, standards và ràng buộc launch agent là artifact có version — không phải chỉ dẫn nằm trong chat."],
      ["02", "Điều gì luôn deterministic?", "Validator chỉ chạy tập check kinds đóng. Hành vi chưa biết là thay đổi engine, không phải no-op được ngầm hiểu."],
      ["03", "Điều gì được chứng minh?", "Trace edges nối requirement, specification, task, test và validation result thành record có thể review."],
      ["04", "Record nằm ở đâu?", "Repository là record. Portal giúp model hiện tại dễ xem và chia sẻ hơn."],
    ],
    modelLabel: "01 / PLATFORM MODEL",
    modelTitle: "AI hỗ trợ công việc. Platform governance evidence.",
    modelText: "AI-SDLC không đặt LLM vào vai người ra quyết định. AI có thể hỗ trợ draft hoặc review artifact, trong khi policy đã khai báo, validation deterministic và accountable review vẫn nằm trong delivery path.",
    modelList: ["Intent trở thành requirement hoặc decision artifact có kiểu.", "Specification tạo hình dạng có thể review cho validator.", "Policy packs đánh giá hình dạng đó qua check kinds tường minh.", "Evidence được giữ bằng trace links và validation output."],
    kitLabel: "02 / SPEC KIT",
    kitTitle: "Version policy độc lập với validator.",
    kitText: "Spec Kit là lớp luật có thể phân phối. YAML packs biểu đạt rules; Markdown giữ contract, template, standard và domain pack trong tương lai. Rust vẫn là engine deterministic diễn giải data.",
    codeCaption: "Project pin tối thiểu / cấu hình minh họa",
    adoptionLabel: "03 / ADOPTION PATH",
    adoptionTitle: "Bắt đầu bằng một flow có phạm vi hẹp.",
    adoption: [
      ["01", "Pin baseline", "Thêm AI-SDLC config và resolve Kit version đã biết cho một project."],
      ["02", "Validate entry", "Dùng SPEC-STRUCT trước để mọi spec đủ điều kiện có stable ID và section dùng được."],
      ["03", "Thêm trace evidence", "Đưa các edge requirement-to-spec và business-rule-to-test vào trước khi mở rộng policy coverage."],
      ["04", "Review exception", "Giữ override tường minh, có owner và expiry thay vì giấu trong local instruction."],
    ],
    record: "Open record",
    recordText: "Repository hiện tại vẫn là implementation source of truth. Tài liệu này mô tả public baseline của nó.",
    repo: "Mở repository",
  },
} as const;

export default function Docs() {
  return <PortalShell route="docs">{(locale) => <DocsContent locale={locale} />}</PortalShell>;
}

function DocsContent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="docs-page">
      <section className="docs-hero">
        <div className="docs-hero-grid" aria-hidden="true" />
        <div><div className="eyebrow"><span className="pulse-line" /> {t.eyebrow}</div><h1>{t.title}</h1><p>{t.lead}</p><a className="ink-button" href="/policies">{t.action} <ArrowUpRight size={16} /></a></div>
        <div className="docs-facts">{t.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      </section>

      <div className="docs-body">
        <aside className="docs-outline" aria-label={locale === "en" ? "Documentation outline" : "Mục lục tài liệu"}>
          <span className="mono-label">{locale === "en" ? "ON THIS PAGE" : "TRÊN TRANG NÀY"}</span>
          {t.outline.map(([id, label], index) => <button key={id} onClick={() => scrollTo(id)}><span>0{index + 1}</span>{label}<ChevronRight size={13} /></button>)}
        </aside>

        <div className="docs-content">
          <section id="start" className="docs-section"><div className="section-marker"><span>00</span><span>{t.quickLabel}</span></div><h2>{t.quickTitle}</h2><div className="question-grid">{t.quick.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

          <section id="model" className="docs-section docs-model"><div className="docs-section-copy"><div className="section-marker"><span>01</span><span>{t.modelLabel}</span></div><h2>{t.modelTitle}</h2><p>{t.modelText}</p></div><div className="evidence-list">{t.modelList.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><CheckCircle2 size={16} /><p>{item}</p></div>)}</div></section>

          <section id="kit" className="docs-section kit-manual"><div><div className="section-marker"><span>02</span><span>{t.kitLabel}</span></div><h2>{t.kitTitle}</h2><p>{t.kitText}</p><div className="kit-icons"><span><FileCode2 size={18} /> YAML rule packs</span><span><Layers3 size={18} /> Markdown contracts</span><span><ShieldCheck size={18} /> Rust validator</span></div></div><figure className="docs-code"><figcaption>{t.codeCaption}</figcaption><pre>{`kit:
  version: "^1.0.0"

validators:
  rules_dir: .ai-sdlc/validators/rules

agent:
  deny_argv: ["--bare"]
  require_argv: ["--model"]`}</pre></figure></section>

          <section id="adoption" className="docs-section adoption-section"><div className="section-marker"><span>03</span><span>{t.adoptionLabel}</span></div><h2>{t.adoptionTitle}</h2><div className="adoption-list">{t.adoption.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><GitBranch size={18} /></article>)}</div></section>

          <section className="docs-record"><div><span className="mono-label">{t.record}</span><p>{t.recordText}</p></div><a href="https://github.com/tdduydev/ai-sdlc" target="_blank" rel="noreferrer" className="underlined-button">{t.repo} <ArrowUpRight size={15} /></a></section>
        </div>
      </div>
    </div>
  );
}
