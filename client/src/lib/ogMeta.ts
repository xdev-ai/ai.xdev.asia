/* Per-page Open Graph / Twitter meta updates for SPA routing.
   index.html ships default og tags (site logo); blog posts override them at render time
   so link previews show the article cover image and title. */

function setOrCreate(selector: string, content: string, property?: string): void {
  const meta =
    document.querySelector<HTMLMetaElement>(selector) ??
    (() => {
      const el = document.createElement("meta");
      if (property) el.setAttribute("property", property);
      document.head.appendChild(el);
      return el as HTMLMetaElement;
    })();
  if (property) meta.setAttribute("property", property);
  meta.setAttribute("content", content);
}

export function updateOgMeta(args: { title: string; description: string; image?: string; url: string }): void {
  setOrCreate('meta[property="og:title"]', args.title, "og:title");
  setOrCreate('meta[property="og:description"]', args.description, "og:description");
  setOrCreate('meta[property="og:url"]', args.url, "og:url");
  if (args.image) {
    setOrCreate('meta[property="og:image"]', args.image, "og:image");
    setOrCreate('meta[name="twitter:image"]', args.image);
    const card = document.querySelector<HTMLMetaElement>('meta[name="twitter:card"]');
    if (card) card.setAttribute("content", "summary_large_image");
  }
  setOrCreate('meta[name="twitter:title"]', args.title);
  setOrCreate('meta[name="twitter:description"]', args.description);
  document.title = `${args.title} — xDev AI Blog`;

  // Per-page canonical + meta description (SPA runtime). The static index.html
  // carries the site-wide defaults; crawlers that execute JavaScript see these
  // after hydration, which is what Google's rendering pipeline does.
  const canon =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
    (() => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      document.head.appendChild(el);
      return el as HTMLLinkElement;
    })();
  canon.setAttribute("href", args.url);
  setOrCreate('meta[name="description"]', args.description);
}

export function resetOgMeta(): void {
  // Crawl bots follow the SPA fallback path, so we cannot rewrite <head> pre-render for them.
  // For client-side navigation back to non-article pages, restore defaults from the site-wide tags.
  const defaults: Record<string, string> = {
    'meta[property="og:title"]': "AI-SDLC — Governed AI-Assisted Delivery",
    'meta[property="og:description"]':
      "Versioned policy, deterministic validation, and traceable evidence for AI-assisted software delivery.",
    'meta[property="og:image"]': "https://ai.xdev.asia/brand/xdevai-mark-420.png",
    'meta[property="og:url"]': "https://ai.xdev.asia",
    'meta[name="twitter:title"]': "xDev AI — Governed AI-Assisted Delivery Platform",
    'meta[name="twitter:description"]':
      "Versioned policy-as-data, deterministic validation, and traceable evidence for AI-assisted software delivery.",
  };
  Object.entries(defaults).forEach(([sel, content]) => setOrCreate(sel, content, undefined));
  const canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canon) canon.setAttribute("href", "https://ai.xdev.asia/");
  setOrCreate('meta[name="description"]', defaults['meta[property="og:description"]']);
}
