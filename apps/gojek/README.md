# Gojek Demo (unofficial)

Vite + React 19 recreation of the [gojek.io](https://www.gojek.io/) corporate site — the
"3 countries. 20+ products. 1 leading on-demand platform." marketing experience plus a mock
**Partner Hub** dashboard. For demo and codebase exploration only.

**Not affiliated with Gojek or the GoTo Group.** The wordmark + Solv mark are recreated from
the public gojek.io header logo; colors come from Gojek's published brand guidelines.

## Quick start

From the monorepo root:

```bash
pnpm install
pnpm dev:gojek
```

App: http://localhost:5182

Or inside this package:

```bash
pnpm --filter gojek-website-demo dev
```

## Demo credentials

Login / signup accept **any** email and password in demo mode (forms are pre-filled).

- Email: `partner@gojek.io`
- Password: `demo1234`

Signup lets you pick a partner type (driver / merchant / consumer) which changes the
Partner Hub dashboard.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Vite dev server (port 5182) |
| `pnpm build` | Typecheck + production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest unit/component tests |
| `pnpm fetch:brand` | Refresh brand assets (best-effort; committed SVGs are canonical) |

## What's included

- **Home** — hero, "our tech powers Southeast Asia" stats, product showcase with six
  colour-coded clusters, ecosystem stats, drivers + merchants, awards, testimonials,
  careers teaser, app-download band.
- **Products** — all 20+ products with cluster filter + text search.
- **Drivers / Merchants** — recruitment pages with stats, benefits and how-to-join steps.
- **Careers** — filterable job board + life-at-Gojek benefits.
- **Newsroom / About** — press cards and company timeline.
- **Auth + Partner Hub** — mock login/signup, a role-aware dashboard and settings.
- Official green Solv wordmark in the header (`public/brand/logo-green.svg`) + favicon.

## Brand & clusters

Six product verticals, each with a brand primary from the Gojek guidelines:

| Cluster | Colour |
| --- | --- |
| Transport & Logistics | Gojek green `#00AA13` |
| Food & Shopping | Red `#EE2737` |
| Payments | Blue `#00AED6` |
| Daily Needs | Orange `#EF6A00` |
| Business | Purple `#93328E` |
| News & Entertainment | Pink `#DF1995` |

See `public/brand/brand-assets.json` and `scripts/fetch-brand-assets.sh`.

## Monorepo alignment

Matches `apps/changi` / `apps/paytm` / `apps/squiz` conventions: Vite + React 19 +
Tailwind v4 (`@theme`), `@demo/ui` (`cn`, `DemoRibbon`), Vitest, and root `dev:gojek` /
`build:gojek` scripts. Persistence is localStorage only; auth is intentionally mock.
