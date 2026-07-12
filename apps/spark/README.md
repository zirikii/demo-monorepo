# Spark NZ Demo

An **unofficial, UI/UX-fidelity demo** of the Spark New Zealand online shop and My Spark account,
built with Next.js. It recreates the look and feel of Spark's site — the purple brand, the
**Travel & Move promotions hub** (`/shop/promotions/travel-and-move`), mobile and broadband plans,
travel roaming, and a signed-in "My Spark" dashboard — using **mock auth** and **local JSON
persistence**. No real backends, databases, or external services.

> ⚠️ **Not affiliated with, endorsed by, or sponsored by Spark New Zealand Trading Limited.** This
> project is for demonstration and educational purposes only. The Spark logo and favicon are
> sourced from public Spark web pages solely for visual fidelity (see
> `public/brand/brand-assets.json`). All plans, prices, promotions, usage, bills, and people are
> **fictional**.

---

## ✨ Features

- **Marketing shop** — a Spark-purple hero, product tiles (mobile / broadband / travel), featured
  plans, a promotions strip and a trust bar.
- **Travel & Move promotions hub** (`/shop/promotions/travel-and-move`) — the hero page this demo
  focuses on: daily roaming, travel packs, eSIMs, moving your broadband, switching to Spark, and
  visitor eSIMs, plus a roaming-rates-by-destination grid.
- **Mobile & broadband** plan listings and a **travel & roaming** detail page.
- **Mock authentication** — sign in with any credentials (demo mode); a signed HTTP-only cookie
  (`jose`, HS256) drives a `middleware.ts`-protected `(app)` area.
- **My Spark account** — overview dashboard (data usage, next bill, active add-ons), usage table,
  billing history, plan switcher, add-on connect/disconnect toggles, and settings.
- **Local JSON persistence** — API route handlers read/write `data/*.json` with atomic writes.
- **Tests** — Vitest + RTL (formatters, session encode/decode, the `PromoCard` component, and the
  `/api/addons` GET/POST route) and a Playwright "computer-vision" walkthrough recorder.

## 🧱 Tech stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v3 · shadcn-style Radix
primitives · `react-hook-form` + `zod` · `jose` mock sessions · Vitest + Testing Library ·
Playwright. Consumes the shared `@demo/ui` package (`cn` class merger) like the other apps in this
monorepo.

## 🚀 Getting started

```bash
# from the repo root
pnpm install

# run the Spark app (http://localhost:3000)
pnpm dev:spark

# or from this folder
pnpm dev
```

> ℹ️ naukri and seek also default to port 3000 — run Spark on another port with
> `PORT=3002 pnpm --filter spark-nz-demo dev` if you need them side by side.

### Demo credentials

Any email and password work. The login form is pre-filled with:

- **Email:** `you@example.co.nz`
- **Password:** `demo`

## 📁 Project structure

```
apps/spark/
├── app/
│   ├── (marketing)/                     # public shop
│   │   ├── page.tsx                     # home
│   │   ├── mobile/  broadband/  roaming/
│   │   ├── shop/promotions/travel-and-move/   # ← hero page
│   │   └── legal/[slug]/
│   ├── (auth)/login|register/           # Spark ID mock auth
│   ├── (app)/                           # My Spark (protected)
│   │   ├── dashboard/ usage/ bills/ plan/ addons/ settings/
│   └── api/                             # auth, addons, plan, settings route handlers
├── components/  (ui/ layout/ promotions/ plans/ addons/ usage/ bills/ roaming/ marketing/)
├── lib/         (auth/ data/ types/ utils/ constants/ content/ validation)
├── content/legal/                       # markdown legal pages
├── data/*.json                          # seed + runtime store
├── public/brand/                        # Spark logos, favicon, manifest
└── scripts/fetch-brand-assets.sh        # re-fetch official logos
```

## 🔌 How persistence works

API route handlers under `app/api/*` read and write JSON files in `data/` via
`lib/data/store.ts`, which serialises to a temp file and atomically renames over the target.
Toggling an add-on or switching a plan updates `data/account.json`; saving settings updates
`data/settings.json`.

## 🎨 Brand assets

Run `scripts/fetch-brand-assets.sh` to (re)download the official Spark wordmark SVGs into
`public/brand/`. The favicon and app icon are hand-authored purple "spot" glyphs. Assets are always
self-hosted — never hot-linked at runtime.

## 🧪 Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint (next lint) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit/route/component tests |
| `pnpm video` | Record the Playwright walkthrough (needs a running server + Chromium) |
