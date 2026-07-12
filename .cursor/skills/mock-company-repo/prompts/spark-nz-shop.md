# Build Spark NZ Demo — Shop, Travel & Move Hub, Auth, and My Spark Dashboard

## Mission

Scaffold a production-quality **Spark New Zealand UI clone** for demo purposes that looks and
feels like the real Spark online shop, based on
`https://www.spark.co.nz/online/shop/promotions/travel-and-move`. This is a UI/UX fidelity demo,
not a production app: dummy data, mock auth, local env vars, markdown/JSON persistence. No real
external services.

**Deliverable:** a single PR against `main` with a complete, lint-clean, build-passing app that
runs locally. In this monorepo, build it under `apps/spark/` and wire it into
`pnpm-workspace.yaml` / root `package.json` (`dev:spark`, `build:spark`).

## Company profile

- **Product:** Spark NZ — mobile, broadband and travel/roaming telco shop + "My Spark" self-service account.
- **Primary users:** NZ consumers shopping for plans and managing their account; travellers sorting roaming; people moving home.
- **Core surfaces to clone:** marketing home, **Travel & Move promotions hub** (hero), mobile plans, broadband, travel & roaming, Spark ID login/register, My Spark dashboard (usage, bills, plan, add-ons, settings).
- **Dummy-data theme:** NZ telco — endless data mobile plans, fibre/wireless broadband, roaming zones (Australia & Pacific, Asia, Europe & UK, North America, Rest of world), travel packs, eSIMs, NZD billing.

## Target tech stack (match the monorepo's Next.js apps)

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Components | shadcn-style Radix primitives |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Auth | Mock Spark ID session via signed HTTP-only cookie (jose HS256) + middleware |
| Data | Local JSON seed files (atomic writes) |
| Shared | `@demo/ui` (`cn`) |
| Tests | Vitest + RTL; Playwright walkthrough recorder |

Explicitly DO NOT integrate real databases, cloud providers, OAuth, or payment providers.

## Brand — source real assets first

- Spark Purple `#5F259F` primary; spot accents green `#00AF55`, magenta `#EC008C`, orange `#FF9B00`.
- Fetch the official Spark wordmark SVGs (`/content/dam/sparkdigital/images/logo/purple.svg` and
  `.../white.svg`) into `public/brand/`; hand-author a favicon/app-icon "spot" glyph. Self-host
  only. Add `scripts/fetch-brand-assets.sh` + `public/brand/brand-assets.json`.

## Pages

- **Home (`/`)** — purple hero, product tiles (mobile/broadband/travel), featured plans, promotions strip, trust bar.
- **Travel & Move (`/shop/promotions/travel-and-move`)** — HERO page. Breadcrumb + hero band + quick-links; "Going overseas" (daily roaming featured card, travel packs, eSIM); roaming-rates-by-destination grid; "Moving home or moving to Spark" (move broadband, switch to Spark, visitor eSIM); CTA band.
- **Mobile / Broadband** — plan card listings. **Roaming** — daily roaming, zones, travel packs, eSIM.
- **Login / Register** — Spark ID mock; any credentials work.
- **My Spark `(app)`** — dashboard (data usage, next bill, active add-ons), usage table, bills history, plan switcher, add-ons connect/disconnect (persisted), settings.
- **Legal** — markdown privacy/terms.

## Data, auth, quality, tests, README

- JSON: users, plans, addons, account, usage, bills, promotions, settings — atomic writes via route handlers.
- `middleware.ts` protects `/dashboard /usage /bills /plan /addons /settings`; unauth → `/login?redirect=`.
- Strict TS, ESLint clean, build clean, accessible, responsive.
- Tests: formatters, session encode/decode, a promotions component, one API route (GET/POST).
- Playwright "computer-vision" walkthrough with a visible cursor, capturing screenshots.
- README: unofficial demo (not affiliated with Spark NZ), setup, demo credentials, structure, persistence.

## PR requirements

Branch `feat/spark-demo` (or the run's assigned branch). Run lint, build, test — all pass. PR titled
**feat: Spark NZ demo — shop, Travel & Move hub, auth, and My Spark dashboard** with summary,
fidelity notes, test plan, demo credentials, walkthrough screenshots, and known limitations.

## Constraints

- Dummy data only; no real secrets; no real integrations. Prefer many small files.
- Not affiliated with Spark NZ — README + footer must say so. Brand logos are public assets used for visual fidelity only; all copy/data fictional.
