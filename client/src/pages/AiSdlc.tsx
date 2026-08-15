/* Product sheet /ai-sdlc: the AI-SDLC product page of the xDev AI umbrella.
   Content is a governed re-expose of the AI-SDLC baseline (Home layout) with
   umbrella-aware framing: xDev AI brand on top, product path /AI-SDLC, sibling links. */
import { ArrowUpRight, BookOpen, Box, ChevronRight, Code2, Copy, ExternalLink, FolderTree, Layers3, Menu, Network, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Pipeline3D } from "@/components/Pipeline3D";

const navItems = [
  ["01", "Platform", "platform"],
  ["02", "Spec Kit", "tree"],
  ["03", "Contract", "contract"],
  ["04", "Rule packs", "rules"],
  ["05", "Evidence", "resolution"],
  ["06", "Open record", "record"],
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

const placeholders = [
  ["constitution/", "Các nguyên tắc bất biến làm nền cho policy packs."],
  ["commands/", "Command definitions; bề mặt mà AGENT-LAUNCH lint."],
  ["domains/", "Domain packs bổ sung luật cho từng lĩnh vực nghiệp vụ."],
  ["profiles/", "Profile khởi chạy agent theo vai trò / tình huống."],
  ["standards/", "Security và testing standards có version độc lập."],
  ["templates/", "Mẫu Markdown chuẩn cho các artifact type."],
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

  return (
    <div className="product-sheet">
      <aside className={`ps-rail ${open ? "is-open" : ""}`} aria-label="AI-SDLC điều hướng">
        <div className="ps-topline"><span /> <span>AI.XDEV.ASIA / AI-SDLC</span></div>
        <a className="brand-lockup" href="#platform" onClick={() => goTo("platform")}>
          <ShieldTraceMark className="rail-mark" />
          <span><strong>AI-SDLC</strong><em>a product of xDev AI</em></span>
        </a>
        <div className="rail-file"><span>PATH</span><code>/AI-SDLC</code><span>STATUS</span><strong>PUBLIC / v1.0</strong></div>
        <div className="rail-summary">
          <span className="mono-label">{t.product.scopeLabel}</span>
          <p>{t.aiSdlc.railScope}</p>
        </div>
        <nav className="section-nav">
                      {navItems.map(([number, , id], index) => (
              <button key={id} className={activeSection === id ? "is-active" : ""} onClick={() => goTo(id)}>
                <span>{number}</span><span>{navLabels[index]}</span><ChevronRight size={14} />
            </button>
          ))}
        </nav>
        <div className="ps-sibling-links">
          <a href="/"><span>00</span>{t.product.siblingHome} <ArrowUpRight size={13} /></a>
          <a href="/trace-ledger"><span>02</span>{t.nav.traceLedger} <ArrowUpRight size={13} /></a>
        </div>
        <div className="rail-bottom">
          <span className="verify-dot" />
          <span>{t.product.verified}<br /><strong>AI.XDEV.ASIA / AI-SDLC</strong></span>
        </div>
      </aside>

      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Mở điều hướng" aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={21} />}
      </button>

      <main>
        <section className="ps-hero" id="platform">
          <div className="ps-hero-grid" aria-hidden="true" />
          <div className="ps-hero-content">
            <div className="eyebrow"><span className="pulse-line" /> {t.aiSdlc.heroEyebrow}</div>
            <h1>
              {t.aiSdlc.heroTitle1}<br /><i>{t.aiSdlc.heroTitle2}</i>
            </h1>
            <p className="ps-copy">{t.aiSdlc.heroCopy}</p>
            <div className="hero-actions">
              <a className="ink-button" href="https://github.com/xdev-ai/ai-sdlc" target="_blank" rel="noreferrer">
                {t.product.openRepo} <ArrowUpRight size={16} />
              </a>
              <button className="text-button" onClick={() => goTo("tree")}>
                Đi vào Spec Kit <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="ps-hero-meta">
            <div><span>{t.aiSdlc.heroMeta1S}</span><strong>{t.aiSdlc.heroMeta1V}</strong></div>
            <div><span>{t.aiSdlc.heroMeta2S}</span><strong>{t.aiSdlc.heroMeta2V}</strong></div>
            <div><span>{t.aiSdlc.heroMeta3S}</span><strong>{t.aiSdlc.heroMeta3V}</strong></div>
          </div>
          <ShieldTraceMark className="hero-witness" decorative />
          <div className="lang-switch"><LanguageSwitch /></div>
        </section>

        <section className="platform-section">
          <div className="platform-heading">
            <div className="section-marker"><span>01</span><span>{t.aiSdlc.s01Label}</span></div>
            <h2>{t.aiSdlc.s01Title1}<br /><i>{t.aiSdlc.s01Title2}</i></h2>
            <p>{t.aiSdlc.s01Copy}</p>
          </div>
          <Pipeline3D />
          <div className="lifecycle-grid">
            {["lc1", "lc2", "lc3", "lc4", "lc5"].map((key, index) => { const lc = t.aiSdlc[key as keyof typeof t.aiSdlc] as string[]; return { number: String(index + 1).padStart(2, "0"), name: lc[0], copy: lc[1], gate: index === 2, last: index === 4 }; }).map(({ number, name, copy, gate, last }) => (
              <article key={name} className={gate ? "is-gate" : ""}>
                <span>{number}</span>
                <strong>{name}</strong>
                <p>{copy}</p>
                {!last && <ChevronRight className="lifecycle-arrow" size={17} aria-hidden="true" />}
              </article>
            ))}
          </div>
          <div className="platform-surfaces">
            {["sf0", "sf1", "sf2", "sf3"].map((key, index) => { const sf = t.aiSdlc[key as keyof typeof t.aiSdlc] as string[]; return { number: String(index).padStart(2, "0"), label: sf[0], title: sf[1], copy: sf[2], idx: index }; }).map(({ number, label, title, copy, idx }) => (
              <article key={label}>
                <span className="surface-index">0{idx + 1}</span>
                <div><span className="mono-label">{label}</span><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="intro-band">
          <div className="section-marker"><span>02</span><span>SPEC KIT IN THE PLATFORM</span></div>
          <div className="intro-grid">
            <div className="statement">
              <span className="mono-label">DESIGN DECISION / DD-03</span>
              <p><strong>Rust = engine.</strong> Tập check kinds hữu hạn, đóng. <strong>Spec Kit = luật.</strong> YAML và Markdown versioned, có thể mở rộng bằng Domain Pack.</p>
            </div>
            <div className="architecture-strip">
              <div><Code2 size={18} /><span>CLI / validator</span><em>parse · graph · validate</em></div>
              <div className="is-focus"><ShieldCheck size={18} /><span>Spec Kit</span><em>rules · standards · policies</em></div>
              <div><Network size={18} /><span>Control plane</span><em>evidence · registry · audit</em></div>
            </div>
          </div>
        </section>

        <section id="tree" className="section-block tree-section">
          <div className="section-heading">
            <div className="section-marker"><span>03</span><span>COMPONENT MAP</span></div>
            <h2>Một kit. <i>Ba tầng trách nhiệm.</i></h2>
            <p>Tất cả nội dung trong <code>spec-kit/</code> là data hoặc contract; không có code thực thi. Code xử lý nằm trong các Rust crates riêng biệt.</p>
          </div>
          <div className="tree-layout">
            <div className="tree-window">
              <div className="window-bar"><span><i /><i /><i /></span><code>repository / spec-kit</code><span className="window-state">10 ITEMS</span></div>
              <div className="tree-code">
                <p><FolderTree size={16} /> <b>spec-kit/</b></p>
                <p className="indent"><BookOpen size={15} /> constitution/<span>constitution.md</span></p>
                <p className="indent"><Code2 size={15} /> commands/<span>commands.md</span></p>
                <p className="indent"><Layers3 size={15} /> domains/<span>domains.md</span></p>
                <p className="indent"><Box size={15} /> profiles/<span>profiles.md</span></p>
                <p className="indent"><BookOpen size={15} /> standards/<span>standards.md</span></p>
                <p className="indent"><BookOpen size={15} /> templates/<span>templates.md</span></p>
                <p className="indent"><ShieldCheck size={15} /> validators/</p>
                <p className="indent deeper"><FileIcon /> check-kinds.md <em>ENGINE ↔ LAW CONTRACT</em></p>
                <p className="indent deeper"><FolderTree size={15} /> rules/</p>
                <p className="indent deepest"><FileIcon /> agent-launch.yml</p>
                <p className="indent deepest"><FileIcon /> spec-structure.yml</p>
                <p className="indent deepest"><FileIcon /> traceability.yml</p>
              </div>
            </div>
            <div className="tree-notes">
              <article><span className="note-index">A</span><h3>Contract</h3><p>Xác định engine hiểu được loại luật nào. Thay đổi phải đi cùng schema và validator.</p></article>
              <article><span className="note-index">B</span><h3>Luật thực thi</h3><p>Rule packs YAML được load lúc runtime. Publish policy mới không cần recompile.</p></article>
              <article><span className="note-index">C</span><h3>Chính sách tổ chức</h3><p>Standards, templates và profiles được version-pin qua Kit Registry.</p></article>
            </div>
          </div>
        </section>

        <section id="contract" className="contract-section">
          <div className="contract-heading">
            <div className="section-marker"><span>04</span><span>THE CENTRAL CONTRACT</span></div>
            <h2><code>check-kinds.md</code><br /><i>nơi engine và luật gặp nhau.</i></h2>
          </div>
          <div className="contract-copy">
            <p>Mọi check trong rule pack phải map đúng một trong 10 check kinds của contract. <strong>Unknown kind luôn là engine change</strong> — không thể trở thành silent no-op để tránh drift ngầm giữa luật và máy.</p>
            <blockquote>“Thêm rule không cần thay engine. Thêm check kind thì có.”</blockquote>
          </div>
          <div className="check-table">
            <div className="table-head"><span>#</span><span>CHECK KIND</span><span>CATEGORY</span><span>BEHAVIOR</span></div>
            {checkKinds.map(([n, kind, cat, behavior]) => (
              <div key={kind} className="check-row">
                <span className="pack-no">{n}</span>
                <code>{kind}</code>
                <span className="category-chip">{cat}</span>
                <span>{behavior}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="rules" className="rules-section">
          <div className="rules-heading">
            <div className="section-marker"><span>05</span><span>RUNTIME LAW</span></div>
            <h2>13 rules. <i>Không cần rebuild.</i></h2>
            <p>Ba YAML rule packs chuyển policy thành deterministic gate — chạy như nhau ở local workspace, CI và bề mặt review.</p>
          </div>
          <div className="pack-grid">
            {policyPacks.map((pack, i) => (
              <article key={pack.id} className={`policy-pack ${pack.tint}`}>
                <div className="pack-head">
                  <span className="pack-no">0{i + 1}</span>
                  <span className="pack-version">v1.0.0</span>
                </div>
                <h3>{pack.id}</h3>
                <code>{pack.file}</code>
                <p>{pack.summary}</p>
                <div className="pack-rules">
                  {pack.rules.map(([rule, severity, desc]) => (
                    <div key={rule as string} className="pack-rule">
                      <span className="severity">{severity}</span>
                      <span>{rule}</span>
                      <em>{desc}</em>
                    </div>
                  ))}
                </div>
                <div className="pack-type">{pack.type}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="resolution" className="resolution-section">
          <div className="resolution-heading">
            <div className="section-marker"><span>06</span><span>EVIDENCE RESOLUTION</span></div>
            <h2>Override ở gần.<br /><i>Governance ở xa.</i></h2>
          </div>
          <div className="resolution-grid">
            <div className="resolution-window">
              <div className="window-bar"><span><i /><i /><i /></span><code>locate_rules_dir(root)</code></div>
              <div className="flow-list">
                <div><span>01</span><code>.ai-sdlc/validators/rules</code><em>local override · priority</em></div>
                <div><span>02</span><code>spec-kit/validators/rules</code><em>bundled kit</em></div>
                <div><span>03</span><code>&lt;manifest&gt;/../spec-kit/rules</code><em>crate fallback</em></div>
              </div>
            </div>
            <div className="resolution-note">
              <span className="mono-label">DISTRIBUTION PATH</span>
              <div className="install-path"><code>.ai-sdlc/config.yml</code><ChevronRight size={15} /><code>resolve registry</code><ChevronRight size={15} /><code>SHA256 + signature</code><ChevronRight size={15} /><code>compatibility</code><ChevronRight size={15} /><strong>install</strong></div>
              <p>CLI ưu tiên rule local để dự án có không gian điều chỉnh, sau đó lần lượt tìm bundled kit và fallback bên cạnh crate — quyền điều chỉnh gần, authority xa.</p>
            </div>
          </div>
        </section>

        <section id="record" className="record-section">
          <div className="record-heading">
            <div className="section-marker"><span>07</span><span>OPEN RECORD</span></div>
            <h2>Mọi claim cần có<br /><i>đường dẫn đến record.</i></h2>
          </div>
          <div className="record-grid">
            <article className="record-main">
              <span className="mono-label">CURRENT SOURCE OF TRUTH</span>
              <h3>Repository trước. Website sau.</h3>
              <p>AI-SDLC được xây dựng công khai. Code, rule pack, architecture notes và release history là record có thể kiểm tra; trang này chỉ render một lát cắt dễ đọc hơn.</p>
              <a href="https://github.com/xdev-ai/ai-sdlc" target="_blank" rel="noreferrer" className="underlined-button">
                Mở AI-SDLC repository <ExternalLink size={15} />
              </a>
            </article>
            <div className="record-links">
              <a href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
                <span>01</span><div><strong>xDev AI</strong><em>Open engineering organization</em></div><ExternalLink size={16} />
              </a>
              <button onClick={() => copyText("https://ai.xdev.asia/ai-sdlc", "product")}>
                <span>02</span><div><strong>{copied === "product" ? "URL copied" : "ai.xdev.asia/ai-sdlc"}</strong><em>Product path on the umbrella</em></div><Copy size={16} />
              </button>
              <button onClick={() => goTo("tree")}>
                <span>03</span><div><strong>Spec Kit baseline</strong><em>Components, contract, and rule packs</em></div><ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div>
            <span className="mono-label">THE GOVERNANCE PRINCIPLE</span>
            <h2>AI có thể drafting.<br />Luật phải <i>deterministic.</i></h2>
          </div>
          <div className="closing-actions">
            <p>Khi policy là YAML versioned và engine là tập đóng, thay đổi có thể review, pin, phân phối và audit — không cần tin vào một prompt.</p>
            <a href="https://github.com/xdev-ai" target="_blank" rel="noreferrer" className="ink-button">
              Theo dõi xDev AI <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <footer>
          <span className="footer-brand"><ShieldTraceMark decorative /> AI-SDLC / XDEV AI</span>
          <span>GOVERNED DELIVERY PLATFORM — 2026</span>
          <span><code>AI.XDEV.ASIA / AI-SDLC</code></span>
        </footer>
      </main>
    </div>
  );
}

function FileIcon() {
  return <span className="file-icon" aria-hidden="true">▤</span>;
}
