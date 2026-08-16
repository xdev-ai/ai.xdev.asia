/* Governance Blueprint shared shell: document spine, evidence rail, and bilingual platform navigation.
   Unified with the umbrella LanguageContext (single locale source) and upgraded to next/link. */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Languages, Menu, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { useLang, type Locale } from "@/i18n/LanguageContext";

export type { Locale };

export type PortalRoute =
  | "platform"
  | "docs"
  | "quickstart"
  | "policies"
  | "releases"
  | "blog"
  | "none";

const navigation: Array<{ route: PortalRoute; href: string; number: string; en: string; vi: string }> = [
  { route: "platform", href: "/", number: "01", en: "Platform", vi: "Nền tảng" },
  { route: "docs", href: "/docs", number: "02", en: "Docs", vi: "Tài liệu" },
  { route: "quickstart", href: "/quickstart", number: "03", en: "Quickstarts", vi: "Quickstart" },
  { route: "blog", href: "/blog", number: "04", en: "Blog", vi: "Blog" },
  { route: "policies", href: "/policies", number: "05", en: "Policy Registry", vi: "Kho chính sách" },
  { route: "releases", href: "/releases", number: "06", en: "Releases", vi: "Release" },
];

type PortalShellProps = {
  route: PortalRoute;
  children: (locale: "en" | "vi") => ReactNode;
};

export function PortalShell({ route, children }: PortalShellProps) {
  const { locale, setLocale } = useLang();
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

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
        <Link className="spine-brand" href="/">
          <ShieldTraceMark className="spine-mark" />
          <span><strong>AI-SDLC</strong><em>by xDev AI</em><small>GOVERNED DELIVERY</small></span>
        </Link>
        <div className="spine-status"><span>RECORD</span><code>PUBLIC / v1.0</code><span>FILE</span><code>AI-SDLC / OPEN</code><span>MODE</span><strong>{t ? "BILINGUAL" : "SONG NGỮ"}</strong></div>
        <nav className="spine-nav" aria-label={t ? "Primary navigation" : "Điều hướng chính"}>
          {navigation.map((item) => (
            <Link key={item.route} className={route === item.route ? "is-active" : ""} href={item.href} onClick={() => setOpen(false)}>
              <span>{item.number}</span><strong>{t ? item.en : item.vi}</strong><ArrowUpRight size={13} />
            </Link>
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
