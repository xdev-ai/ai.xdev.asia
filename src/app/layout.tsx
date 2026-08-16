/* xDev AI — global app shell. App Router, static export.
   Providers wrap the whole tree; Plausible injects per environment variable. */
import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PlausibleInject } from "@/components/PlausibleInject";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: { default: "xDev AI — Governed AI Delivery", template: "%s — xDev AI" },
  description:
    "xDev AI is the umbrella brand for governed AI delivery tooling: AI-SDLC, Trace Ledger, and bilingual engineering notes at ai.xdev.asia.",
  authors: [{ name: "xDev AI", url: "https://ai.xdev.asia" }],
  creator: "xDev AI",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
  ],
  openGraph: {
    title: "xDev AI — Governed AI Delivery",
    description:
      "Umbrella brand for governed AI delivery tooling: AI-SDLC, Trace Ledger, and bilingual engineering notes.",
    url: "https://ai.xdev.asia",
    siteName: "xDev AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ai.xdev.asia/brand/xdevai-mark-420.png",
        width: 420,
        height: 420,
        alt: "xDev AI shield trace mark",
      },
    ],
  },
  twitter: { card: "summary", title: "xDev AI — Governed AI Delivery" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://ai.xdev.asia" },
};

const orgJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
  name: "xDev AI",
  url: "https://ai.xdev.asia",
  logo: "https://ai.xdev.asia/brand/xdevai-mark-420.png",
  sameAs: ["https://github.com/xdev-ai"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "duy@xdev.asia",
    contactType: "general",
  },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "xDev AI",
    url: "https://ai.xdev.asia",
    inLanguage: ["en", "vi"],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="light">
            <LanguageProvider>
              <PlausibleInject />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
              />
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
