"use client";

/* Anonymous share/click analytics for release records.
   Sends Plausible custom events (cookie-less) when available:
   - "release_share"     → which record/link was shared and via which network
   - "release_click"     → which outbound release link (GitHub, registry) was clicked
   No personal data, no cookies, no tracking IDs — only event name + props. */

type PlausibleFn = (name: string, options?: { props?: Record<string, string | number | boolean>; callback?: () => void }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

const isAvailable = () => typeof window !== "undefined" && typeof window.plausible === "function";

export function trackShare(kind: "lookup" | "record", recordId: string | null, network: string) {
  if (!isAvailable()) return;
  try {
    window.plausible!("release_share", { props: { kind, record: recordId ?? "none", network } });
  } catch { /* analytics never break the UI */ }
}

export function trackReleaseClick(linkId: string) {
  if (!isAvailable()) return;
  try {
    window.plausible!("release_click", { props: { link: linkId } });
  } catch { /* analytics never break the UI */ }
}
