# hub24 — HUB24 website demo (unofficial)

A Vite + React 19 + TypeScript clone of [hub24.com.au](https://www.hub24.com.au/) — the public
marketing site plus a mock **AdviserHUB** platform behind a demo login.

> **Unofficial demo.** This app is not affiliated with, endorsed by, or connected to HUB24
> Limited (ASX:HUB) or any HUB24 Group company. Every client, portfolio, document, announcement
> and figure in it is fictional demo data. Nothing here is financial product advice.

## Run it

```bash
pnpm install          # from the repo root
pnpm dev:hub24        # http://localhost:5181
```

Other scripts (run from `apps/hub24` or with `pnpm --filter hub24-website-demo <script>`):

| Script               | What it does                                |
| -------------------- | ------------------------------------------- |
| `dev`                | Vite dev server on port 5181                |
| `build`              | `tsc -b` then `vite build`                  |
| `preview`            | Serve the production build on 5181          |
| `test`               | Vitest suite (jsdom)                        |
| `lint` / `typecheck` | ESLint 9 flat config / `tsc --noEmit`       |
| `brand`              | Re-fetch brand artwork into `public/brand/` |

## Demo credentials

The login form is pre-filled for whichever portal you pick and accepts only these accounts:

| Portal          | Email                   | Password       |
| --------------- | ----------------------- | -------------- |
| AdviserHUB      | `adviser@hub24.com.au`  | `platform2026` |
| InvestorHUB     | `investor@hub24.com.au` | `invest2026`   |
| Licensee portal | `licensee@hub24.com.au` | `licensee2026` |

Sessions are base64-encoded JSON in `localStorage` — obfuscation for a demo, not security.
All three accounts land on `/adviserhub`.

## Routes

**Marketing**

| Route                                  | Page                                                                                                                                                           |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                    | Home — hero, platform stats, audience cards, products, awards, insights, shareholder teaser                                                                    |
| `/products-solutions`                  | Product catalogue with category filter                                                                                                                         |
| `/product/:slug`                       | 12 product pages (HUB24 Invest, Super, Discover, Private Invest, SMSF Access, managed portfolios, Engage, HUBconnect, Class, NowInfinity, myprosperity, myhub) |
| `/features-benefits`                   | 10 productivity features + Discover/Core/Choice menu comparison                                                                                                |
| `/solutions/:slug`                     | Advisers, licensees, private wealth, advised clients, investment managers, accountants                                                                         |
| `/insights`, `/insights/:slug`         | Insight index with category filter, plus article pages                                                                                                         |
| `/education`                           | CPD catalogue                                                                                                                                                  |
| `/product-documents`                   | Searchable PDS/TMD/guide/form library                                                                                                                          |
| `/about-us`, `/leadership`, `/careers` | Company pages                                                                                                                                                  |
| `/shareholder-centre`                  | Demo share price, ASX announcements, key dates, registry                                                                                                       |
| `/contact-us`                          | Phone numbers, BDM list, offices, validated enquiry form                                                                                                       |
| `/scam-alert`, `/faqs`, `/legals/:doc` | Support and legal pages                                                                                                                                        |
| `/login`                               | Portal login                                                                                                                                                   |

**AdviserHUB** (all behind `RequireAuth`, redirecting to `/login?redirect=…`)

| Route                                                    | Screen                                                                             |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `/adviserhub`                                            | Practice dashboard — FUA trend, exposure donut, top clients, tasks                 |
| `/adviserhub/clients`, `/adviserhub/clients/:id`         | Client list with filters; client detail with per-account holdings and transactions |
| `/adviserhub/portfolios`, `/adviserhub/portfolios/:slug` | Managed portfolio models and model detail                                          |
| `/adviserhub/trading`                                    | Trade ticket with live pre-trade CGT estimate, plus the blotter                    |
| `/adviserhub/reporting`                                  | Engage-style report builder with live presentation preview                         |
| `/adviserhub/applications`                               | Application pipeline with progress tracking                                        |
| `/adviserhub/settings`                                   | Profile, notification toggles, defaults, security                                  |

## Structure

```
src/
  components/
    adviser/     AdviserLayout, RequireAuth, PanelCard, StatTile
    brand/       BrandLogo (live-text HUB24 wordmark)
    layout/      SiteHeader (mega menus), SiteFooter, PageHero, Section, ScamAlertBar, CookieBanner
    marketing/   StatBand, AwardStrip, MenuComparison, PlatformMockup, ContactForm, cards
    ui/          Button, Card, Badge, Tabs, Accordion, DataTable, Field, DonutChart, TrendChart, …
  data/          site, nav, products, solutions, features, insights, documents, company, adviser
  hooks/         useAuth, useDocumentTitle
  lib/           auth, cn, format, storage
  pages/         marketing pages + pages/adviser/* platform screens
  test/          Vitest suites
```

## Design tokens

Everything visual is declared in `@theme` in `src/index.css`: HUB24 blue (`--color-hub-blue`
`#0057b8`), teal secondary (`--color-hub-teal` `#00a3ad`), navy surfaces (`--color-hub-navy`
`#06263f`), ink/surface/line neutrals, semantic tones, `radius-hub-*`, `shadow-hub-*` and the
`hub-rise` / `hub-fade` animations. Use the utility names (`bg-hub-navy`, `text-hub-teal-dark`,
`rounded-hub-lg`) rather than raw hex.

hub24.com.au and its design system are unreachable from the restricted build environment, so
these values approximate the public palette (blue primary, teal secondary, dark blue surfaces)
rather than mirroring exported tokens.

## Brand assets

`public/brand/` holds `hub24-logo-dark.svg`, `hub24-logo-light.svg`, `mark.svg` and
`favicon.svg`, with provenance recorded in `public/brand/brand-assets.json`. The official
artwork at `https://www.hub24.com.au/wp-content/uploads/2021/10/hub24-logo-{light,dark}.svg`
could not be downloaded from this environment, so the committed files are hand-authored
stand-ins. Run `pnpm --filter hub24-website-demo brand` on an unrestricted network to replace
them. Nothing is hotlinked.

## Data and persistence

No database, no API, no network calls. Content lives in typed modules under `src/data`, and the
only writes are `localStorage`: the demo session, the cookie-notice flag, and AdviserHUB
settings preferences.

## Tests

`pnpm --filter hub24-website-demo test` runs six Vitest suites covering formatters, the mock
session and credential handling, data integrity (unique slugs, resolvable nav links, portfolio
weights summing to 100), component behaviour and accessibility state, marketing page rendering
and filtering, and the AdviserHUB flows (auth redirect, login, account switching, pre-trade CGT
estimate, cash validation).
