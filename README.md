# ai.xdev.asia — xDev AI Website (Next.js)

Static-export website for the xDev AI umbrella brand (Next.js 16, App Router, `output: "export"`), deployed to GitHub Pages on the custom domain **ai.xdev.asia**.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Styling | Tailwind CSS v4 + custom CSS |
| i18n | EN/VI via `LanguageContext` (default EN, persisted in localStorage) |
| 3D | three.js / react-three-fiber lazy-loaded on `/ai-sdlc` |
| Analytics | Plausible (optional, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) |
| Future DB | Firebase Web SDK (client-only, dynamic import) |

## Key routes

- `/` — Umbrella brand landing page
- `/ai-sdlc` — AI-SDLC product page with 3D pipeline diagram
- `/trace-ledger` — Trace Ledger product page
- `/blog` and `/blog/:slug` — Bilingual engineering blog (31 articles, JSON-LD Article + FAQPage)
- `/tools/maturity-assessment` — AI-SDLC maturity assessment tool
- `/releases` — Release ledger with share buttons and preset filters
- `/policies`, `/policies/:slug` — Policy registry (spec-structure, commit-log, ai-sdlc-policy)
- `/docs`, `/quickstart` — Documentation
- `/privacy`, `/terms` — Legal pages

## Develop

```bash
pnpm install
npx next dev        # local development
npx next build      # static build -> out/
node scripts/finalize-export.js   # convert .html files to trailing-slash folders to match sitemap
```

## Deploy

Push to `main` — GitHub Actions builds the static export, runs the JSON-LD validation test, and deploys to GitHub Pages (`dist/public` artifact path: `out`).
