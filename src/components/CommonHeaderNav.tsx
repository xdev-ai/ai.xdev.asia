/* Common portal navigation rendered inside the sticky topbar of product-sheet pages
   (/ai-sdlc, /trace-ledger) so they share the same umbrella nav as PortalShell pages.
   Desktop: compact inline list; hidden on md because the fixed rail already carries product nav —
   instead the topbar row shows the list between brand and actions on lg, and a "Portal" dropdown
   button on md-lg. Kept deliberately small (font-mono caps) to match the evidence-sheet aesthetic. */
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const COMMON_NAV: Array<{ href: string; en: string; vi: string }> = [
  { href: "/", en: "Platform", vi: "Nền tảng" },
  { href: "/docs", en: "Docs", vi: "Tài liệu" },
  { href: "/quickstart", en: "Quickstarts", vi: "Quickstart" },
  { href: "/guide", en: "Usage Guide", vi: "Cách dùng" },
  { href: "/blog", en: "Blog", vi: "Blog" },
  { href: "/policies", en: "Policies", vi: "Chính sách" },
  { href: "/releases", en: "Releases", vi: "Release" },
];

export function CommonHeaderNav({ compact = false }: { compact?: boolean }) {
  const { locale } = useLang();
  const items = COMMON_NAV.map((item) => ({
    href: item.href,
    label: locale === "en" ? item.en : item.vi,
  }));

  return (
    <div className="flex items-center gap-x-3.5 overflow-x-auto border-t border-[rgba(229,180,76,.18)] px-4 lg:px-6">
      {items.map((item) => (
        <a
          key={item.href}
          className={`whitespace-nowrap font-mono uppercase tracking-[0.14em] transition-colors hover:text-amber-200 ${compact ? "py-1 text-[9px] text-[#8fa4bc]" : "py-1.5 text-[10px] text-[#8fa4bc]"}`}
          href={item.href}
        >
          {item.label}
        </a>
      ))}
      <a
        className="flex items-center gap-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-amber-200"
        href="https://github.com/xdev-ai"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
        <ArrowUpRight size={10} className="text-[#8fa4bc]" />
      </a>
    </div>
  );
}

/* Drawer variant: the same common nav rendered as a bordered list for the mobile drawer
   (replaces the old 3-item sibling link block). */
export function CommonDrawerNav() {
  const { locale } = useLang();
  return (
    <div className="mt-3 grid gap-1 border-y border-[rgba(229,180,76,.3)] py-2">
      {COMMON_NAV.map((item, i) => (
        <a
          key={item.href}
          className="flex items-center gap-2 rounded px-3 py-2.5 text-[13px] text-[#b9cad8] hover:bg-[#1a2d44]"
          href={item.href}
        >
          <span className="font-mono text-[10px] text-[#6f8ba6]">{String(i + 1).padStart(2, "0")}</span>
          {locale === "en" ? item.en : item.vi}
          <ArrowUpRight size={12} className="ml-auto opacity-60" />
        </a>
      ))}
      <a
        className="flex items-center gap-2 rounded px-3 py-2.5 text-[13px] text-[#b9cad8] hover:bg-[#1a2d44]"
        href="https://github.com/xdev-ai"
        target="_blank"
        rel="noreferrer"
      >
        <span className="font-mono text-[10px] text-[#6f8ba6]">GH</span>
        GitHub
        <ArrowUpRight size={12} className="ml-auto opacity-60" />
      </a>
    </div>
  );
}
