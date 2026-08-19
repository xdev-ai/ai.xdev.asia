/* Shared breadcrumb for child pages: Home / <Page>. Bilingual EN/VI.
   Font-mono amber/navy to match the evidence-sheet design language. */
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Breadcrumb({ page }: { page: "ai-sdlc" | "trace-ledger" | "docs" | "quickstart" | "guide" | "policies" | "releases" | "tools" }) {
  const { t, locale } = useLang();
  const label =
    locale === "vi"
      ? {
          "ai-sdlc": "AI-SDLC",
          "trace-ledger": "Trace Ledger",
          docs: "Tài liệu",
          quickstart: "Bắt đầu nhanh",
          guide: "Cách dùng",
          policies: "Policy Registry",
          releases: "Bản phát hành",
          tools: "Công cụ",
        }[page]
      : {
          "ai-sdlc": "AI-SDLC",
          "trace-ledger": "Trace Ledger",
          docs: "Documentation",
          quickstart: "Quickstarts",
          guide: "Usage Guide",
          policies: "Policy Registry",
          releases: "Releases",
          tools: "Tools",
        }[page];
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 pt-5 md:px-6 lg:max-w-none">
      <ol className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#537184]">
        <li>
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[#6bdae0]">
            <Home size={11} />
            <span>{locale === "vi" ? "Trang chủ" : "Home"}</span>
          </Link>
        </li>
        <li className="flex items-center gap-1" aria-hidden="true">
          <ChevronRight size={10} className="opacity-60" />
        </li>
        <li className="text-[#8d6837]">{label}</li>
      </ol>
    </nav>
  );
}
