/* Trace Ledger — product concept page /trace-ledger.
   Reuses the umbrella design system (navy / ivory / cyan trace, amber witness) with
   an amber-forward accent to show the umbrella can carry sibling products with
   distinct accents while staying recognizable. This is a CONCEPT stage page. */
import { ArrowUpRight, ArrowRight, GitBranch, FileJson2, Fingerprint, Hash, Menu, ScrollText, X } from "lucide-react";
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
      const offset = 80; // Mobile menu height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setOpen(false);
  };

  return (
    <div className="product-sheet trace-ledger">
      <aside className={`ps-rail ${open ? "is-open" : ""}`} aria-label="Trace Ledger điều hướng">
        <div className="ps-topline"><span /> <span>AI.XDEV.ASIA / TRACE-LEDGER</span></div>
        <a className="brand-lockup" href="#concept" onClick={() => goTo("concept")}>
          <ShieldTraceMark className="rail-mark" />
          <span><strong>Trace Ledger</strong><em>a concept of xDev AI</em></span>
        </a>
        <div className="rail-file"><span>PATH</span><code>/TRACE-LEDGER</code><span>STATUS</span><strong>CONCEPT / v0.1</strong></div>
        <div className="rail-summary">
          <span className="mono-label">{t.traceLedger.railScopeLabel}</span>
          <p>{t.traceLedger.railScope}</p>
        </div>
        <nav className="section-nav">
          {navItems.map(([number, , id], index) => ({ number, label: t.traceLedger[["navConcept", "navModel", "navEntry", "navWhy", "navStatus"][index]], id })).map(({ number, label, id }) => (
            <button key={id} className={activeSection === id ? "is-active" : ""} onClick={() => goTo(id)}>
              <span>{number}</span><span>{label}</span><ArrowRight size={14} />
            </button>
          ))}
        </nav>
        <div className="ps-sibling-links">
          <a href="/"><span>00</span>{t.product.siblingHome} <ArrowUpRight size={13} /></a>
          <a href="/ai-sdlc"><span>01</span>{t.nav.aiSdlc} <ArrowUpRight size={13} /></a>
        </div>
        <div className="rail-bottom">
          <span className="verify-dot" />
          <span>{t.traceLedger.railDraft}<br /><strong>AI.XDEV.ASIA / TRACE-LEDGER</strong></span>
        </div>
      </aside>

      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Mở điều hướng" aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={21} />}
      </button>

      <main>
        <section className="ps-hero tl-hero" id="concept">
          <div className="ps-hero-grid" aria-hidden="true" />
          <div className="ps-hero-content">
            <div className="eyebrow"><span className="pulse-line" /> {t.traceLedger.heroEyebrow}</div>
            <h1>
              {t.traceLedger.heroTitle1}<br /><i>{t.traceLedger.heroTitle2}</i>
            </h1>
            <p className="ps-copy">{t.traceLedger.heroCopy}</p>
            <div className="hero-actions">
              <button className="ink-button" onClick={() => goTo("model")}>
                {t.traceLedger.ctaViewModel} <ArrowRight size={16} />
              </button>
              <a className="text-button" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
                {t.traceLedger.ctaRfcGithub} <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="tl-badge">{t.traceLedger.heroBadge}</div>
          </div>
          <ShieldTraceMark className="hero-witness" decorative />
          <div className="lang-switch"><LanguageSwitch /></div>
        </section>

        <section id="model" className="tl-model">
          <div className="section-marker"><span>01</span><span>THE LEDGER MODEL</span></div>
          <div className="tl-model-grid">
            <h2>{t.traceLedger.modelTitle} <i>{t.traceLedger.modelSubtitle}</i></h2>
            <p>{t.traceLedger.modelCopy}</p>
            <div className="tl-steps">
              {model.map(([step, desc], i) => (
                <div key={step} className="tl-step">
                  <span className="mono-label">STEP / {String(i + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="entry" className="tl-entry">
          <div className="section-marker"><span>02</span><span>ENTRY ANATOMY</span></div>
          <div className="tl-entry-grid">
            <div className="tl-entry-window">
              <div className="window-bar"><span><i /><i /><i /></span><code>ledger / entries</code><span className="window-state">5 ENTRIES</span></div>
              <div className="tl-entry-table">
                <div className="table-head"><span>ID</span><span>TS</span><span>EVENT</span><span>PAYLOAD</span><span>HASH</span></div>
                {ledgerEntries.map(([id, ts, event, payload, hash]) => (
                  <div key={id} className="tl-entry-row">
                    <code>{id}</code><span>{ts}</span>
                    <span className="category-chip">{event}</span>
                    <span>{payload}</span>
                    <span className="entry-hash"><Hash size={11} />{hash}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tl-entry-notes">
              <article><span className="note-index">A</span><h3>Append-only</h3><p>Không có edit hay delete. Sai thì append entry void tham chiếu entry gốc — lịch sử luôn nguyên vẹn.</p></article>
              <article><span className="note-index">B</span><h3>Linked entries</h3><p>Mỗi entry tham chiếu entry trước theo loại sự kiện: run nối spec, diff nối run, approve nối diff.</p></article>
              <article><span className="note-index">C</span><h3>Portable ledger</h3><p>Ledger là file có version; mỗi sản phẩm của xDev AI có thể emit cùng định dạng để audit liên tổ chức.</p></article>
            </div>
          </div>
        </section>

        <section id="why" className="tl-why">
          <div className="section-marker"><span>03</span><span>WHY LEDGER, WHY NOW</span></div>
          <div className="tl-why-grid">
            <h2>Chat history là memory.<br /><i>Ledger là bằng chứng.</i></h2>
            <div className="tl-compare">
              <div className="tl-compare-col">
                <span className="mono-label">MEMORY</span>
                <ul>
                  <li>Context trôi, session mất</li>
                  <li>Chat có thể bị sửa hoặc xóa</li>
                  <li>Không liên kết được với artifact</li>
                  <li>Audit phụ thuộc vào người nhớ</li>
                </ul>
              </div>
              <div className="tl-compare-col tl-ledger-col">
                <span className="mono-label">LEDGER</span>
                <ul>
                  <li>Entry hash, chuỗi nguyên vẹn</li>
                  <li>Append-only, void minh bạch</li>
                  <li>Liên kết trực tiếp với spec, diff, review</li>
                  <li>Audit đọc file, không cần ký ức</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="status" className="tl-status">
          <div className="section-marker"><span>04</span><span>CONCEPT STATUS</span></div>
          <div className="tl-status-grid">
            <div className="tl-status-note">
              <span className="mono-label">CURRENT STATE</span>
              <strong>Concept only</strong>
              <p>Trang này là bài kiểm tra kiến trúc umbrella: Trace Ledger chưa có repository. Khi concept được chấp nhận, nó sẽ nhận path riêng <code>ai.xdev.asia/trace-ledger</code>, repo riêng trong org xdev-ai, và tuân cùng nguyên tắc shared principles với AI-SDLC.</p>
              <div className="roadmap-line" />
              <span className="mono-label">NEXT STEP</span>
              <strong>RFC open in discussions</strong>
            </div>
            <div className="tl-fit">
              <span className="mono-label">UMBRELLA FIT TEST</span>
              <h3>Một umbrella, nhiều sản phẩm.</h3>
              <p>Trang này dùng chính hệ design của AI-SDLC — navy, ivory, cyan trace, amber witness — với accent amber đẩy lên vai trò chính, chứng minh umbrella nhận được sản phẩm mới có bản sắc riêng mà không phá thương hiệu.</p>
              <ul className="tl-fit-list">
                <li><ScrollText size={14} /><span>Layout product-sheet dùng lại rail + hero + section marker</span></li>
                <li><GitBranch size={14} /><span>Sibling navigation giữa các sản phẩm (/ai-sdlc, /trace-ledger)</span></li>
                <li><FileJson2 size={14} /><span>Ledger format dự kiến dùng chung với evidence của AI-SDLC</span></li>
                <li><Fingerprint size={14} /><span>Signature color riêng: amber thay vì cyan làm chủ đạo</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div>
            <span className="mono-label">THE UMBRELLA QUESTION</span>
            <h2>Sản phẩm mới —<br /><i>cùng luật chơi.</i></h2>
          </div>
          <div className="closing-actions">
            <p>Mỗi sản phẩm của xDev AI trả lời cùng một bộ câu hỏi: ai quyết, theo luật nào, version nào, evidence ở đâu. Trace Ledger đưa câu thứ tư lên làm sản phẩm.</p>
            <a className="ink-button" href="/">Về xDev AI <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <footer>
          <span className="footer-brand"><ShieldTraceMark decorative /> TRACE LEDGER / XDEV AI</span>
          <span>CONCEPT PAGE — 2026</span>
          <span><code>AI.XDEV.ASIA / TRACE-LEDGER</code></span>
        </footer>
      </main>
    </div>
  );
}
