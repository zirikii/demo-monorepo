# Optus Website Demo

Unofficial UI demo of the Optus consumer website and My Optus account dashboard. This project is not affiliated with Singtel Optus Pty Limited. It uses dummy data, mock auth, and local JSON persistence only.

## Run

```bash
pnpm install
pnpm --filter optus-website-demo dev
```

Demo credentials: `admin@example.com` / `demo` (any credentials are accepted in demo mode).

## Scripts

- `pnpm --filter optus-website-demo dev` - start Next.js
- `pnpm --filter optus-website-demo build` - production build
- `pnpm --filter optus-website-demo test` - Vitest suite
- `pnpm --filter optus-website-demo lint` - Next lint

## What is included

- Marketing home, mobile, prepaid, internet and support pages.
- My Optus dashboard with usage, plans, add-ons, bills, support cases and settings.
- Route handlers backed by JSON files in `data/`.
- Mock signed cookie auth through `middleware.ts`.
- Brand assets self-hosted under `public/brand/`. Direct downloads from Optus and the public SVG fallback host were blocked by cloud egress during this run; see `public/brand/brand-assets.json`.

## Persistence

Route handlers read and write local JSON through `lib/data/json-store.ts` using temp-file plus rename writes. This keeps the demo deterministic and free of real services.
