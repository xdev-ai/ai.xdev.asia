/* Common portal navigation rendered inside the sticky topbar of product-sheet pages
   (/ai-sdlc, /trace-ledger) so they share the same umbrella nav as PortalShell pages.
   Desktop: compact inline list at lg+; the same links appear in the mobile drawer
   (CommonDrawerNav) replacing the old 3-item sibling block.
   The item matching the current page path is rendered as the ACTIVE state (amber highlight). */
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
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

export function CommonHeaderNav({ dark = true }: { dark?: boolean }) {
  const { locale } = useLang();
  const pathname = usePathname();
  const items = COMMON_NAV.map((item) => ({
    href: item.href,
    label: locale === "en" ? item.en : item.vi,
    active: item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  }));

  return (
    <div className={`flex items-center gap-x-3.5 overflow-x-auto px-4 lg:px-6 ${dark ? "border-t border-[rgba(229,180,76,.18)]" : "border-t border-[#0a6e7f]/25"}`}>
      {items.map((item) => (
        <a
          key={item.href}
          className={`whitespace-nowrap px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${item.active ? "border-b-2 text-amber-400" : dark ? "text-[#8fa4bc] hover:text-amber-200" : "text-[#3f5768] hover:text-[#0a6e7f]"} ${item.active && !dark ? "border-amber-400" : ""}`}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
      <a
        className={`flex items-center gap-1 whitespace-nowrap px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${dark ? "text-amber-200" : "text-[#0a6e7f]"}`}
        href="https://github.com/xdev-ai"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
        <ArrowUpRight size={10} className={dark ? "text-[#8fa4bc]" : "text-[#5b7386]"} />
      </a>
    </div>
  );
}

/* Drawer variant: the same common nav rendered as a bordered list for the mobile drawer. */
export function CommonDrawerNav() {
  const { locale } = useLang();
  const pathname = usePathname();
  return (
    <div className="mt-3 grid gap-1 border-y border-[rgba(229,180,76,.3)] py-2">
      {COMMON_NAV.map((item, i) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <a
            key={item.href}
            className={`flex items-center gap-2 rounded px-3 py-2.5 text-[13px] transition-colors ${active ? "bg-amber-400/15 text-amber-100" : "text-[#b9cad8] hover:bg-[#1a2d44]"}`}
            href={item.href}
            aria-current={active ? "page" : undefined}
          >
            <span className="font-mono text-[10px] text-[#6f8ba6]">{String(i + 1).padStart(2, "0")}</span>
            {locale === "en" ? item.en : item.vi}
            <ArrowUpRight size={12} className="ml-auto opacity-60" />
          </a>
        );
      })}
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
