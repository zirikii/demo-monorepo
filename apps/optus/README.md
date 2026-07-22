# Optus web demo (unofficial)

Unofficial marketing site + **My Optus** account portal inspired by [optus.com.au](https://www.optus.com.au/). Dummy data, mock auth, local JSON persistence.

**Not affiliated with Singtel Optus Pty Limited.** Brand colours match publicly documented Optus teal (`#00A3AD`) and Yes yellow (`#FECD03`). Official CDN assets could not be fetched in the restricted cloud egress environment; wordmark SVGs are committed under `public/brand/` and `scripts/fetch-brand-assets.sh` retries official/Wikimedia URLs when available.

## Setup

From the monorepo root:

```bash
pnpm install
cp apps/optus/.env.example apps/optus/.env.local   # optional
pnpm dev:optus
```

App runs at [http://localhost:3003](http://localhost:3003).

## Demo credentials

- Email: `admin@optus-demo.au`
- Password: `demo`

Any email/password works in demo mode.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm --filter optus-web-demo dev` | Next.js dev server (port 3003) |
| `pnpm --filter optus-web-demo build` | Production build |
| `pnpm --filter optus-web-demo lint` | ESLint |
| `pnpm --filter optus-web-demo test` | Vitest |
| `pnpm --filter optus-web-demo fetch-brand` | Re-fetch brand assets |

## Structure

- `app/` — marketing pages, auth, My Optus routes, API handlers
- `components/` — layout, marketing, plans, myoptus, ui
- `data/` — JSON seed + runtime store
- `content/` — markdown copy
- `public/brand/` — logos + favicon
- `lib/` — auth, types, formatters, JSON store

## Notes

- Optus uses bespoke type on the live site; this demo substitutes **Nunito Sans**.
- nbn® is a trademark of nbn co limited — used here for demo realism only.
- Persistence is atomic JSON writes via `lib/data/json-store.ts` (temp file + rename).
