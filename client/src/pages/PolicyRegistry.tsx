/* Governance Blueprint Policy Registry: bilingual read-only catalogue of the repository's current deterministic rule packs. */
import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, CircleCheck, Filter, ShieldCheck } from "lucide-react";
import { PortalShell, type Locale } from "@/components/PortalShell";

type Pack = {
  id: string;
  file: string;
  scope: "command" | "spec" | "graph";
  rules: Array<{ id: string; severity: "error" | "warning"; en: string; vi: string }>;
  en: { title: string; summary: string; method: string };
  vi: { title: string; summary: string; method: string };
};

const packs: Pack[] = [
  { id: "AGENT-LAUNCH", file: "agent-launch.yml", scope: "command", en: { title: "Pinned agent launch", summary: "Makes model selection and verified launch constraints machine-checkable.", method: "Command definition lint" }, vi: { title: "Agent launch được pin", summary: "Biến model selection và launch constraint đã verify thành thứ máy có thể kiểm tra.", method: "Lint command definition" }, rules: [{ id: "LAUNCH-001", severity: "error", en: "Automated commands must pin --model.", vi: "Automated command phải pin --model." }, { id: "LAUNCH-002", severity: "error", en: "Kit commands must not use --bare.", vi: "Kit command không được dùng --bare." }] },
  { id: "SPEC-STRUCT", file: "spec-structure.yml", scope: "spec", en: { title: "Structured specification entry", summary: "Keeps incoming Markdown specifications identifiable, shaped, and usable by downstream validation.", method: "Specification validation" }, vi: { title: "Cổng vào specification có cấu trúc", summary: "Giữ Markdown specification đầu vào có định danh, hình dạng và khả năng dùng cho validation phía sau.", method: "Specification validation" }, rules: [{ id: "SPEC-STRUCT-001", severity: "error", en: "Frontmatter must include id.", vi: "Frontmatter phải có id." }, { id: "SPEC-STRUCT-002", severity: "error", en: "ID must match the artifact grammar.", vi: "ID phải khớp artifact grammar." }, { id: "SPEC-STRUCT-003", severity: "error", en: "Description must be present and non-empty.", vi: "Description phải tồn tại và không rỗng." }, { id: "SPEC-STRUCT-004", severity: "warning", en: "Acceptance Criteria is recommended.", vi: "Khuyến nghị Acceptance Criteria." }, { id: "SPEC-STRUCT-005", severity: "warning", en: "Non-functional Requirements is recommended.", vi: "Khuyến nghị Non-functional Requirements." }, { id: "SPEC-STRUCT-006", severity: "error", en: "Artifact IDs must be unique across files.", vi: "Artifact ID phải unique giữa các file." }] },
  { id: "TRACE", file: "traceability.yml", scope: "graph", en: { title: "Traceability invariants", summary: "Enforces key edges across the artifact graph so evidence is not a post-release reconstruction.", method: "Artifact graph validation" }, vi: { title: "Bất biến traceability", summary: "Enforce các edge quan trọng trong artifact graph để evidence không phải được dựng lại sau release.", method: "Artifact graph validation" }, rules: [{ id: "TRACE-001", severity: "error", en: "Each business rule needs a verified_by edge to a test case.", vi: "Mỗi business rule cần edge verified_by đến test case." }, { id: "TRACE-002", severity: "error", en: "Each requirement needs a refines edge from a specification.", vi: "Mỗi requirement cần edge refines từ specification." }, { id: "TRACE-003", severity: "warning", en: "Acceptance criteria should be tracked by an implementation task.", vi: "Acceptance criteria nên được tracked_by bởi implementation task." }, { id: "TRACE-004", severity: "error", en: "Every referenced ID must resolve in the run.", vi: "Mọi referenced ID phải resolve trong run." }] },
];

const copy = {
  en: { eyebrow: "POLICY REGISTRY / 03", title: <>Policy is not prose.<br />It is a <i style={{ color: "#dbe7e5" }}>versioned control surface.</i></>, lead: "A read-only public baseline for the rule packs currently carried by AI-SDLC Spec Kit. Entries reveal what is enforced, where it applies, and how the validator evaluates it.", status: "CURRENT BASELINE", filters: { all: "All scopes", command: "Command", spec: "Spec", graph: "Trace graph" }, details: "Pack detail", rules: "Rules", scope: "Applies to", method: "Enforcement", version: "Version", note: "Registry note", noteText: "This page is a public browse surface. Authoring, approval, signing, and distribution belong to the future Kit Registry control plane.", docs: "Read Docs" },
  vi: { eyebrow: "POLICY REGISTRY / 03", title: <>Policy không phải văn xuôi.<br />Nó là một <i style={{ color: "#dbe7e5" }}>control surface có version.</i></>, lead: "Public baseline ở chế độ chỉ đọc cho các rule packs hiện có trong AI-SDLC Spec Kit. Mỗi entry cho thấy điều gì được enforce, nó áp dụng ở đâu và validator đánh giá nó ra sao.", status: "CURRENT BASELINE", filters: { all: "Tất cả scope", command: "Command", spec: "Spec", graph: "Trace graph" }, details: "Chi tiết pack", rules: "Rules", scope: "Applies to", method: "Enforcement", version: "Version", note: "Ghi chú Registry", noteText: "Trang này là public browse surface. Authoring, approval, signing và distribution thuộc về Kit Registry control plane trong tương lai.", docs: "Đọc Docs" },
} as const;

export default function PolicyRegistry() {
  return <PortalShell route="policies">{(locale) => <RegistryContent locale={locale} />}</PortalShell>;
}

function RegistryContent({ locale }: { locale: Locale }) {
  const [scope, setScope] = useState<"all" | Pack["scope"]>("all");
  const [selectedId, setSelectedId] = useState("AGENT-LAUNCH");
  const t = copy[locale];
  const selected = packs.find((pack) => pack.id === selectedId) ?? packs[0];
  const filtered = useMemo(() => packs.filter((pack) => scope === "all" || pack.scope === scope), [scope]);
  const scopeLabel = (value: Pack["scope"]) => t.filters[value];

  return (
    <div className="registry-page">
      <section className="registry-hero"><div className="registry-grid" aria-hidden="true" /><div><div className="eyebrow"><span className="pulse-line" /> {t.eyebrow}</div><h1>{t.title}</h1><p>{t.lead}</p></div><div className="registry-status"><span className="verify-dot" /><span>{t.status}</span><strong>{packs.length} PACKS / v1.0.0</strong></div></section>
      <section className="registry-workbench">
        <div className="registry-toolbar"><div><span className="mono-label"><Filter size={13} /> {locale === "en" ? "FILTER BY SCOPE" : "LỌC THEO SCOPE"}</span><div className="filter-tabs">{(["all", "command", "spec", "graph"] as const).map((value) => <button key={value} className={scope === value ? "is-active" : ""} onClick={() => { setScope(value); if (value !== "all" && selected.scope !== value) setSelectedId(packs.find((pack) => pack.scope === value)?.id ?? selectedId); }}>{t.filters[value]}</button>)}</div></div><a href="/docs" className="text-button">{t.docs} <ArrowUpRight size={15} /></a></div>
        <div className="registry-layout">
          <div className="registry-list">{filtered.map((pack, index) => <button key={pack.id} className={selected.id === pack.id ? "is-selected" : ""} onClick={() => setSelectedId(pack.id)}><span>0{index + 1}</span><div><code>{pack.id}</code><strong>{pack[locale].title}</strong><em>{pack.file}</em></div><ChevronRight size={17} /></button>)}</div>
          <article className="pack-detail"><div className="detail-top"><div><span className="mono-label">{t.details}</span><h2>{selected[locale].title}</h2></div><div className="detail-id"><ShieldCheck size={17} /><code>{selected.id}</code></div></div><p className="detail-summary">{selected[locale].summary}</p><div className="detail-meta"><div><span>{t.version}</span><strong>v1.0.0</strong></div><div><span>{t.scope}</span><strong>{scopeLabel(selected.scope)}</strong></div><div><span>{t.method}</span><strong>{selected[locale].method}</strong></div></div><div className="detail-rules"><div className="detail-rule-head"><span>{t.rules}</span><span>{selected.rules.length} {locale === "en" ? "declared checks" : "check đã khai báo"}</span></div>{selected.rules.map((rule) => <div key={rule.id} className="detail-rule"><CircleCheck size={15} /><code>{rule.id}</code><span className={`severity ${rule.severity}`}>{rule.severity}</span><p>{rule[locale]}</p></div>)}</div></article>
        </div>
      </section>
      <section className="registry-note"><div><span className="mono-label">{t.note}</span><p>{t.noteText}</p></div><a href="https://github.com/tdduydev/ai-sdlc" target="_blank" rel="noreferrer" className="underlined-button">GitHub <ArrowUpRight size={15} /></a></section>
    </div>
  );
}
