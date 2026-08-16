"use client";

/* Plausible analytics injection — only when the domain env var is configured.
   Works under static export (next build) because the script tag is static HTML. */
import Script from "next/script";

export function PlausibleInject() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <>
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-compat" strategy="afterInteractive">
        {`window.plausible = window.plausible || function(){(window.plausible.q = window.plausible.q || []).push(arguments)}`}
      </Script>
    </>
  );
}
