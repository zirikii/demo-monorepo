# Optus demo (`optus-telco-demo`)

Unofficial UI demo of the **Optus** website (`https://www.optus.com.au/`) —
marketing site, mock auth, and a **My Optus** account area.

**Not affiliated with Singtel Optus Pty Limited.** Brand colours (teal `#39A8AF`,
yellow `#FECD03`) are reproduced from publicly documented values for visual
fidelity only.

## Prerequisites

- Node 20+
- pnpm 10+ (workspace root)

## Setup

From the monorepo root:

```bash
pnpm install
cp apps/optus/.env.example apps/optus/.env.local   # optional
pnpm dev:optus
```

App defaults to [http://localhost:3000](http://localhost:3000). naukri, seek and
spark also use 3000, so run Optus on another port when needed:

```bash
PORT=3005 pnpm --filter optus-telco-demo dev
```

## Demo credentials

- Email: `admin@optus-demo.au`
- Password: `demo`

Any email/password works in demo mode.

## What's included

- Marketing: home, mobile plans, home internet (nbn® + 5G Home), phones, prepaid,
  Optus Sport, deals, store finder, privacy
- Mock login/signup (signed HTTP-only cookie via `jose` HS256)
- My Optus: overview, usage, plans, recharge, billing, settings
  (account, profile, team, add-ons)
- JSON persistence under `data/` via App Router route handlers
- Vitest unit + route + component tests
- Playwright walkthrough recorder (`pnpm video`) that produces a guided demo video

## Brand & fonts

- Logos/favicon/backdrops under `public/brand/` (see `brand-assets.json`)
- `optus.com.au` is outside the Cursor cloud network allowlist, so the committed
  assets are original SVGs built from the documented Optus palette. Run
  `pnpm --filter optus-telco-demo fetch-brand` from a network where
  `optus.com.au` is reachable to swap in the official logo/favicon.
- Optus uses a custom rounded typeface on the live site; this demo substitutes
  **Nunito Sans** via `next/font`.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest |
| `pnpm video` | Record the Playwright walkthrough video |
| `pnpm fetch-brand` | Attempt to re-download official brand assets |

## Monorepo notes

Depends on `@demo/ui` (`cn`, `DemoRibbon`). Wired from the root as
`pnpm dev:optus` / `pnpm build:optus`.
