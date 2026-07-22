# Optus demo (unofficial)

An **unofficial** UI demo recreating the Optus (optus.com.au) marketing site and the
**My Optus** account experience. It is **not affiliated with Singtel Optus Pty Limited** —
it exists purely to demonstrate a realistic, multi-surface telco web app built with dummy
data and mock auth.

Part of the `demo-monorepo` pnpm workspace; consumes the shared `@demo/ui` package.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v3 with Optus brand tokens
- Radix primitives, lucide-react icons, `@tanstack/react-table`
- Mock auth: `jose` HS256 JWT in an HTTP-only cookie + `middleware.ts`
- Persistence: local JSON files under `data/` (atomic writes) + markdown in `content/`

## Getting started

```bash
# from the monorepo root
pnpm install
pnpm dev:optus        # http://localhost:3000
```

The Next apps (naukri, seek, spark, optus) all default to port 3000. To run alongside
another, use a different port:

```bash
PORT=3003 pnpm --filter optus-web-demo dev
```

`.env.local` is optional — the app falls back to safe demo defaults. Copy `.env.example`
to override:

```bash
cp .env.example .env.local
```

## Demo credentials

Login accepts **any** email/password (mock auth). The form is pre-filled with:

- Email: `admin@optus-demo.com.au`
- Password: `demo`

## Project structure

```
app/
  (marketing) pages: /, mobile-plans, phones, internet, prepaid, entertainment, deals, stores, privacy
  login/  signup/
  (myoptus)/            # protected account area
    dashboard, usage, plans, bills, recharge, settings/{account,profile,team,integrations}
  api/                  # auth, bills, recharge, settings route handlers
components/  ui/ layout/ marketing/ plans/ myoptus/
lib/         auth/ data/ types/ utils/ content.ts constants.ts
content/     landing/ legal/
data/        *.json seed + runtime store
public/brand/ logos, favicon, manifest
middleware.ts           # protects (myoptus) routes
```

## How persistence works

API route handlers read/write JSON in `data/` via `lib/data/json-store.ts` using atomic
writes (temp file + rename). Recharges, team members, and integration toggles persist to
these files at runtime and reset to the seeded values on a fresh checkout.

## Brand assets

`public/brand/` holds the Optus wordmark (supplied with the task), a derived white variant,
a spark mark, and an SVG favicon. The optus.com.au CDN was unreachable from the build
environment, so photography is replaced with Optus-yellow colour blocks. See
`public/brand/brand-assets.json` and `scripts/fetch-brand-assets.sh`.

## Scripts

- `pnpm --filter optus-web-demo dev` — dev server
- `pnpm --filter optus-web-demo build` — production build
- `pnpm --filter optus-web-demo lint` — ESLint
- `pnpm --filter optus-web-demo typecheck` — `tsc --noEmit`
- `pnpm --filter optus-web-demo test` — Vitest suite
