/* Governance Blueprint Docs: bilingual technical manual with lifecycle, control, adoption, and reference structures. */
import { ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, FileCode2, GitBranch, Layers3, Network, Settings2, ShieldCheck, Workflow } from "lucide-react";
import { PortalShell, type Locale } from "@/components/PortalShell";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";

type DocsCopy = {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  action: string;
  facts: readonly (readonly [string, string])[];
  outline: readonly (readonly [string, string])[];
  start: { label: string; title: string; lead: string; questions: readonly (readonly [string, string, string])[]; readerPaths: readonly (readonly [string, string])[] };
  foundation: { label: string; title: string; text: string; cards: readonly (readonly [string, string])[] };
  lifecycle: { label: string; title: string; text: string; stages: readonly (readonly [string, string, string])[] };
  kit: { label: string; title: string; text: string; caption: string };
  validation: { label: string; title: string; text: string; controls: readonly (readonly [string, string, string])[] };
  adoption: { label: string; title: string; steps: readonly (readonly [string, string, string])[] };
  operations: { label: string; title: string; text: string; rows: readonly (readonly [string, string])[] };
  reference: { label: string; title: string; cards: readonly (readonly [string, string])[] };
  record: string;
  recordText: string;
  repo: string;
};

const copy: Record<Locale, DocsCopy> = {
  en: {
    eyebrow: "AI-SDLC DOCUMENTATION / 02",
    title: <>Build the delivery record<br />before you <i style={{ color: "#dbe7e5" }}>ship the change.</i></>,
    lead: "A practical, bilingual map for governed AI-assisted delivery. Follow the lifecycle, inspect the controls, and keep a reviewable record from intent to release.",
    action: "Open Policy Registry",
    facts: [["MODEL", "POLICY AS DATA"], ["ENGINE", "RUST / CLOSED SET"], ["RECORD", "VERSIONED ARTIFACTS"]],
    outline: [["start", "Start here"], ["foundation", "Foundations"], ["lifecycle", "Delivery lifecycle"], ["kit", "Spec Kit"], ["validation", "Validation"], ["adoption", "Team adoption"], ["operations", "Operations"], ["reference", "Reference"]],
    start: {
      label: "00 / START HERE", title: "Choose a reading path before choosing a tool.", lead: "AI-SDLC is not a prompt library. It is a system for declaring controls, validating artifacts, and retaining evidence.",
      questions: [["01", "What is controlled?", "Rules, templates, standards, and agent constraints are versioned artifacts—not hidden chat instructions."], ["02", "What remains deterministic?", "The validator only executes a closed set of check kinds. Unknown behavior is an engine change, never an implied no-op."], ["03", "What is proven?", "Trace edges connect requirements, specifications, tasks, tests, and validation outputs into a reviewable record."], ["04", "Where does it live?", "The repository is the implementation record. The portal is its inspectable public baseline."]],
      readerPaths: [["PRODUCT / BA", "Start → Lifecycle → Spec Kit → TRACE"], ["ENGINEERING", "Foundations → Validation → Rule packs → Reference"], ["QA / REVIEW", "Lifecycle → Evidence → Registry → Exceptions"], ["PLATFORM OWNER", "Spec Kit → Operations → Compatibility → Changes"]],
    },
    foundation: { label: "01 / FOUNDATIONS", title: "AI assists the work. The platform governs the evidence.", text: "AI-SDLC keeps AI outside the decision path. AI may draft or review artifacts; declared policy, deterministic validation, and accountable human review remain inside the delivery path.", cards: [["Policy as data", "Rules live in versioned YAML and Markdown artifacts so a change can be reviewed, pinned, and distributed."], ["Closed execution", "The Rust engine recognizes declared check kinds only. New semantics require an explicit engine change."], ["Artifact graph", "Typed IDs and trace edges make delivery relationships inspectable instead of reconstructing them after release."], ["Evidence retained", "Validation results and approvals are outputs of the process, not retrospective claims."]] },
    lifecycle: { label: "02 / DELIVERY LIFECYCLE", title: "One change, one accountable path.", text: "Each stage has an intended artifact, a control question, and a form of evidence. Teams can start with a bounded segment and extend the path progressively.", stages: [["01", "Intent → requirement", "Capture the problem, business rule, and acceptance criteria with a stable ID."], ["02", "Requirement → specification", "Refine intent into a structured, reviewable specification."], ["03", "Specification → task", "Turn approved shape into implementation work without losing trace links."], ["04", "Test → validation", "Check policy, traceability, and test evidence using deterministic rules."], ["05", "Release → record", "Retain validated output, exceptions, and review evidence for the release."]] },
    kit: { label: "03 / SPEC KIT", title: "Version policy separately from the validator.", text: "Spec Kit is the distributable law layer. YAML packs express rules; Markdown holds contracts, templates, standards, profiles, and future domain packs. Rust remains the deterministic engine that interprets data.", caption: "Minimal project pin / illustrative configuration" },
    validation: { label: "04 / VALIDATION", title: "A finding is a control signal, not an opinion.", text: "Validation is useful only when readers can see the source pack, the declared check, the severity, and the remediation or exception route.", controls: [["STRUCTURE", "Specification entry", "Check ID grammar, required frontmatter, required sections, and uniqueness."], ["TRACE", "Artifact graph", "Resolve requirement-to-specification and business-rule-to-test evidence edges."], ["LAUNCH", "Agent command", "Pin declared models and prohibit unsafe bare launch arguments."], ["EXCEPTION", "Controlled deviation", "Record a rationale, accountable owner, approver, and expiry rather than bypassing a rule silently."]] },
    adoption: { label: "05 / TEAM ADOPTION", title: "Start with one bounded flow.", steps: [["01", "Pin the baseline", "Resolve a known Kit and validator version for one project."], ["02", "Validate the entry", "Use specification structure first so eligible artifacts have stable IDs and usable sections."], ["03", "Add trace evidence", "Introduce requirement-to-specification and business-rule-to-test edges before widening coverage."], ["04", "Review exceptions", "Keep overrides explicit, owned, approved, and time-bounded."], ["05", "Expand by role", "Give BA, engineering, QA, and reviewers a shared contract, not four disconnected playbooks."]] },
    operations: { label: "06 / OPERATIONS", title: "Operate policy as a releaseable product.", text: "The Registry describes the public baseline; change management keeps each policy version, compatibility promise, and exception pathway inspectable.", rows: [["KIT RELEASE", "Version, sign, and publish a compatible baseline."], ["CONTROL REVIEW", "Review intent, owner, evidence, and severity on the declared cadence."], ["COMPATIBILITY", "State supported validator and Kit version ranges before rollout."], ["ROLLBACK", "Retain a prior pinned Kit so a policy change can be reversed deterministically."]] },
    reference: { label: "07 / REFERENCE", title: "Exact language belongs close to the implementation.", cards: [["Artifact & ID grammar", "Stable identifiers, artifact kinds, and trace edge vocabulary."], ["Configuration reference", "Project pinning, rule directories, local overrides, and compatibility."], ["CLI & validator", "Commands, output contracts, closed check kinds, and remediation flow."], ["Glossary", "Shared definitions for policy, evidence, exception, pack, and control."], ["Compatibility matrix", "Supported Kit, validator, schema, and portal baseline combinations."]] },
    record: "Open record", recordText: "The core repository is the implementation source of truth. Docs explains the operating model; Policy Registry exposes its current controls.", repo: "View AI-SDLC repository",
  },
  vi: {
    eyebrow: "AI-SDLC DOCUMENTATION / 02",
    title: <>Lập delivery record<br />trước khi <i style={{ color: "#dbe7e5" }}>ship thay đổi.</i></>,
    lead: "Bản đồ song ngữ, thực dụng cho AI-assisted delivery có governance. Đi theo lifecycle, kiểm tra control và giữ record có thể review từ intent đến release.",
    action: "Mở Kho chính sách",
    facts: [["MODEL", "POLICY AS DATA"], ["ENGINE", "RUST / CLOSED SET"], ["RECORD", "VERSIONED ARTIFACTS"]],
    outline: [["start", "Bắt đầu"], ["foundation", "Nền tảng"], ["lifecycle", "Vòng đời delivery"], ["kit", "Spec Kit"], ["validation", "Validation"], ["adoption", "Áp dụng cho team"], ["operations", "Vận hành"], ["reference", "Tham chiếu"]],
    start: {
      label: "00 / BẮT ĐẦU", title: "Chọn lộ trình đọc trước khi chọn công cụ.", lead: "AI-SDLC không phải prompt library. Đây là hệ thống để khai báo control, validate artifact và lưu evidence.",
      questions: [["01", "Hệ thống kiểm soát điều gì?", "Rules, templates, standards và ràng buộc agent là artifact có version—không phải chỉ dẫn ẩn trong chat."], ["02", "Điều gì luôn deterministic?", "Validator chỉ chạy tập check kinds đóng. Hành vi chưa biết là thay đổi engine, không phải no-op được ngầm hiểu."], ["03", "Điều gì được chứng minh?", "Trace edges nối requirement, specification, task, test và validation output thành record có thể review."], ["04", "Record nằm ở đâu?", "Repository là implementation record. Portal là public baseline có thể kiểm tra của nó."]],
      readerPaths: [["PRODUCT / BA", "Bắt đầu → Vòng đời → Spec Kit → TRACE"], ["ENGINEERING", "Nền tảng → Validation → Rule packs → Tham chiếu"], ["QA / REVIEW", "Vòng đời → Evidence → Registry → Exception"], ["PLATFORM OWNER", "Spec Kit → Vận hành → Tương thích → Thay đổi"]],
    },
    foundation: { label: "01 / NỀN TẢNG", title: "AI hỗ trợ công việc. Platform governance evidence.", text: "AI-SDLC giữ AI ngoài decision path. AI có thể draft hoặc review artifact; policy đã khai báo, validation deterministic và human review có trách nhiệm vẫn nằm trong delivery path.", cards: [["Policy là data", "Rules nằm trong YAML và Markdown có version để thay đổi có thể review, pin và phân phối."], ["Thực thi đóng", "Rust engine chỉ nhận check kinds đã khai báo. Semantics mới cần thay đổi engine tường minh."], ["Đồ thị artifact", "ID có kiểu và trace edge làm quan hệ delivery có thể kiểm tra thay vì dựng lại sau release."], ["Evidence được giữ", "Validation result và approval là output của quy trình, không phải tuyên bố hồi tố."]] },
    lifecycle: { label: "02 / VÒNG ĐỜI DELIVERY", title: "Một thay đổi, một đường đi có trách nhiệm.", text: "Mỗi stage có artifact mong đợi, câu hỏi control và dạng evidence. Team có thể bắt đầu từ một đoạn giới hạn rồi mở rộng dần.", stages: [["01", "Intent → requirement", "Ghi nhận vấn đề, business rule và acceptance criteria với ID ổn định."], ["02", "Requirement → specification", "Refine intent thành specification có cấu trúc, có thể review."], ["03", "Specification → task", "Biến shape đã duyệt thành implementation work mà không mất trace link."], ["04", "Test → validation", "Kiểm tra policy, traceability và test evidence bằng rule deterministic."], ["05", "Release → record", "Lưu validated output, exception và review evidence cho release."]] },
    kit: { label: "03 / SPEC KIT", title: "Version policy độc lập với validator.", text: "Spec Kit là lớp luật có thể phân phối. YAML packs biểu đạt rules; Markdown giữ contract, template, standard, profile và domain pack trong tương lai. Rust vẫn là engine deterministic diễn giải data.", caption: "Project pin tối thiểu / cấu hình minh họa" },
    validation: { label: "04 / VALIDATION", title: "Một finding là control signal, không phải ý kiến.", text: "Validation chỉ hữu ích khi người đọc thấy pack nguồn, check khai báo, severity và lộ trình remediation hoặc exception.", controls: [["STRUCTURE", "Cổng vào specification", "Kiểm ID grammar, frontmatter bắt buộc, section bắt buộc và tính unique."], ["TRACE", "Đồ thị artifact", "Resolve evidence edge requirement-to-specification và business-rule-to-test."], ["LAUNCH", "Agent command", "Pin model đã khai báo và cấm bare launch argument không an toàn."], ["EXCEPTION", "Sai lệch có kiểm soát", "Ghi rationale, owner chịu trách nhiệm, approver và expiry thay vì bypass rule im lặng."]] },
    adoption: { label: "05 / ÁP DỤNG CHO TEAM", title: "Bắt đầu bằng một flow có phạm vi hẹp.", steps: [["01", "Pin baseline", "Resolve Kit và validator version đã biết cho một project."], ["02", "Validate entry", "Dùng specification structure trước để artifact đủ điều kiện có stable ID và section dùng được."], ["03", "Thêm trace evidence", "Đưa edge requirement-to-specification và business-rule-to-test vào trước khi mở rộng coverage."], ["04", "Review exception", "Giữ override tường minh, có owner, được duyệt và có thời hạn."], ["05", "Mở rộng theo vai trò", "BA, engineering, QA và reviewer dùng chung một contract, không dùng bốn playbook tách rời."]] },
    operations: { label: "06 / VẬN HÀNH", title: "Vận hành policy như một product có thể release.", text: "Registry mô tả public baseline; change management giữ mọi policy version, compatibility promise và exception pathway có thể kiểm tra.", rows: [["KIT RELEASE", "Version, ký và publish baseline tương thích."], ["CONTROL REVIEW", "Review intent, owner, evidence và severity theo cadence đã khai báo."], ["COMPATIBILITY", "Nêu rõ validator và Kit version hỗ trợ trước khi rollout."], ["ROLLBACK", "Giữ Kit pin trước đó để thay đổi policy có thể reverse deterministic."]] },
    reference: { label: "07 / THAM CHIẾU", title: "Ngôn ngữ chính xác phải ở gần implementation.", cards: [["Artifact & ID grammar", "Định danh ổn định, artifact kinds và từ vựng trace edge."], ["Tham chiếu cấu hình", "Project pinning, rule directory, local override và compatibility."], ["CLI & validator", "Command, output contract, check kind đóng và remediation flow."], ["Thuật ngữ", "Định nghĩa chung cho policy, evidence, exception, pack và control."], ["Ma trận tương thích", "Tổ hợp Kit, validator, schema và portal baseline được hỗ trợ."]] },
    record: "Open record", recordText: "Core repository là implementation source of truth. Docs giải thích operating model; Policy Registry công khai các control hiện tại.", repo: "Mở repository AI-SDLC",
  },
};

export default function Docs() {
  return <PortalShell route="docs">{(locale) => <DocsContent locale={locale} />}</PortalShell>;
}

function DocsContent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="docs-page">
      <section className="docs-hero"><div className="docs-hero-grid" aria-hidden="true" /><div><div className="eyebrow"><span className="pulse-line" /> {t.eyebrow}</div><h1>{t.title}</h1><p>{t.lead}</p><div className="docs-hero-seal"><ShieldTraceMark /><div><span>GOVERNED DOSSIER / DOCS-02</span><strong>{locale === "en" ? "Evidence-bound delivery manual" : "Manual delivery gắn với evidence"}</strong></div><i className="verify-dot" aria-hidden="true" /></div><a className="ink-button" href="/policies">{t.action} <ArrowUpRight size={16} /></a></div><div className="docs-facts">{t.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>
      <div className="docs-body">
        <aside className="docs-outline" aria-label={locale === "en" ? "Documentation outline" : "Mục lục tài liệu"}><span className="mono-label">{locale === "en" ? "DOCUMENT MAP" : "BẢN ĐỒ TÀI LIỆU"}</span>{t.outline.map(([id, label], index) => <button key={id} onClick={() => scrollTo(id)}><span>{String(index).padStart(2, "0")}</span>{label}<ChevronRight size={13} /></button>)}</aside>
        <div className="docs-content">
          <DossierBand index="00" locale={locale} en="READING RECORD / CONTROLLED BASELINE" vi="HỒ SƠ ĐỌC / BASELINE CÓ KIỂM SOÁT" />
          <section id="start" className="docs-section"><div className="section-marker"><span>00</span><span>{t.start.label}</span></div><h2>{t.start.title}</h2><p className="docs-lead">{t.start.lead}</p><div className="question-grid">{t.start.questions.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="reader-paths">{t.start.readerPaths.map(([role, path]) => <div key={role}><code>{role}</code><span>{path}</span></div>)}</div></section>
          <section id="foundation" className="docs-section docs-model"><div className="docs-section-copy"><div className="section-marker"><span>01</span><span>{t.foundation.label}</span></div><h2>{t.foundation.title}</h2><p>{t.foundation.text}</p></div><div className="foundation-grid">{t.foundation.cards.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
          <DossierBand index="02" locale={locale} en="TRACE PATH / INTENT → RECORD" vi="ĐƯỜNG TRACE / INTENT → RECORD" />
          <section id="lifecycle" className="docs-section"><div className="section-marker"><span>02</span><span>{t.lifecycle.label}</span></div><h2>{t.lifecycle.title}</h2><p className="docs-lead">{t.lifecycle.text}</p><div className="lifecycle-manual">{t.lifecycle.stages.map(([number, title, text], index) => <article key={number}><span>{number}</span><Workflow size={16} /><h3>{title}</h3><p>{text}</p>{index < t.lifecycle.stages.length - 1 && <i aria-hidden="true" />}</article>)}</div></section>
          <section id="kit" className="docs-section kit-manual"><div><div className="section-marker"><span>03</span><span>{t.kit.label}</span></div><h2>{t.kit.title}</h2><p>{t.kit.text}</p><div className="kit-icons"><span><FileCode2 size={18} /> YAML rule packs</span><span><Layers3 size={18} /> Markdown contracts</span><span><ShieldCheck size={18} /> Rust validator</span></div></div><figure className="docs-code"><figcaption>{t.kit.caption}</figcaption><pre>{`kit:
  version: "^1.0.0"

validators:
  rules_dir: .ai-sdlc/validators/rules

agent:
  deny_argv: ["--bare"]
  require_argv: ["--model"]`}</pre></figure></section>
          <DossierBand index="04" locale={locale} en="CONTROL LEDGER / DECLARED CHECKS" vi="SỔ CÁI CONTROL / CHECK ĐÃ KHAI BÁO" />
          <section id="validation" className="docs-section"><div className="section-marker"><span>04</span><span>{t.validation.label}</span></div><h2>{t.validation.title}</h2><p className="docs-lead">{t.validation.text}</p><div className="control-board">{t.validation.controls.map(([label, title, text]) => <article key={label}><code>{label}</code><div><h3>{title}</h3><p>{text}</p></div><CheckCircle2 size={17} /></article>)}</div><a href="/policies" className="underlined-button">{locale === "en" ? "Inspect current policy controls" : "Kiểm tra policy control hiện tại"} <ArrowUpRight size={15} /></a></section>
          <section id="adoption" className="docs-section adoption-section"><div className="section-marker"><span>05</span><span>{t.adoption.label}</span></div><h2>{t.adoption.title}</h2><div className="adoption-list">{t.adoption.steps.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><GitBranch size={18} /></article>)}</div></section>
          <DossierBand index="06" locale={locale} en="RELEASE RECORD / OWNED CHANGE" vi="HỒ SƠ RELEASE / THAY ĐỔI CÓ OWNER" />
          <section id="operations" className="docs-section"><div className="section-marker"><span>06</span><span>{t.operations.label}</span></div><h2>{t.operations.title}</h2><p className="docs-lead">{t.operations.text}</p><div className="ops-ledger">{t.operations.rows.map(([label, text]) => <div key={label}><Settings2 size={15} /><code>{label}</code><span>{text}</span></div>)}</div></section>
          <section id="reference" className="docs-section"><div className="section-marker"><span>07</span><span>{t.reference.label}</span></div><h2>{t.reference.title}</h2><div className="reference-grid">{t.reference.cards.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><BookOpen size={17} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
          <section className="docs-record"><div><span className="mono-label">{t.record}</span><p>{t.recordText}</p></div><a href="https://github.com/xdev-ai/ai-sdlc" target="_blank" rel="noreferrer" className="underlined-button">{t.repo} <ArrowUpRight size={15} /></a></section>
        </div>
      </div>
    </div>
  );
}

function DossierBand({ index, locale, en, vi }: { index: string; locale: Locale; en: string; vi: string }) {
  return <div className="docs-dossier-band" aria-label={locale === "en" ? "Documentation dossier marker" : "Dấu mốc hồ sơ tài liệu"}><span className="docs-dossier-index">{index}</span><span className="docs-dossier-trace" aria-hidden="true"><i /><b /></span><strong>{locale === "en" ? en : vi}</strong><span className="docs-dossier-proof"><i className="verify-dot" /> {locale === "en" ? "VERIFIED PATH" : "ĐƯỜNG ĐÃ KIỂM"}</span></div>;
}
