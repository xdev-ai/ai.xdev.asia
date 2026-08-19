"use client";

/* Governance Blueprint release ledger: version promises, compatibility, and source-derived registry state.
   Style contract: a continuous ivory dossier with navy control bands; cyan marks trace signals, amber marks witnessed state. */
import { ArrowUpRight, CheckCircle2, FileClock, GitCommitHorizontal, Link2, Linkedin, Mail, Puzzle, Search, ShieldCheck, SlidersHorizontal, Twitter, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackReleaseClick, trackShare } from "@/lib/shareAnalytics";
import { PortalShell, type Locale } from "@/components/PortalShell";
import { policyPacks } from "@/data/policyPacks";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { Breadcrumb } from "@/components/Breadcrumb";

type Cell = { en: string; vi: string };
type Version = "v0.1.0" | "v1.0.0";
type State = "verified" | "compatible";
type Lookup = { query: string; version: "all" | Version; state: "all" | State };
type LedgerRecord = { id: string; mark: string; version: Version; state: State; title: Cell; text: Cell; proof: Cell };
type MatrixRecord = { id: string; version: Version; state: State; surface: Cell; baseline: Cell; compatibility: Cell; verify: Cell };

const t = (locale: Locale, value: Cell) => value[locale as "en" | "vi"];

type Network = "x" | "linkedin" | "email";
type LookupPreset = "none" | "latest" | "breaking";
const buildShareUrl = (base: string, lookup: Lookup, anchor?: string): string => {
  const url = new URL(base);
  if (!url.pathname || url.pathname === "/") url.pathname = "/releases";
  if (lookup.query.trim()) url.searchParams.set("q", lookup.query.trim());
  if (lookup.version !== "all") url.searchParams.set("version", lookup.version);
  if (lookup.state !== "all") url.searchParams.set("state", lookup.state);
  if (anchor !== undefined) url.hash = anchor;
  return url.toString();
};
const shareUrl = (lookup: Lookup, anchor?: string) => buildShareUrl(typeof window !== "undefined" ? window.location.origin : "https://ai.xdev.asia", lookup, anchor);
const shareTargetUrl = (network: Network, lookup: Lookup, anchor?: string): string => {
  const title = encodeURIComponent("AI-SDLC release ledger — governed AI delivery");
  if (network === "email") {
    const url = shareUrl(lookup, anchor);
    return `mailto:?subject=${title}&body=${encodeURIComponent(url)}`;
  }
  const url = encodeURIComponent(shareUrl(lookup, anchor));
  return network === "x" ? `https://x.com/intent/post?text=${title}&url=${url}` : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
};
const shareText = (network: Network, lookup: Lookup, locale: Locale): string => {
  const presetLabel = lookup.state === "compatible" ? (locale === "vi" ? " thay đổi tương thích" : " compatible changes") : locale === "vi" ? " phát hành mới nhất" : " latest release";
  const recordLabel = network === "email" ? (locale === "vi" ? " gửi qua email" : " via email") : network === "x" ? " trên X" : " trên LinkedIn";
  return `${locale === "vi" ? "Chia sẻ" : "Share"}${presetLabel}${recordLabel}`;
};
const applyPreset = (preset: LookupPreset, setQuery: (value: string) => void, setVersion: (value: "all" | Version) => void, setState: (value: "all" | State) => void) => {
  setQuery("");
  setVersion("all");
  setState(preset === "breaking" ? "compatible" : "all");
};
const isVersion = (value: string | null): value is Version => value === "v0.1.0" || value === "v1.0.0";
const isState = (value: string | null): value is State => value === "verified" || value === "compatible";
const presetFromUrl = (): LookupPreset => {
  if (typeof window === "undefined") return "none";
  const urlPreset = new URLSearchParams(window.location.search).get("preset");
  return urlPreset === "latest" || urlPreset === "breaking" ? urlPreset : "none";
};
const lookupFromUrl = (): Lookup => {
  if (typeof window === "undefined") return { query: "", version: "all", state: "all" };
  const params = new URLSearchParams(window.location.search);
  const urlVersion = params.get("version");
  const urlState = params.get("state");
  const preset = presetFromUrl();
  if (preset === "breaking") return { query: "", version: "all", state: "compatible" };
  return { query: params.get("q") ?? "", version: isVersion(urlVersion) ? urlVersion : "all", state: isState(urlState) ? urlState : "all" };
};
const ledger: LedgerRecord[] = [
  { id: "release-validator-v0-1-0", mark: "01", version: "v0.1.0", state: "verified", title: { en: "Validator baseline / v0.1.0", vi: "Validator baseline / v0.1.0" }, text: { en: "The standalone CLI baseline exposes validation, report rendering, Kit status, context, launch, orchestration, and campaign checks.", vi: "Standalone CLI baseline hiện tại có validation, report rendering, Kit status, context, launch, orchestration và campaign check." }, proof: { en: "Source: xdev-ai/aisdlc-cli / cli/Cargo.toml", vi: "Nguồn: xdev-ai/aisdlc-cli / cli/Cargo.toml" } },
  { id: "release-rule-packs-v1-0-0", mark: "02", version: "v1.0.0", state: "compatible", title: { en: "Rule-pack baseline / v1.0.0", vi: "Rule-pack baseline / v1.0.0" }, text: { en: "The active YAML packs declare agent launch, specification structure, and traceability controls as versioned data.", vi: "Các YAML pack active khai báo control cho agent launch, specification structure và traceability như versioned data." }, proof: { en: "Source: AI-SDLC Policy Packs", vi: "Nguồn: AI-SDLC Policy Packs" } },
  { id: "release-registry-sync-v1-0-0", mark: "03", version: "v1.0.0", state: "verified", title: { en: "Registry sync contract", vi: "Registry sync contract" }, text: { en: "A dedicated policy-source workflow derives the portal snapshot only when policy YAML changes, then validates the portal before publishing it.", vi: "Workflow tại policy-source chuyên biệt chỉ derive portal snapshot khi policy YAML đổi, sau đó validate portal trước khi publish." }, proof: { en: "Evidence: generated snapshot + CI build", vi: "Bằng chứng: generated snapshot + CI build" } },
];
const matrix: MatrixRecord[] = [
  { id: "compatibility-rule-packs-v1-0-0", version: "v1.0.0", state: "compatible", surface: { en: "Rule packs", vi: "Rule pack" }, baseline: { en: "YAML v1.0.0", vi: "YAML v1.0.0" }, compatibility: { en: "Every declared check must map to the validator's closed check-kind set.", vi: "Mọi check khai báo phải map vào closed check-kind set của validator." }, verify: { en: "aisdlc validate", vi: "aisdlc validate" } },
  { id: "compatibility-spec-kit-v1-0-0", version: "v1.0.0", state: "compatible", surface: { en: "Spec Kit manifest", vi: "Spec Kit manifest" }, baseline: { en: "Version + digest + release metadata", vi: "Version + digest + release metadata" }, compatibility: { en: "Exact and caret pins resolve against published versions; an offline cache remains inspectable.", vi: "Exact và caret pin resolve theo published version; offline cache vẫn có thể kiểm tra." }, verify: { en: "aisdlc kit", vi: "aisdlc kit" } },
  { id: "compatibility-validator-cli-v0-1-0", version: "v0.1.0", state: "verified", surface: { en: "Validator CLI", vi: "Validator CLI" }, baseline: { en: "Rust / aisdlc v0.1.0", vi: "Rust / aisdlc v0.1.0" }, compatibility: { en: "Interprets declared YAML data; a new check kind is an engine change, never a silent no-op.", vi: "Diễn giải YAML data đã khai báo; check kind mới là thay đổi engine, không phải silent no-op." }, verify: { en: "cargo test --workspace", vi: "cargo test --workspace" } },
  { id: "compatibility-public-registry-v1-0-0", version: "v1.0.0", state: "verified", surface: { en: "Public Registry", vi: "Public Registry" }, baseline: { en: "Source-revision snapshot", vi: "Snapshot theo source revision" }, compatibility: { en: "Renders only the exact synchronized policy facts plus reviewed bilingual guidance.", vi: "Chỉ render policy fact đã đồng bộ chính xác cùng bilingual guidance đã review." }, verify: { en: "pnpm check && pnpm build", vi: "pnpm check && pnpm build" } },
];
const inLocale = (locale: Locale, ...values: Array<Cell | string>) => values.map((value) => typeof value === "string" ? value : value[locale as "en" | "vi"]).join(" ").toLocaleLowerCase();
async function copyUrl(url: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(url);
  const field = document.createElement("textarea");
  field.value = url; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0";
  document.body.appendChild(field); field.select(); document.execCommand("copy"); document.body.removeChild(field);
}

export default function Releases() { return <PortalShell route="releases">{(locale) => <ReleaseContent locale={locale} />}</PortalShell>; }
function ReleaseContent({ locale }: { locale: Locale }) {
  const initialLookup = useRef(lookupFromUrl()).current;

  // Per-page SEO head for the Releases page (SPA runtime). Google's rendering
  // pipeline executes JavaScript, so the JS-rendered title, description, and
  // canonical are what get indexed for /releases and its ?state query variants.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const title = locale === "en"
      ? "Releases — AI-SDLC release ledger & compatibility matrix | xDev AI"
      : "Bản phát hành — Sổ cái release & ma trận tương thích AI-SDLC | xDev AI";
    const description = locale === "en"
      ? "Versioned release ledger for the AI-SDLC platform: validator, rule packs, registry sync, and a compatibility matrix you can inspect and share per record."
      : "Sổ cái release có version của nền tảng AI-SDLC: validator, rule pack, registry sync và ma trận tương thích — kiểm tra và chia sẻ từng record.";
    const url = `https://ai.xdev.asia/releases${window.location.search || ""}`;
    document.title = title;
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);
    const canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? (() => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      document.head.appendChild(el);
      return el;
    })();
    canon.setAttribute("href", url);
    const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (og) og.setAttribute("content", title);
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);
  }, [locale as "en" | "vi"]);
  const [query, setQuery] = useState(initialLookup.query);
  const [version, setVersion] = useState<"all" | Version>(initialLookup.version);
  const [state, setState] = useState<"all" | State>(initialLookup.state);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);
  const restoredAnchor = useRef(false);
  const initialPreset = useRef(presetFromUrl()).current;
  const appliedPreset = useRef(false);
  const lookup = { query, version, state };
  const copy = locale === "en" ? {
    searchLabel: "Search release records", searchPlaceholder: "Search versions, surfaces, commands, or evidence", version: "Version", state: "Compatibility state", allVersions: "All versions", allStates: "All states", verified: "Verified", compatible: "Compatible", showing: "records shown", clear: "Clear lookup", noResults: "No release record matches this lookup.", noResultsLead: "Clear a filter or try a different version, command, control, or evidence term.", changeLog: "CHANGE LOG", current: "Current public baseline", matrix: "COMPATIBILITY MATRIX", matrixTitle: "Test the contract at every boundary.", provenance: "REGISTRY PROVENANCE", provenanceText: "Each policy record is derived from the source YAML, while bilingual intent and remediation remain reviewed guidance. The source revision is recorded at synchronization time, not inferred in the portal.", openRegistry: "Open Policy Registry", ledger: "05 / RELEASE RECORD / COMPATIBILITY", band: "RELEASE LEDGER / SOURCE → PUBLISHED RECORD", hero: "Change is safe only when the compatibility promise is visible.", heroLead: "This ledger separates the validator engine, versioned Kit data, and the public Registry snapshot so readers can inspect what changed and what remains compatible.", surface: "Surface", baseline: "Baseline", contract: "Compatibility contract", verification: "Verification", copyLookup: "Copy lookup link", copyRecord: "Copy record link", copied: "Copied", latestPreset: "Latest release", breakingPreset: "Breaking changes only", shareVia: "Share via", shareX: "Share on X", shareLinkedIn: "Share on LinkedIn", shareEmail: "Share via email", recordLink: "Open record",
  } : {
    searchLabel: "Tìm kiếm hồ sơ phát hành", searchPlaceholder: "Tìm phiên bản, phạm vi, lệnh hoặc bằng chứng", version: "Phiên bản", state: "Trạng thái tương thích", allVersions: "Tất cả phiên bản", allStates: "Tất cả trạng thái", verified: "Đã xác thực", compatible: "Tương thích", showing: "hồ sơ hiển thị", clear: "Xóa điều kiện tra cứu", noResults: "Không có hồ sơ phát hành phù hợp.", noResultsLead: "Hãy xóa bộ lọc hoặc thử phiên bản, lệnh, control hay thuật ngữ bằng chứng khác.", changeLog: "CHANGE LOG", current: "Public baseline hiện tại", matrix: "MA TRẬN TƯƠNG THÍCH", matrixTitle: "Test contract tại mỗi boundary.", provenance: "NGUỒN GỐC REGISTRY", provenanceText: "Mỗi policy record được derive từ source YAML, còn intent và remediation song ngữ vẫn là guidance đã review. Source revision được record tại thời điểm đồng bộ, không suy diễn trong portal.", openRegistry: "Mở Kho chính sách", ledger: "05 / HỒ SƠ RELEASE / TƯƠNG THÍCH", band: "SỔ CÁI RELEASE / SOURCE → HỒ SƠ ĐÃ PUBLISH", hero: "Thay đổi chỉ an toàn khi compatibility promise có thể nhìn thấy.", heroLead: "Sổ cái này tách validator engine, Kit data có version và Registry snapshot công khai để người đọc kiểm tra phần thay đổi và phần còn tương thích.", surface: "Bề mặt", baseline: "Baseline", contract: "Compatibility contract", verification: "Xác minh", copyLookup: "Sao chép link kết quả", copyRecord: "Sao chép link hồ sơ", copied: "Đã sao chép", latestPreset: "Bản phát hành mới nhất", breakingPreset: "Chỉ thay đổi breaking", shareVia: "Chia sẻ qua", shareX: "Chia sẻ trên X", shareLinkedIn: "Chia sẻ trên LinkedIn", shareEmail: "Chia sẻ qua email", recordLink: "Mở hồ sơ",
  };
  useEffect(() => {
    if (typeof window === "undefined" || appliedPreset.current || initialPreset === "none") return;
    appliedPreset.current = true;
    applyPreset(initialPreset, setQuery, setVersion, setState);
  }, [initialPreset]);
  const activeLookup = query.trim().length > 0 || version !== "all" || state !== "all";
  const matches = <T extends { version: Version; state: State }>(record: T, corpus: string) => (version === "all" || record.version === version) && (state === "all" || record.state === state) && (!query.trim() || corpus.includes(query.trim().toLocaleLowerCase()));
  const visibleLedger = useMemo(() => ledger.filter((record) => matches(record, inLocale(locale, record.version, record.state, record.title, record.text, record.proof))), [locale, query, state, version]);
  const visibleMatrix = useMemo(() => matrix.filter((record) => matches(record, inLocale(locale, record.version, record.state, record.surface, record.baseline, record.compatibility, record.verify))), [locale, query, state, version]);
  const totalVisible = visibleLedger.length + visibleMatrix.length;
  useEffect(() => { if (typeof window !== "undefined" && activeLookup) window.history.replaceState(null, "", shareUrl(lookup)); }, [query, state, version]);
  useEffect(() => {
    if (typeof window === "undefined" || restoredAnchor.current || !window.location.hash) return;
    const targetId = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => { document.getElementById(targetId)?.scrollIntoView({ block: "center" }); restoredAnchor.current = true; });
    return () => window.cancelAnimationFrame(frame);
  }, [visibleLedger.length, visibleMatrix.length]);
  const reset = () => { setQuery(""); setVersion("all"); setState("all"); };
  const copyShare = async (target: string, anchor?: string) => { await copyUrl(shareUrl(lookup, anchor)); setCopiedTarget(target); trackShare("lookup", null, "copy"); window.setTimeout(() => setCopiedTarget((current) => current === target ? null : current), 1800); };
  const copyText = (target: string) => copiedTarget === target ? copy.copied : copy.copyRecord;
  const networkButtons = (target: string, anchor?: string) => (
    <span className="release-network-buttons" data-networks>
      <span className="mono-label" aria-hidden>{copy.shareVia}</span>
      <a className="release-network-button" href={shareTargetUrl("x", lookup, anchor)} target="_blank" rel="noopener noreferrer" aria-label={copy.shareX} onClick={() => trackShare("record", target, "x")}><Twitter size={13} /></a>
      <a className="release-network-button" href={shareTargetUrl("linkedin", lookup, anchor)} target="_blank" rel="noopener noreferrer" aria-label={copy.shareLinkedIn} onClick={() => trackShare("record", target, "linkedin")}><Linkedin size={13} /></a>
      <a className="release-network-button" href={shareTargetUrl("email", lookup, anchor)} aria-label={copy.shareEmail} onClick={() => trackShare("record", target, "email")}><Mail size={13} /></a>
    </span>
  );

  return <div className="release-page">
        <Breadcrumb page="releases" />
    <section className="release-hero"><div><div className="eyebrow"><span className="pulse-line" /> {copy.ledger}</div><h1>{copy.hero}</h1><p>{copy.heroLead}</p></div><aside className="release-proof"><ShieldTraceMark decorative /><code>OPEN CHANGE RECORD</code><div><span>YAML</span><i /><span>SNAPSHOT</span><i /><span>BUILD</span><i /><span>PAGES</span></div><strong>{policyPacks.length} {locale === "en" ? "ACTIVE POLICY PACKS" : "POLICY PACK ACTIVE"}</strong><span><b className="verify-dot" /> {policyPacks.reduce((count, pack) => count + pack.rules.length, 0)} {locale === "en" ? "DECLARED RULES" : "RULE ĐÃ KHAI BÁO"}</span><GitCommitHorizontal size={19} /></aside></section>
    <div className="route-dossier-band"><span>05</span><i /><strong>{copy.band}</strong><ShieldTraceMark decorative /><code><b className="verify-dot" /> VERIFIED BUILD</code></div>
    <section className="reveal release-lookup" reveal-d100 aria-label={copy.searchLabel}><div className="release-lookup-head"><div><span className="mono-label"><SlidersHorizontal size={14} /> {locale === "en" ? "RELEASE LOOKUP" : "TRA CỨU RELEASE"}</span><div className="release-preset-buttons" data-presets><a className={"release-preset-button" + (state === "all" && !query.trim() && version === "all" && initialPreset === "latest" ? " active" : "")} href="/releases?preset=latest" onClick={(event) => { event.preventDefault(); applyPreset("latest", setQuery, setVersion, setState); trackShare("lookup", null, "latest"); }}><span aria-hidden>{locale === "en" ? "LATEST" : "MỚI NHẤT"}</span><span>{copy.latestPreset}</span></a><a className="release-preset-button" href="/releases?preset=breaking" onClick={(event) => { event.preventDefault(); applyPreset("breaking", setQuery, setVersion, setState); trackShare("lookup", null, "breaking"); }}><span aria-hidden>{locale === "en" ? "BREAKING" : "BREAKING"}</span><span>{copy.breakingPreset}</span></a></div><p>{totalVisible} / {ledger.length + matrix.length} {copy.showing}</p></div><div className="release-lookup-actions">{activeLookup && <button type="button" className="release-clear" onClick={reset}><X size={14} /> {copy.clear}</button>}{networkButtons("lookup")}<button type="button" className="release-share" onClick={() => copyShare("lookup")}><Link2 size={14} /> {copiedTarget === "lookup" ? copy.copied : copy.copyLookup}</button></div></div><div className="release-lookup-controls"><label className="release-search-field"><span>{copy.searchLabel}</span><div><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} type="search" /></div></label><label><span>{copy.version}</span><select value={version} onChange={(event) => setVersion(event.target.value as "all" | Version)}><option value="all">{copy.allVersions}</option><option value="v0.1.0">v0.1.0</option><option value="v1.0.0">v1.0.0</option></select></label><label><span>{copy.state}</span><select value={state} onChange={(event) => setState(event.target.value as "all" | State)}><option value="all">{copy.allStates}</option><option value="verified">{copy.verified}</option><option value="compatible">{copy.compatible}</option></select></label></div></section>
    {totalVisible === 0 ? <section className="release-empty"><ShieldCheck size={22} /><span className="mono-label">NO MATCH / 0</span><h2>{copy.noResults}</h2><p>{copy.noResultsLead}</p><button type="button" className="underlined-button" onClick={reset}>{copy.clear} <ArrowUpRight size={15} /></button></section> : <>
      {visibleLedger.length > 0 && <section className="reveal release-ledger" reveal-d100><div className="release-section-head"><FileClock size={18} /><div><span className="mono-label">{copy.changeLog}</span><h2>{copy.current}</h2></div></div>{visibleLedger.map((entry) => <article id={entry.id} className="release-record" key={entry.id}><span>{entry.mark}</span><div><div className="release-record-meta"><code>{entry.version}</code><em data-state={entry.state}>{entry.state === "verified" ? copy.verified : copy.compatible}</em></div><h3>{t(locale, entry.title)}</h3><p>{t(locale, entry.text)}</p></div><div className="release-evidence"><code>{t(locale, entry.proof)}</code><span className="release-record-share-group"><button type="button" className="release-record-share" onClick={() => copyShare(entry.id, entry.id)} aria-label={copy.copyRecord + ": " + t(locale, entry.title)}><Link2 size={13} /><span>{copyText(entry.id)}</span></button>{networkButtons(entry.id, entry.id)}</span></div></article>)}</section>}
      {visibleMatrix.length > 0 && <section className="reveal compatibility-sheet" reveal-d100><div className="release-section-head"><Puzzle size={18} /><div><span className="mono-label">{copy.matrix}</span><h2>{copy.matrixTitle}</h2></div></div><div className="compatibility-table" role="table" aria-label={copy.matrix}><div className="compatibility-row compatibility-head" role="row"><span>{copy.surface}</span><span>{copy.baseline}</span><span>{copy.contract}</span><span>{copy.verification}</span></div>{visibleMatrix.map((row) => <div id={row.id} className="compatibility-row compatibility-record" role="row" key={row.id}><strong>{t(locale, row.surface)}</strong><code>{t(locale, row.baseline)}</code><p>{t(locale, row.compatibility)}</p><div className="matrix-verify"><em data-state={row.state}>{row.state === "verified" ? copy.verified : copy.compatible}</em><code>{t(locale, row.verify)}</code><span className="release-record-share-group"><button type="button" className="release-record-share" onClick={() => copyShare(row.id, row.id)} aria-label={copy.copyRecord + ": " + t(locale, row.surface)}><Link2 size={13} /><span>{copyText(row.id)}</span></button>{networkButtons(row.id, row.id)}</span></div></div>)}</div></section>}
    </>}
    <section className="reveal registry-provenance" reveal-d100><ShieldCheck size={20} /><div><span className="mono-label">{copy.provenance}</span><p>{copy.provenanceText}</p></div><a href="/policies">{copy.openRegistry} <ArrowUpRight size={15} /></a></section>
  </div>;
}
