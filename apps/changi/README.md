# Changi Airport Demo (unofficial)

Vite + React 19 recreation of the [Changi Airport AU English homepage](https://www.changiairport.com/au/en.html) and primary traveller hubs — for demo and codebase exploration only.

**Not affiliated with Changi Airport Group.** Brand assets are sourced from public changiairport.com pages for visual fidelity.

## Quick start

From the monorepo root:

```bash
pnpm install
pnpm dev:changi
```

App: http://localhost:5176

Or inside this package:

```bash
pnpm --filter changi-airport-demo dev
```

## Demo credentials

Login / signup accept **any** email and password in demo mode.

Suggested:

- Email: `traveller@example.com`
- Password: `demo`

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Vite dev server (port 5176) |
| `pnpm build` | Typecheck + production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest unit/component tests |
| `pnpm shots` | Playwright vision screenshots → `shots/` |
| `pnpm video` | Optional walkthrough (alias of shots) |

## What’s included

- Home: **I AM** persona hero (Arriving / Departing / Transiting / Visiting), What’s Happening, destinations carousel
- Fly + flight information table (25+ mock rows)
- At Changi, Dine & Shop, Experience, Happenings, Rewards, Help
- Mock Changi Account (login / signup / account / settings)
- Official CAG logo in the header (`public/brand/logo.svg`)
- Cookie banner, mega-nav, footer matching the live IA

## Monorepo alignment

Matches `apps/squiz` / `apps/paytm` conventions: Vite + React 19 + Tailwind v4, `@demo/ui` (`cn`, `DemoRibbon`), Vitest, and root `dev:changi` / `build:changi` scripts.

## Brand assets

See `public/brand/brand-assets.json` and `scripts/fetch-brand-assets.sh`.
