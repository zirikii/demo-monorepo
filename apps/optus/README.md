# Optus Australia demo (`optus-demo`)

Unofficial UI demo of an Optus Australia consumer telco experience: marketing pages for mobile plans, prepaid, home internet, phones, entertainment, Living Network and trade-in, plus a mock **My Optus** account portal.

**Not affiliated with Singtel Optus Pty Limited.** Brand assets are self-hosted for visual demo purposes only.

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

The app defaults to [http://localhost:3000](http://localhost:3000). If that port is busy, use `PORT=3003 pnpm --filter optus-demo dev`.

## Demo credentials

- Email: `admin@optus-demo.au`
- Password: `demo`

Any email/password works in demo mode.

## What's included

- Optus AU marketing homepage with full-bleed teal hero, SIM promo strip, utility actions and shop surfaces
- Mobile / prepaid plans, NBN & 5G Home Internet, phones, entertainment, Living Network, trade-in estimator and support
- AUD pricing and `en-AU` formatting
- Mock login/signup with signed HTTP-only cookie auth
- My Optus: dashboard, usage (+ history), plans, add-ons, bills (28 rows), network tools (Unlimited Data Day, Donate Data, Scamwise, Network Pulse) and settings
- JSON persistence under `data/` via App Router route handlers
- Vitest unit/API tests

## Brand and fonts

- Logos and SVG icons under `public/brand/` (user-provided Optus wordmark; `optus.com.au` CDN may be blocked in cloud egress)
- Refresh local assets with `pnpm --filter optus-demo fetch-brand`
- Font: Montserrat via `next/font` (stand-in for Optus proprietary sans)

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest |
| `pnpm fetch-brand` | Recreate embedded brand assets |

## Monorepo notes

Depends on `@demo/ui` (`cn`, `DemoRibbon`) and keeps `transpilePackages` in `next.config.mjs`. Wired from the root as `pnpm dev:optus` / `pnpm build:optus`.
