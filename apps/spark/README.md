# Spark NZ Travel Page Demo (unofficial)

A Vite + React recreation of Spark NZ's Travel Packs promotional page at
`/online/shop/promotions/travel-and-move`, built for visual-fidelity and codebase
exploration demos.

> **Disclaimer:** This is an **unofficial demo**, not affiliated with, endorsed by, or
> connected to Spark New Zealand. Logos and imagery under `public/brand/` are sourced from
> Spark's public web assets for visual fidelity only (see `public/brand/brand-assets.json`).
> All interactions are simulated; no purchase, account, checkout, SIM, eSIM, or Spark system
> integration is real.

## Stack

| Layer | Technology |
| --- | --- |
| Bundler | Vite 6 |
| Framework | React 19 SPA |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 CSS-first tokens in `src/index.css` |
| Fonts | Self-hosted Inter via `@fontsource` |
| Icons | lucide-react + self-hosted Spark assets |
| Shared package | `@demo/ui` (`cn` class merger, `DemoRibbon`) |
| Tests | Vitest + React Testing Library; Playwright visual walkthrough |

## Getting started

```bash
# from the monorepo root
pnpm install
pnpm dev:spark      # http://localhost:5176

# quality gates
pnpm --filter spark-nz-travel-demo lint
pnpm --filter spark-nz-travel-demo test
pnpm build:spark
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Convenience alias for the Spark travel page |
| `/online/shop/promotions/travel-and-move` | Requested Spark URL clone |
| `*` | Small fallback page |

## Project structure

```text
apps/spark/
├── public/brand/          # Spark logo, campaign imagery, icons, manifest
├── scripts/
│   └── fetch-brand-assets.sh
├── e2e/                   # Playwright video/screenshot walkthrough
└── src/
    ├── components/
    │   ├── layout/        # Header, footer, scroll restoration
    │   ├── travel/        # Hero, plan cards, buying guide, FAQ, rates
    │   └── ui/            # Button, accordion, section heading
    ├── data/              # Navigation, travel packs, FAQs, rates, action cards
    ├── lib/               # shared cn re-export + formatters
    ├── pages/             # route-level page components
    └── test/              # Vitest + RTL suites
```

## Asset workflow

The initial assets were fetched from Spark's public site and committed locally so the UI
does not hotlink production URLs. To refresh them:

```bash
pnpm --filter spark-nz-travel-demo exec bash scripts/fetch-brand-assets.sh
```

`public/brand/favicon.svg` is a local Spark-purple fallback because the text-only page
fetch did not expose a direct favicon URL.

## Visual walkthrough

Run against a started dev server:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:5176 pnpm --filter spark-nz-travel-demo video
```

The walkthrough records a desktop/mobile video with a visible cursor and captures a
full-page screenshot of the promotional page.

## Known limitations

- The live Spark page is rendered through Spark's production CMS; this demo recreates the
  visible content and hierarchy from fetched/indexed page text and public assets.
- Click & collect, MySpark, search, cart, top-up, app download, store finder, and
  compatibility links are simulated or anchor-only.
- The supplied logo reference is represented by the official public Spark SVG committed at
  `public/brand/logo.svg`.
