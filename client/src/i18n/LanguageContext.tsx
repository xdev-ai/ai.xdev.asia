/* xDev AI umbrella: global language context. EN is default; persists to localStorage. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionary, type Locale } from "./dictionary";

type LangContextType = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: typeof dictionary.en;
};

const LanguageContext = createContext<LangContextType | null>(null);

const STORAGE_KEY = "xdev-ai:locale";

function readInitial(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "vi") return saved;
  } catch {
    /* localStorage unavailable (SSR/strict privacy) — fall through */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitial);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const t = useMemo(() => dictionary[locale], [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
