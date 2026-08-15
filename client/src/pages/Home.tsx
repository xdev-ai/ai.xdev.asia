/* Governance Blueprint: Swiss technical editorial; navy authority, ivory review surface, cyan trace signals. */
/* Governance Blueprint page: blueprint engineering, evidence rail, navy authority, trace-cyan signals. */
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Box,
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  FolderTree,
  GitBranch,
  Layers3,
  Menu,
  Network,
  ShieldCheck,
  X,
} from "lucide-react";

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

const traceAsset = "/manus-storage/aisdlc-trace-visual_ade867ea.png";
const markAsset = "/manus-storage/aisdlc-mark_22edf57e.png";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("platform");

  useEffect(() => {
    const targets = navItems.map(([, , id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target.id) setActiveSection(current.target.id);
      },
      { rootMargin: "-18% 0px -64% 0px", threshold: [0.08, 0.25, 0.55] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const copyText = (value: string, label: string) => {
    void navigator.clipboard?.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="doc-shell">
      <aside className={`rail ${open ? "is-open" : ""}`} aria-label="Điều hướng tài liệu">
        <div className="rail-topline"><span /> <span>PLATFORM BRIEF / 01</span></div>
        <a className="brand-lockup" href="#overview" onClick={() => goTo("overview")}>
          <img src={markAsset} alt="AI-SDLC shield and trace mark" />
          <span><strong>AI-SDLC</strong><em>by xDev AI</em></span>
        </a>
        <div className="rail-file" aria-label="File metadata"><span>FILE</span><code>AI-SDLC / 01</code><span>STATUS</span><strong>PUBLIC BRIEF</strong></div>
        <div className="rail-summary">
          <span className="mono-label">DOCUMENT SCOPE</span>
          <p>Platform governance, <code>spec-kit/</code> và evidence trace cho AI-assisted delivery.</p>
        </div>
        <nav className="section-nav">
          {navItems.map(([number, label, id]) => (
            <button key={id} className={activeSection === id ? "is-active" : ""} onClick={() => goTo(id)}>
              <span>{number}</span><span>{label}</span><ChevronRight size={14} />
            </button>
          ))}
        </nav>
        <div className="rail-bottom">
          <span className="verify-dot" />
          <span>PUBLIC HOME<br /><strong>AI.XDEV.ASIA</strong></span>
        </div>
      </aside>

      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Mở điều hướng" aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={21} />}
      </button>

      <main>
        <section id="overview" className="hero section-anchor">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow"><span className="pulse-line" /> AI-SDLC PLATFORM <span>—</span> XDEV AI / 2026</div>
            <h1>AI có thể tăng tốc.<br /><i>Governance</i> giữ delivery có thể kiểm chứng.</h1>
            <p className="hero-copy">AI-SDLC là governance layer cho AI-assisted software delivery: versioned policy, deterministic validation và evidence có thể truy vết — được duy trì mở bởi xDev AI.</p>
            <div className="hero-actions">
              <button className="ink-button" onClick={() => goTo("platform")}>Khám phá platform <ArrowUpRight size={16} /></button>
              <button className="text-button" onClick={() => goTo("tree")}>Đi vào Spec Kit <ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="hero-meta">
            <div><span>PRIMARY MODEL</span><strong>RULE AS DATA</strong></div>
            <div><span>ENGINE</span><strong>RUST / CLOSED SET</strong></div>
            <div><span>VALIDATION</span><strong>DETERMINISTIC</strong></div>
          </div>
          <div className="hero-evidence-card" aria-label="Validation evidence schematic">
            <div className="evidence-card-top"><span className="verify-dot" /> <span>VALIDATION PATH</span><code>v1.0</code></div>
            <div className="evidence-route"><span>REQ</span><i /><span>SPEC</span><i /><span>RULE</span><i /><span>TC</span></div>
            <div className="evidence-foot"><span>policy pinned</span><span>trace resolved</span></div>
          </div>
          <img className="hero-witness" src={markAsset} alt="" aria-hidden="true" />
          <div className="hero-index"><span>01</span><span>GOVERNED AI-ASSISTED DELIVERY</span></div>
        </section>

        <section id="platform" className="platform-section section-anchor">
          <div className="platform-heading">
            <div className="section-marker"><span>01</span><span>THE AI-SDLC PLATFORM</span></div>
            <h2>Không phải một agent.<br /><i>Một hệ thống delivery có policy.</i></h2>
            <p>AI-SDLC đặt AI ngoài decision path: AI có thể draft, nhưng policy, validation và release evidence vẫn cần artifact rõ ràng, được review và enforce nhất quán.</p>
          </div>
          <div className="lifecycle-grid" aria-label="AI-SDLC governed delivery lifecycle">
            {lifecycle.map(([number, name, copy], index) => (
              <article key={name} className={index === 2 ? "is-gate" : ""}>
                <span>{number}</span>
                <strong>{name}</strong>
                <p>{copy}</p>
                {index < lifecycle.length - 1 && <ChevronRight className="lifecycle-arrow" size={17} aria-hidden="true" />}
              </article>
            ))}
          </div>
          <div className="platform-surfaces">
            {platformSurfaces.map(([label, title, copy], index) => (
              <article key={label}>
                <span className="surface-index">0{index + 1}</span>
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

        <section id="tree" className="section-block section-anchor tree-section">
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

        <section id="contract" className="contract-section section-anchor">
          <div className="contract-visual"><img src={traceAsset} alt="Conceptual traceability lattice" /></div>
          <div className="contract-copy">
            <div className="section-marker"><span>04</span><span>THE CENTRAL CONTRACT</span></div>
            <h2><code>check-kinds.md</code><br />là nơi engine <i>và luật gặp nhau.</i></h2>
            <p>File này khai báo tập đóng 10 check kinds. Mọi <code>check:</code> trong rule pack phải map đúng một kind; unknown kind luôn là engine change, không thể trở thành silent no-op.</p>
            <div className="quote-box"><span>“</span><p>Thêm rule không cần thay engine. Thêm check kind thì có.</p></div>
            <button className="underlined-button" onClick={() => goTo("rules")}>Khám phá rule packs <ArrowUpRight size={16} /></button>
          </div>
        </section>

        <section className="check-section">
          <div className="check-header">
            <div><span className="mono-label">CLOSED SET / 10 CHECK KINDS</span><h2>Danh mục kiểm tra</h2></div>
            <p>Parameters, behavior và closed matching semantics được giữ trong contract, không trôi trong tài liệu rời.</p>
          </div>
          <div className="check-table" role="table" aria-label="Mười check kinds">
            <div className="table-row table-head" role="row"><span>#</span><span>CHECK KIND</span><span>CATEGORY</span><span>BEHAVIOR</span></div>
            {checkKinds.map(([num, kind, category, behavior]) => (
              <div className="table-row" role="row" key={kind}><span>{num}</span><code>{kind}</code><span className="category-chip">{category}</span><span>{behavior}</span></div>
            ))}
          </div>
          <div className="edge-strip"><GitBranch size={17} /><span>EDGE KINDS</span><code>contains</code><code>refines</code><code>accepted_by</code><code>implemented_by</code><code>verified_by</code><code>tracked_by</code></div>
        </section>

        <section id="rules" className="section-block section-anchor rules-section">
          <div className="section-heading rules-heading">
            <div className="section-marker"><span>05</span><span>RUNTIME LAW</span></div>
            <h2>13 rules. <i>Không cần rebuild.</i></h2>
            <p>Ba YAML rule packs chuyển policy thành deterministic gate — chạy như nhau ở local workspace, CI và bề mặt review.</p>
          </div>
          <div className="policy-list">
            {policyPacks.map((pack, index) => (
              <article className={`policy-card ${pack.tint}`} key={pack.id}>
                <div className="policy-card-top"><span className="pack-no">0{index + 1}</span><span className="pack-version">v1.0.0</span></div>
                <h3>{pack.id}</h3><code>{pack.file}</code>
                <p>{pack.summary}</p>
                <div className="rule-list">
                  {pack.rules.map(([id, severity, text]) => <div key={id}><code>{id}</code><span className={`severity ${severity}`}>{severity}</span><span>{text}</span></div>)}
                </div>
                <div className="pack-bottom"><span>{pack.type}</span><ShieldCheck size={17} /></div>
              </article>
            ))}
          </div>
        </section>

        <section id="resolution" className="resolution-section section-anchor">
          <div className="section-marker"><span>06</span><span>EVIDENCE RESOLUTION</span></div>
          <div className="resolution-grid">
            <div><h2>Override ở gần.<br /><i>Governance ở xa.</i></h2><p>CLI ưu tiên rule local để dự án có không gian điều chỉnh, sau đó lần lượt tìm bundled kit và fallback bên cạnh crate.</p></div>
            <div className="flow-window">
              <div className="flow-title"><span className="verify-dot" /> locate_rules_dir(root)</div>
              <div className="flow-item local"><span>01</span><code>.ai-sdlc/validators/rules</code><em>local override · priority</em></div>
              <div className="flow-line" />
              <div className="flow-item"><span>02</span><code>spec-kit/validators/rules</code><em>bundled kit</em></div>
              <div className="flow-line" />
              <div className="flow-item"><span>03</span><code>&lt;manifest&gt;/../spec-kit/rules</code><em>crate fallback</em></div>
            </div>
          </div>
          <div className="install-path"><span className="mono-label">DISTRIBUTION PATH</span><code>.ai-sdlc/config.yml</code><ChevronRight size={15} /><code>resolve registry</code><ChevronRight size={15} /><code>SHA256 + signature</code><ChevronRight size={15} /><code>compatibility</code><ChevronRight size={15} /><strong>install</strong></div>
        </section>

        <section id="roadmap" className="section-block section-anchor roadmap-section">
          <div className="section-heading"><div className="section-marker"><span>07</span><span>SP1 → SP2 ROADMAP</span></div><h2>Skeleton hôm nay.<br /><i>Distribution artifact ngày mai.</i></h2></div>
          <div className="roadmap-grid">
            <div className="roadmap-note"><span className="mono-label">CURRENT STATE</span><strong>Rule-as-data: đạt</strong><p>Ba rule packs và central contract đã ở layout chuẩn. Sáu surface còn lại là placeholder cho Kit hoàn chỉnh.</p><div className="roadmap-line" /><span className="mono-label">NEXT HOST</span><strong>Management Server / SP2</strong></div>
            <div className="placeholder-list">
              {placeholders.map(([name, description], index) => <article key={name}><span>0{index + 1}</span><div><code>{name}</code><p>{description}</p></div><ChevronRight size={18} /></article>)}
            </div>
          </div>
        </section>

        <section id="record" className="record-section section-anchor">
          <div className="record-heading"><div className="section-marker"><span>08</span><span>OPEN RECORD</span></div><h2>Mọi claim cần có<br /><i>đường dẫn đến record.</i></h2></div>
          <div className="record-grid">
            <article className="record-main"><span className="mono-label">CURRENT SOURCE OF TRUTH</span><h3>Repository trước. Website sau.</h3><p>AI-SDLC được xây dựng công khai. Code, rule pack, architecture notes và release history là record có thể kiểm tra; site này chỉ render một lát cắt dễ đọc hơn.</p><a href="https://github.com/tdduydev/ai-sdlc" target="_blank" rel="noreferrer" className="underlined-button">Mở AI-SDLC repository <ExternalLink size={15} /></a></article>
            <div className="record-links">
              <a href="https://github.com/xdev-ai" target="_blank" rel="noreferrer"><span>01</span><div><strong>xDev AI</strong><em>Open engineering organization</em></div><ExternalLink size={16} /></a>
              <button onClick={() => goTo("tree")}><span>02</span><div><strong>Spec Kit baseline</strong><em>Components, contract, and rule packs</em></div><ChevronRight size={16} /></button>
              <button onClick={() => copyText("https://ai.xdev.asia", "domain")}><span>03</span><div><strong>{copied === "domain" ? "Domain copied" : "ai.xdev.asia"}</strong><em>Planned public platform address</em></div><Copy size={16} /></button>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div><span className="mono-label">THE GOVERNANCE PRINCIPLE</span><h2>AI có thể drafting.<br />Luật phải <i>deterministic.</i></h2></div>
          <div className="closing-actions"><p>Khi policy là YAML versioned và engine là tập đóng, thay đổi có thể review, pin, phân phối và audit — không cần tin vào một prompt.</p><a href="https://github.com/xdev-ai" target="_blank" rel="noreferrer" className="ink-button">Theo dõi xDev AI <ArrowUpRight size={16} /></a></div>
        </section>

        <footer><span className="footer-brand"><img src={markAsset} alt="" aria-hidden="true" /> AI-SDLC / XDEV AI</span><span>GOVERNED DELIVERY PLATFORM — 2026</span><span><code>AI.XDEV.ASIA</code> / SPEC KIT BASELINE</span></footer>
      </main>
    </div>
  );
}

function FileIcon() {
  return <span className="file-icon" aria-hidden="true">▤</span>;
}
