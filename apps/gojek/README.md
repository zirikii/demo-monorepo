# Gojek Tech website demo (unofficial)

Look-alike of [gojek.io](https://www.gojek.io/) — the Gojek Tech / Super App engineering site — plus a mock applicant portal.

**This is an unofficial demo. It is not affiliated with, endorsed by, or connected to Gojek, GoTo Group, or PT Gojek Indonesia.**

## What you get

- Dark typographic marketing site matching gojek.io: hero, impact stats, product category tabs, open-source grid, tech facts
- About us, Life@Gojek, Blogs & News, Join us / careers, Products, Open source
- Mock login (any credentials) and an applicant portal (applications, saved jobs, OSS watchlist, settings)
- Official Solv + wordmark lockup self-hosted under `public/brand/` (source: the gojek.io header SVG)

## Setup

From the monorepo root:

```bash
pnpm install
pnpm dev:gojek
```

App URL: [http://localhost:5184](http://localhost:5184)

No `.env.local` is required. Copy `.env.example` if you want to override names.

## Demo credentials

Any email / password works. The login form is prefilled with:

| Field    | Value           |
| -------- | --------------- |
| Email    | `demo@gojek.io` |
| Password | `demo`          |

Signup writes the profile to `localStorage` (seed list lives in `src/data/users.json`).

## Scripts

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `pnpm dev`        | Vite on port 5184                     |
| `pnpm test`       | Vitest                                |
| `pnpm lint`       | ESLint                                |
| `pnpm typecheck`  | `tsc -b --noEmit`                     |
| `pnpm build`      | Typecheck + production bundle         |
| `pnpm brand`      | Re-attempt public logo mirrors        |

## Persistence

All writes stay in the browser (`localStorage` keys prefixed `gojek-demo-`). There is no database, no Greenhouse, no GitHub OAuth, and no payment stack.

## Structure

```
src/
  pages/           marketing + portal routes
  components/      brand, layout, marketing, careers, ui
  data/            products, jobs, posts, OSS, culture copy
  lib/             auth, applications, settings, formatters
  content/         markdown landing / legal copy
public/brand/      official lockup + Solv favicon
```
