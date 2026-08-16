"use client";

/* xDev AI umbrella: EN/VI language switch, mono-typed like the rest of the brand. */
import { useLang } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/dictionary";

export function LanguageSwitch() {
  const { locale, setLocale } = useLang();
  const other: Locale = locale === "en" ? "vi" : "en";

  return (
    <button
      className="lang-switch"
      onClick={() => setLocale(other)}
      aria-label={`Switch to ${other === "en" ? "English" : "Tiếng Việt"}`}
      type="button"
    >
      <span className={locale === "en" ? "is-active" : ""}>EN</span>
      <span className="lang-sep">/</span>
      <span className={locale === "vi" ? "is-active" : ""}>VI</span>
    </button>
  );
}
