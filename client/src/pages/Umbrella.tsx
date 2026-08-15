/* xDev AI umbrella landing: navy authority, ivory review surface, cyan trace signals, amber verification witness. */
import { ArrowUpRight, ArrowRight, ExternalLink, GitBranch, FileCode2, ShieldCheck, Activity } from "lucide-react";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";

/* NOTE (product-fit test):
   The umbrella page must stay neutral toward any single product so future products
   (AI-SDLC, Trace Ledger, ...) plug in as siblings under ai.xdev.asia/<product>. */

type ProductCard = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  status: string;
  statusTone: "live" | "incubating";
  copy: string;
  stack: string;
  href: string;
  cta: string;
};

const products: ProductCard[] = [
  {
    slug: "ai-sdlc",
    index: "01",
    name: "AI-SDLC",
    tagline: "Governed AI-assisted software delivery",
    status: "PUBLIC / v1.0",
    statusTone: "live",
    copy: "Lớp governance cho AI-assisted delivery: versioned policy-as-data, validation engine Rust đóng, và evidence trace từ requirement đến test — chạy nhất quán ở local, GitLab CI và GitHub Actions.",
    stack: "Rust · YAML policy · GitLab CI / GitHub Actions",
    href: "/ai-sdlc",
    cta: "Mở AI-SDLC",
  },
  {
    slug: "trace-ledger",
    index: "02",
    name: "Trace Ledger",
    tagline: "Deterministic change evidence, one ledger",
    status: "CONCEPT / v0.1",
    statusTone: "incubating",
    copy: "Sổ cái evidence hợp nhất: mỗi change của AI — code, spec, config — được ghi thành entry có hash, không thể sửa ngầm. Audit trở thành tra cứu ledger thay vì lục lại chat history.",
    stack: "Concept stage — RFC open in discussion",
    href: "/trace-ledger",
    cta: "Xem concept",
  },
];

const principles = [
  ["01", "Policy as data", "Luật là data có version — thay đổi được review, pin và phân phối, không nằm rải trong prompt."],
  ["02", "Closed execution", "Engine nhận đúng tập check kinds đã khai báo; semantic mới là engine change tường minh, không silent no-op."],
  ["03", "Evidence retained", "Validation và approval là output của quy trình — bằng chứng giữ sẵn, không dựng lại hồi tố."],
  ["04", "Audit-ready by default", "Mỗi sản phẩm của xDev AI phải trả lời được: ai quyết, theo luật nào, version nào, proof ở đâu."],
];

const record = [
  ["xdev-ai", "GitHub organization", "Mọi record công khai tại github.com/xdev-ai"],
  ["ai.xdev.asia", "Umbrella domain", "Trang chủ của tổ chức và các sản phẩm"],
  ["hello@xdev.asia", "Public contact", "Liên hệ công khai của tổ chức"],
];

export default function Umbrella() {
  return (
    <div className="umbrella">
      <header className="umbrella-topbar">
        <a className="umbrella-brand" href="/">
          <ShieldTraceMark className="umbrella-mark" decorative />
          <span><strong>xDev AI</strong><em>OPEN ENGINEERING ORGANIZATION</em></span>
        </a>
        <nav className="umbrella-nav">
          <a href="/ai-sdlc">AI-SDLC</a>
          <a href="/trace-ledger">Trace Ledger</a>
          <a href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
            GitHub <ExternalLink size={12} />
          </a>
        </nav>
      </header>

      <section className="umbrella-hero">
        <div className="umbrella-hero-grid" aria-hidden="true" />
        <div className="umbrella-hero-content">
          <div className="eyebrow"><span className="pulse-line" /> AI.XDEV.ASIA <span>—</span> UMBRELLA / 2026</div>
          <h1>
            AI xây công việc.<br />
            <i>xDev AI</i> giữ bằng chứng.
          </h1>
          <p className="umbrella-copy">
            xDev AI là tổ chức engineering mở xây các hệ thống biến AI-assisted work thành
            record có thể kiểm chứng: luật đóng băng thành policy-as-data, enforcement
            deterministic, và evidence traceable từ decision đến release.
          </p>
          <div className="umbrella-cta-row">
            <a className="ink-button" href="/ai-sdlc">
              Khám phá AI-SDLC <ArrowUpRight size={16} />
            </a>
            <a className="text-button" href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">
              Open record trên GitHub <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="umbrella-stat-strip">
            <div><span>PRODUCTS</span><strong data-verified="true">02</strong></div>
            <div><span>ORG MODEL</span><strong>UMBRELLA / PATH ROUTING</strong></div>
            <div><span>RECORD</span><strong>PUBLIC / xdev-ai</strong></div>
          </div>
        </div>
        <ShieldTraceMark className="umbrella-witness" decorative />
      </section>

      <section className="umbrella-products">
        <div className="umbrella-section-head">
          <div className="section-marker"><span>01</span><span>PRODUCT CATALOG</span></div>
          <h2>Một umbrella.<br /><i>Các sản phẩm có cùng luật chơi.</i></h2>
        </div>
        <div className="umbrella-product-list">
          {products.map((p) => (
            <article key={p.slug} className={`umbrella-product ${p.statusTone}`}>
              <div className="product-index">{p.index}</div>
              <div className="product-body">
                <div className="product-head">
                  <h3>{p.name}</h3>
                  <span className={`product-status ${p.statusTone}`}>{p.status}</span>
                </div>
                <p className="product-tagline">{p.tagline}</p>
                <p className="product-copy">{p.copy}</p>
                <div className="product-meta"><FileCode2 size={13} /><span>{p.stack}</span></div>
                <a className="product-cta" href={p.href}>
                  {p.cta} {p.statusTone === "live" ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="umbrella-principles">
        <div className="umbrella-section-head">
          <div className="section-marker"><span>02</span><span>SHARED PRINCIPLES</span></div>
          <h2>Luật chơi chung của mọi sản phẩm.</h2>
        </div>
        <div className="umbrella-principle-grid">
          {principles.map(([index, title, copy], i) => (
            <article key={title}>
              <span className="mono-label">PRINCIPLE / {index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              {i === 0 && <span className="verify-dot" aria-label="verified" />}
            </article>
          ))}
        </div>
      </section>

      <section className="umbrella-record">
        <div className="umbrella-section-head">
          <div className="section-marker"><span>03</span><span>OPEN RECORD</span></div>
          <h2>Tổ chức mở.<br /><i>Record kiểm được.</i></h2>
        </div>
        <div className="umbrella-record-list">
          {record.map(([label, title, copy], i) => (
            <a key={label} href={i === 0 ? "https://github.com/xdev-ai" : i === 1 ? "https://ai.xdev.asia" : "mailto:hello@xdev.asia"} target="_blank" rel="noreferrer">
              <span className="mono-label">{label}</span>
              <div><strong>{title}</strong><em>{copy}</em></div>
              {i < 2 ? <ExternalLink size={15} /> : <ShieldCheck size={15} />}
            </a>
          ))}
        </div>
      </section>

      <footer className="umbrella-footer">
        <span className="footer-brand"><ShieldTraceMark decorative size={18} /> xDev AI / UMBRELLA</span>
        <span>OPEN ENGINEERING ORGANIZATION — 2026</span>
        <span><code>AI.XDEV.ASIA</code> / PRODUCT ROUTING</span>
      </footer>
    </div>
  );
}
