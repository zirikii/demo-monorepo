# CommBank web demo (unofficial)

Vite + React 19 clone of the [CommBank](https://www.commbank.com.au/) public website and a simplified NetBank experience.

**Not affiliated with Commonwealth Bank of Australia.** Product names and branding are used for demonstration only. No real banking, payments, or advice.

## Quick start

From the monorepo root:

```bash
pnpm install
pnpm dev:commbank
```

App: http://localhost:5179

## Demo credentials

Any email/password works on **Log on**. Pre-filled:

- Email: `admin@example.com`
- Password: `demo`

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (port 5179) |
| `pnpm build` | Typecheck + production build |
| `pnpm test` | Vitest unit tests |
| `pnpm lint` | ESLint |
| `pnpm fetch-brand` | Re-fetch official logo when CDN is reachable |

## Structure

- `src/pages/` — marketing, product, NetBank, and legal routes
- `src/data/` — nav, products, accounts, transactions, branches, rates, offers
- `src/components/` — layout, marketing, NetBank, UI primitives
- `public/brand/` — self-hosted logo / favicon (`brand-assets.json` documents sources)

## Brand assets

Official logo URL: `https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg`

If egress blocks the CDN, the repo ships a geometric yellow-diamond + CommBank wordmark fallback. Re-run `pnpm fetch-brand` on an open network to replace it with the official SVG.

## Persistence

Mock auth sessions, card locks, settings, signup users, and contact form submissions use `localStorage` only.
