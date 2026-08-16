/* Shim for static export: per-page meta is handled by generateMetadata in each page.
   Client-side SPA navigation updates document.title + canonical only (OG tags are static per build,
   acceptable for static export; crawlers follow sitemap). */
export function updateOgMeta(args: { title: string; description: string; image?: string; url: string }): void {
  document.title = args.title;
  const setOrCreate = (sel: string, content: string, attr?: string) => {
    const el = document.querySelector<HTMLMetaElement>(sel) ?? (() => {
      const m = document.createElement("meta");
      if (attr) m.setAttribute("property", attr);
      document.head.appendChild(m);
      return m;
    })();
    el.setAttribute(attr ?? "name", content);
    el.setAttribute("content", content);
  };
  setOrCreate('link[rel="canonical"]', args.url);
  if (args.image) setOrCreate('meta[name="twitter:image"]', args.image);
}
export function resetOgMeta(): void {
  // no-op for static export; meta defaults are in layout.tsx metadata
}
