# HUB24 website demo

An unofficial, look-alike clone of [hub24.com.au](https://www.hub24.com.au/) built with Vite,
React 19, TypeScript and Tailwind CSS v4. It covers the audience-segmented marketing site
(advisers, private wealth, licensees, investment managers, advised clients), the Platform
Features & Benefits section, the product catalogue, Insights, CPD education, product documents,
About us and the Shareholder Centre — plus two mock portals behind a simulated login:
**InvestorHUB** for advised clients and **AdviserHUB** for advisers.

> **Not affiliated with, endorsed by, or connected to HUB24 Limited (ABN 87 124 891 685,
> ASX:HUB) or any of its subsidiaries.** Every account, holding, transaction, client, adviser,
> leader, job and announcement in this build is invented. Nothing is transmitted anywhere — all
> state lives in your browser.

## Getting started

```bash
pnpm install       # from the monorepo root
pnpm dev:hub24
```

The dev server runs on <http://localhost:5181>. No environment variables are required.

| Script           | What it does                                |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Vite dev server on port 5181                |
| `pnpm build`     | Typecheck then production build             |
| `pnpm preview`   | Serve the production build on port 5181     |
| `pnpm lint`      | ESLint across the app                       |
| `pnpm typecheck` | `tsc -b --noEmit`                           |
| `pnpm test`      | Vitest unit and component suites            |
| `pnpm brand`     | Re-fetch brand artwork into `public/brand`  |

## Demo credentials

The login form is pre-filled for whichever portal you pick, and all three accounts are listed
on the page.

| Portal      | Email                     | Password      | Lands on       |
| ----------- | ------------------------- | ------------- | -------------- |
| InvestorHUB | `investor@hub24.com.au`   | `invest2026`  | `/investorhub` |
| AdviserHUB  | `adviser@hub24.com.au`    | `advice2026`  | `/adviserhub`  |
| ManagerHUB  | `manager@hub24.com.au`    | `manager2026` | `/adviserhub`  |

Unlike some of the other demos in this monorepo, the password is checked — a wrong password is
rejected rather than waved through.

## Routes

**Marketing** (paths mirror hub24.com.au where they are known)

`/` · `/hub24-for-advisers/` · `/hub24-for-brokers/` · `/hub24-for-advised-clients/` ·
`/hub24-for-investment-managers/` · `/hub24-for-licensees/` · `/features-benefits/` ·
`/features-benefits/investment-menu/` · `/discover/` · `/products-solutions/` ·
`/product/:slug/` · `/insights/` · `/insights/:slug/` · `/cpd-education/` ·
`/product-documents/` · `/awards/` · `/about-us/` · `/about-us/leadership/` ·
`/about-us/careers/` · `/about-us/careers/:id/` · `/about-us/sustainability/` · `/group/` ·
`/contact-us/` · `/contact-us/find-a-bdm/` · `/search` · `/legal/:slug` · `/login`

**Shareholder Centre**

`/shareholder-centre/overview/` · `/shareholder-centre/asx-announcements/` ·
`/shareholder-centre/financial-results/` · `/shareholder-centre/share-price/` ·
`/shareholder-centre/corporate-governance/`

**InvestorHUB** (requires a session)

`/investorhub` · `/investorhub/portfolio` · `/investorhub/managed-portfolios` ·
`/investorhub/transactions` · `/investorhub/super` · `/investorhub/reports` ·
`/investorhub/documents` · `/investorhub/settings`

**AdviserHUB** (requires a session)

`/adviserhub` · `/adviserhub/clients` · `/adviserhub/clients/:id` · `/adviserhub/trading` ·
`/adviserhub/portfolios` · `/adviserhub/reports` · `/adviserhub/practice`

Anonymous visits to a portal route redirect to `/login?redirect=…`. Thirteen product pages are
generated from one template: HUB24 Invest, HUB24 Super, Managed Portfolios, SMSF Access, Private
Invest, Engage, InvestorHUB, AdviserHUB, ManagerHUB, HUB24 Discover, HUBconnect and Class.

## Trading

`/adviserhub/trading` is the one surface that mutates state. Placing a buy or sell against a
client account:

- validates the order (whole units, enough cash including brokerage, enough units to sell)
- moves cash, creates or adjusts the holding at a weighted-average cost, and writes a transaction
- persists the result to `localStorage`, so InvestorHUB immediately reflects it

Brokerage is 11 basis points with a $12.50 minimum. Reset everything from
`/investorhub/settings`.

## Structure

```
src/
  components/
    brand/    BrandLogo — the self-hosted lockup in both treatments
    layout/   SiteHeader with mega-menus, SiteFooter, PageHero, Section, CookieBanner
    marketing/ StatBand, PillarGrid, CheckList, CtaBand, LogoWall, PortfolioMockup, ShareholderNav
    portal/   PortalLayout, RequireAuth, StatTile, PanelCard, AllocationChart, PerformanceChart
    ui/       Button, Card, Badge, Field, Tabs, Accordion, DataTable, Stat, Toggle, ProgressBar
  data/       Seed modules — nav, audiences, products, insights, documents, awards, company,
              shareholder, platform, testimonials, site
  hooks/      useAuth (mock session), usePortfolio (mutable holdings), useDocumentTitle
  lib/        auth, cn, format, portfolio, search, storage
  pages/      Marketing pages plus pages/shareholder/*, pages/investorhub/*, pages/adviserhub/*
  test/       Vitest suites (format, auth, portfolio maths, data integrity, components, pages, portals)
```

## Persistence

There is no database and no API. Four things are written to `localStorage`:

- `hub24-demo-session` — the base64 mock session
- `hub24-demo-portfolio` — accounts, holdings and transactions after any trade
- `hub24-demo-settings` — the notification toggles on `/investorhub/settings`
- `hub24-demo-cookie-consent` — the cookie-banner acknowledgement

Everything else is in-memory and resets on reload. Clearing site data resets the demo
completely.

## Brand assets

`public/brand/` holds the wordmark in both treatments, a square mark, a favicon and
`brand-assets.json`, which records provenance. `hub24.com.au` is outside the network allowlist
of the environment this was authored in, so every SVG was hand-authored to approximate the HUB24
lockup. Run `pnpm brand` from an unrestricted network to replace `logo-dark.svg` and
`logo-light.svg` with the official artwork from:

- <https://www.hub24.com.au/wp-content/uploads/2021/10/hub24-logo-dark.svg>
- <https://www.hub24.com.au/wp-content/uploads/2021/10/hub24-logo-light.svg>

HUB24's brand face is a commercial geometric sans; this build approximates it with the
open-source **Outfit** for display type and **Inter** for body copy.

## Design tokens

Defined in `src/index.css` with Tailwind v4's CSS-first `@theme`. The exact HUB24 palette is not
published outside its internal design system, so these are an approximation of the navy-and-teal
identity rather than a token export.

| Token                    | Value     | Used for                              |
| ------------------------ | --------- | ------------------------------------- |
| `--color-h24-navy`       | `#0b2545` | Header utility bar, heroes, footer    |
| `--color-h24-navy-deep`  | `#071a33` | Footer base                           |
| `--color-h24-teal`       | `#00a3a1` | Primary accent, CTAs, chart series    |
| `--color-h24-teal-dark`  | `#007e7c` | Hover states and link text            |
| `--color-h24-teal-bright`| `#21c9c0` | Reversed accent on navy               |
| `--color-h24-aqua`       | `#7fe3dc` | Eyebrows and secondary chart series   |
| `--color-h24-tint`       | `#e6f6f5` | Soft surfaces, badges, active nav     |
| `--color-ink`            | `#1f2933` | Body text                             |

## Figures

Headline numbers on the marketing pages and in the Shareholder Centre reproduce publicly
reported HUB24 Group figures (FY26 total FUA of $164.3b, platform FUA of $139.5b, net inflows of
$18.9b, 5,649 active advisers). Everything inside the portals — accounts, holdings, models,
clients, performance and the share price series — is invented.
