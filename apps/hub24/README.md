# HUB24 website demo

Unofficial look-alike of [hub24.com.au](https://www.hub24.com.au/) plus mock **AdviserHUB**, **InvestorHUB** and **ManagerHUB** portals.

**Not affiliated with HUB24 Limited or its subsidiaries.** Dummy data only. Not an offer of financial products and not the real HUB24, Class or myprosperity services.

## Setup

From the monorepo root:

```bash
pnpm install
pnpm dev:hub24
```

The Vite app listens on **http://localhost:5181**.

`.env.local` is optional. Copy `.env.example` if you want to override the public app name.

## Demo credentials

Login accepts **any** email and password. The form is pre-filled with:

| Portal | Email | Password |
| --- | --- | --- |
| AdviserHUB | `adviser@hub24.demo` | `demo` |
| InvestorHUB | `investor@hub24.demo` | `demo` |
| ManagerHUB | `manager@hub24.demo` | `demo` |

## What’s in here

- Marketing site: home (audience picker), advisers / private wealth / licensees / investment managers / clients, features, Super / Invest / Pension, Private Invest, Class, myprosperity, resources, CPD, documents, news, about, careers, contact, BDM team, Shareholder Centre, legal
- Mock portals with a 28-account Harbourline book, managed portfolios and orders
- Self-hosted wordmarks in `public/brand/` (official WP SVGs are fetched when the network allows — see `scripts/fetch-brand-assets.sh`)

Persistence is **localStorage** only (`hub24-demo-session`, contact enquiries, settings toggles).

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server on 5181 |
| `pnpm test` | Vitest |
| `pnpm lint` | ESLint |
| `pnpm build` | `tsc -b` + Vite production build |
| `pnpm brand` | Re-fetch official logos if hub24.com.au is reachable |

## Brand tokens

Navy + teal live in `src/index.css` `@theme` (`hub-navy-deep`, `hub-teal`, …). Do not copy another app’s palette into this one.
