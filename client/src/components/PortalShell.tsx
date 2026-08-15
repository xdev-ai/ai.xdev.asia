/* Governance Blueprint shared shell: document spine, evidence rail, and bilingual platform navigation. */
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Languages, Menu, ShieldCheck, X } from "lucide-react";

export type Locale = "en" | "vi";
export type PortalRoute = "platform" | "docs" | "policies";

const markAsset = "/manus-storage/aisdlc-mark_22edf57e.png";

const navigation: Array<{ route: PortalRoute; href: string; number: string; en: string; vi: string }> = [
  { route: "platform", href: "/", number: "01", en: "Platform", vi: "Nền tảng" },
  { route: "docs", href: "/docs", number: "02", en: "Docs", vi: "Tài liệu" },
  { route: "policies", href: "/policies", number: "03", en: "Policy Registry", vi: "Kho chính sách" },
];

type PortalShellProps = {
  route: PortalRoute;
  children: (locale: Locale) => ReactNode;
};

export function PortalShell({ route, children }: PortalShellProps) {
  const [locale, setLocale] = useState<Locale>(() => (window.localStorage.getItem("aisdlc-locale") === "vi" ? "vi" : "en"));
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(() => window.matchMedia("(max-width: 760px)").matches);

  useEffect(() => {
    window.localStorage.setItem("aisdlc-locale", locale);
  }, [locale]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setNarrow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const t = locale === "en";

  return (
    <div className="knowledge-shell" style={narrow ? undefined : { display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)" }}>
      <aside className={`knowledge-spine ${open ? "is-open" : ""}`} style={narrow ? { position: "fixed", transform: open ? "translateX(0)" : "translateX(-104%)", transition: "transform .23s cubic-bezier(.23,1,.32,1)" } : { position: "sticky", top: 0, height: "100vh" }} aria-label={t ? "AI-SDLC platform navigation" : "Điều hướng nền tảng AI-SDLC"}>
        <div className="spine-topline"><span /> <span>AI-SDLC / OPEN SYSTEM</span></div>
        <a className="spine-brand" href="/">
          <img src={markAsset} alt="AI-SDLC shield and trace mark" />
          <span><strong>AI-SDLC</strong><em>by xDev AI</em></span>
        </a>
        <div className="spine-status"><span>RECORD</span><code>PUBLIC / v1.0</code><span>MODE</span><strong>{t ? "BILINGUAL" : "SONG NGỮ"}</strong></div>
        <nav className="spine-nav" aria-label={t ? "Primary navigation" : "Điều hướng chính"}>
          {navigation.map((item) => (
            <a key={item.route} className={route === item.route ? "is-active" : ""} href={item.href} onClick={() => setOpen(false)}>
              <span>{item.number}</span><strong>{t ? item.en : item.vi}</strong><ArrowUpRight size={13} />
            </a>
          ))}
        </nav>
        <div className="spine-principle"><ShieldCheck size={15} /><p>{t ? "AI may draft. Policy remains deterministic." : "AI có thể draft. Policy vẫn phải deterministic."}</p></div>
        <div className="spine-domain"><span className="verify-dot" /><span>PUBLIC HOME<br /><strong>AI.XDEV.ASIA</strong></span></div>
      </aside>
      <button className="knowledge-mobile-menu" style={{ display: narrow ? "grid" : "none" }} onClick={() => setOpen(!open)} aria-label={t ? "Open navigation" : "Mở điều hướng"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={21} />}</button>

      <main className="knowledge-workspace" style={narrow ? { marginLeft: 0 } : { gridColumn: 2, marginLeft: 0 }}>
        <header className="knowledge-header">
          <div className="knowledge-crumb"><span>{t ? "xDev AI / AI-SDLC" : "xDev AI / AI-SDLC"}</span><i /> <strong>{navigation.find((item) => item.route === route)?.[t ? "en" : "vi"]}</strong></div>
          <div className="knowledge-actions">
            <a href="https://github.com/xdev-ai" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
            <div className="language-switch" aria-label={t ? "Language" : "Ngôn ngữ"}><Languages size={14} /><button className={locale === "en" ? "is-active" : ""} onClick={() => setLocale("en")}>EN</button><span>/</span><button className={locale === "vi" ? "is-active" : ""} onClick={() => setLocale("vi")}>VI</button></div>
          </div>
        </header>
        {children(locale)}
      </main>
    </div>
  );
}
