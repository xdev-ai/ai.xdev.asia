"use client";

/* Governance Blueprint role guide: an asymmetric dossier with command evidence, not a generic tutorial. */
import { ArrowRight, CheckCircle2, ClipboardCheck, Code2, ShieldCheck, TerminalSquare } from "lucide-react";
import { useState } from "react";
import { PortalShell, type Locale } from "@/components/PortalShell";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";

type RoleKey = "developer" | "reviewer" | "release";
type RoleGuide = { label: string; title: string; lead: string; outcome: string; steps: readonly { step: string; title: string; text: string; command?: string }[]; signal: string };
type Copy = { eyebrow: string; title: string; lead: string; prerequisites: string; prerequisiteText: string; roleLabel: string; roles: Record<RoleKey, RoleGuide>; boundary: string; boundaryText: string };

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "03 / ROLE QUICKSTARTS / VERIFIED COMMAND PATHS",
    title: "Start from your delivery responsibility—not a tool menu.",
    lead: "Each route preserves the same boundary: policy is declared as data, validation is deterministic, and release decisions retain evidence.",
    prerequisites: "LOCAL BASELINE", prerequisiteText: "Use Rust 1.92 for native validator work. The validator CLI, policy packs, and platform application have deliberately separate repository boundaries.",
    roleLabel: "SELECT A DELIVERY ROLE",
    roles: {
      developer: { label: "ENGINEERING", title: "Build a valid project record before implementation expands.", lead: "Use this route when you own the specification shape, local validation loop, and the first remediation cycle.", outcome: "Exit 0 means no findings; 1 means findings require remediation; 2 means execution or configuration failed.", signal: "EXPECTED SIGNAL / DETERMINISTIC FINDINGS", steps: [
        { step: "01", title: "Clone and set the native baseline", text: "Fetch the standalone validator source and set the Rust toolchain declared by its command contract.", command: "git clone https://github.com/xdev-ai/aisdlc-cli.git\ncd aisdlc-cli\nrustup default 1.92" },
        { step: "02", title: "Build the validator", text: "Compile the CLI before pointing it at a project record.", command: "cargo build --release -p aisdlc" },
        { step: "03", title: "Run the control loop", text: "Validate the project root and inspect structured output when another system needs the findings.", command: "./target/release/aisdlc validate --root examples/my-project --format text\n./target/release/aisdlc validate --root examples/my-project --format json" },
      ] },
      reviewer: { label: "QA / REVIEW", title: "Read evidence as a decision record, not a pass/fail ornament.", lead: "Use this route when you need a reviewable findings file, a source-linked rule contract, and a controlled exception decision.", outcome: "A finding points back to a pack, check kind, severity, and remediation route. Do not bypass unresolved errors silently.", signal: "EXPECTED SIGNAL / SOURCE-LINKED REVIEW RECORD", steps: [
        { step: "01", title: "Generate portable findings", text: "Keep the machine-readable output attached to the review context.", command: "aisdlc validate --root . --format json --output findings.json" },
        { step: "02", title: "Render the saved record", text: "Re-render saved findings for the reader or review system that consumes them.", command: "aisdlc report --input findings.json --format text" },
        { step: "03", title: "Inspect the policy source", text: "Use the Registry to verify severity, rule arguments, evidence expectations, and exception ownership before making a release recommendation." },
      ] },
      release: { label: "PLATFORM / RELEASE", title: "Gate the release with declared context, launch, and campaign constraints.", lead: "Use this route when you own the delivery baseline, shared context readiness, and accountable release evidence.", outcome: "The orchestration and campaign checks are deterministic and offline; they never call AI or a remote server.", signal: "EXPECTED SIGNAL / RELEASE READINESS ATTESTATION", steps: [
        { step: "01", title: "Validate the governed context", text: "Check the Context Manifest before creating a shared bundle or launching a controlled plan.", command: "aisdlc context validate --manifest .aisdlc/context-manifest.yaml --format junit" },
        { step: "02", title: "Lint the agent launch contract", text: "Verify the command retains a pinned model and does not use the prohibited bare flag.", command: "aisdlc agent lint --argv \"claude -p review --model claude-sonnet-4.5\"" },
        { step: "03", title: "Check the campaign manifest", text: "Verify pinned models, isolated worktrees, capability declarations, and credential exclusion before a multi-agent campaign begins.", command: "aisdlc campaign check --manifest campaign-manifest.json --format json" },
      ] },
    },
    boundary: "CONTROL BOUNDARY", boundaryText: "Do not commit .env files, API keys, tokens, or generated access artifacts. A policy exception needs a named owner, rationale, approver, scope, and expiry.",
  },
  vi: {
    eyebrow: "03 / QUICKSTART THEO VAI TRÒ / COMMAND PATH ĐÃ KIỂM",
    title: "Bắt đầu từ trách nhiệm delivery—không phải từ menu công cụ.",
    lead: "Mỗi lộ trình giữ cùng một boundary: policy được khai báo như data, validation là deterministic và quyết định release phải giữ evidence.",
    prerequisites: "LOCAL BASELINE", prerequisiteText: "Dùng Rust 1.92 cho native validator. Validator CLI, policy pack và platform application có repository boundary tách biệt có chủ đích.",
    roleLabel: "CHỌN VAI TRÒ DELIVERY",
    roles: {
      developer: { label: "ENGINEERING", title: "Tạo project record hợp lệ trước khi implementation mở rộng.", lead: "Dùng lộ trình này khi bạn sở hữu specification shape, local validation loop và remediation cycle đầu tiên.", outcome: "Exit 0 nghĩa là không có finding; 1 nghĩa là finding cần remediation; 2 nghĩa là execution hoặc configuration lỗi.", signal: "TÍN HIỆU KỲ VỌNG / FINDING DETERMINISTIC", steps: [
        { step: "01", title: "Clone và đặt native baseline", text: "Lấy standalone validator source và đặt Rust toolchain theo command contract của nó.", command: "git clone https://github.com/xdev-ai/aisdlc-cli.git\ncd aisdlc-cli\nrustup default 1.92" },
        { step: "02", title: "Build validator", text: "Compile CLI trước khi trỏ nó vào project record.", command: "cargo build --release -p aisdlc" },
        { step: "03", title: "Chạy control loop", text: "Validate project root và đọc structured output khi hệ thống khác cần findings.", command: "./target/release/aisdlc validate --root examples/my-project --format text\n./target/release/aisdlc validate --root examples/my-project --format json" },
      ] },
      reviewer: { label: "QA / REVIEW", title: "Đọc evidence như decision record, không phải pass/fail ornament.", lead: "Dùng lộ trình này khi cần findings file có thể review, rule contract có link nguồn và exception decision có kiểm soát.", outcome: "Mỗi finding trỏ lại pack, check kind, severity và remediation route. Không bypass error chưa resolve trong im lặng.", signal: "TÍN HIỆU KỲ VỌNG / REVIEW RECORD CÓ LINK NGUỒN", steps: [
        { step: "01", title: "Tạo findings portable", text: "Giữ machine-readable output kèm review context.", command: "aisdlc validate --root . --format json --output findings.json" },
        { step: "02", title: "Render record đã lưu", text: "Render lại findings đã lưu cho người đọc hoặc review system tiêu thụ chúng.", command: "aisdlc report --input findings.json --format text" },
        { step: "03", title: "Kiểm tra policy source", text: "Dùng Registry để kiểm severity, rule arguments, evidence expectation và exception ownership trước khi đề xuất release." },
      ] },
      release: { label: "PLATFORM / RELEASE", title: "Gate release bằng context, launch và campaign constraint đã khai báo.", lead: "Dùng lộ trình này khi bạn sở hữu delivery baseline, shared context readiness và release evidence có trách nhiệm.", outcome: "Orchestration và campaign check là deterministic, offline; chúng không gọi AI hay remote server.", signal: "TÍN HIỆU KỲ VỌNG / RELEASE READINESS ATTESTATION", steps: [
        { step: "01", title: "Validate governed context", text: "Kiểm Context Manifest trước khi tạo shared bundle hoặc khởi tạo controlled plan.", command: "aisdlc context validate --manifest .aisdlc/context-manifest.yaml --format junit" },
        { step: "02", title: "Lint agent launch contract", text: "Xác minh command vẫn giữ model pin và không dùng bare flag bị cấm.", command: "aisdlc agent lint --argv \"claude -p review --model claude-sonnet-4.5\"" },
        { step: "03", title: "Check campaign manifest", text: "Kiểm model pin, worktree cô lập, capability declaration và credential exclusion trước multi-agent campaign.", command: "aisdlc campaign check --manifest campaign-manifest.json --format json" },
      ] },
    },
    boundary: "CONTROL BOUNDARY", boundaryText: "Không commit .env, API key, token hoặc access artifact được sinh. Policy exception cần owner, rationale, approver, scope và expiry rõ ràng.",
  },
};

export default function Quickstart() { return <PortalShell route="quickstart">{(locale) => <QuickstartContent locale={locale} />}</PortalShell>; }
function QuickstartContent({ locale }: { locale: Locale }) {
  const t = copy[locale as "en" | "vi"]; const [active, setActive] = useState<RoleKey>("developer"); const guide = t.roles[active];
  const icons = { developer: Code2, reviewer: ClipboardCheck, release: ShieldCheck };
  return <div className="handbook-page"><section className="handbook-hero"><span className="handbook-grid" aria-hidden="true" /><div><div className="eyebrow"><i className="pulse-line" /> {t.eyebrow}</div><h1>{t.title}</h1><p>{t.lead}</p></div><aside className="quickstart-proof"><ShieldTraceMark decorative /><code>{t.prerequisites}</code><p>{t.prerequisiteText}</p><div aria-label={locale === "en" ? "Validated command path" : "Command path đã kiểm"}><span>SPEC</span><i /><span>RULE</span><i /><span>FINDING</span><i /><span>RECORD</span></div><TerminalSquare size={19} /></aside></section><section className="role-selector" aria-label={t.roleLabel}><span className="mono-label">{t.roleLabel}</span><div>{(Object.keys(t.roles) as RoleKey[]).map((key) => { const Icon = icons[key]; return <button key={key} className={active === key ? "is-active" : ""} onClick={() => setActive(key)} aria-pressed={active === key}><Icon size={17} /><span>{t.roles[key].label}</span><ArrowRight size={15} /></button>; })}</div></section><div className="route-dossier-band"><span>03</span><i /><strong>{locale === "en" ? "ROLE PATH / COMMAND → EVIDENCE" : "ĐƯỜNG VAI TRÒ / COMMAND → EVIDENCE"}</strong><ShieldTraceMark decorative /><code><b className="verify-dot" /> VERIFIED PATH</code></div><section className="role-dossier"><header><code>ROLE / {guide.label}</code><h2>{guide.title}</h2><p>{guide.lead}</p><strong><CheckCircle2 size={16} /> {guide.outcome}</strong></header><div className="role-steps">{guide.steps.map((item) => <article key={item.step}><span>{item.step}</span><div><h3>{item.title}</h3><p>{item.text}</p>{item.command && <pre><code>{item.command}</code></pre>}</div></article>)}</div><footer><span className="verify-dot" /><code>{guide.signal}</code><a href="/policies">{locale === "en" ? "Inspect current controls" : "Kiểm tra control hiện tại"} <ArrowRight size={15} /></a></footer></section><section className="control-boundary"><ShieldCheck size={20} /><div><span className="mono-label">{t.boundary}</span><p>{t.boundaryText}</p></div></section></div>;
}
