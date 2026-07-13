# Spark NZ demo (`spark-nz-demo`)

Unofficial UI demo of Spark NZ’s **Travel & Move** experience
(`https://www.spark.co.nz/online/shop/promotions/travel-and-move`) plus Travel
Packs, supporting shop pages, mock auth, and a MySpark account area.

**Not affiliated with Spark New Zealand Trading Limited.** Brand assets were
sourced from public spark.co.nz pages for visual fidelity only.

## Prerequisites

- Node 20+
- pnpm 10+ (workspace root)

## Setup

From the monorepo root:

```bash
pnpm install
cp apps/spark/.env.example apps/spark/.env.local   # optional
pnpm dev:spark
```

App defaults to [http://localhost:3000](http://localhost:3000). If that port is
busy (naukri/seek), use `PORT=3002 pnpm --filter spark-nz-demo dev`.

## Demo credentials

- Email: `admin@spark-demo.nz`
- Password: `demo`

Any email/password works in demo mode.

## What’s included

- Travel & Move landing matching live promo copy and photography
- NZ Travel Packs ($29 / $49 / $79 / $129) + FAQ
- Mobile, broadband, phones, deals, entertainment, foundation, parent hub, stores
- Mock login/signup (signed HTTP-only cookie)
- MySpark: dashboard, usage, plans, top-up, bills, settings (team + integrations)
- JSON persistence under `data/` via App Router route handlers
- Vitest unit tests

## Brand & fonts

- Logos/favicons/photos under `public/brand/` (see `brand-assets.json`)
- Refresh with `pnpm --filter spark-nz-demo fetch-brand`
- Spark uses Avenir Next on the live site; this demo substitutes **Nunito Sans**
  via `next/font`

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest |
| `pnpm fetch-brand` | Re-download brand assets |

## Monorepo notes

Depends on `@demo/ui` (`cn`, `DemoRibbon`). Wired from the root as
`pnpm dev:spark` / `pnpm build:spark`.
