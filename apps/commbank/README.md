# CommBank website demo (unofficial)

A Vite + React 19 clone of [commbank.com.au](https://www.commbank.com.au/), built as a UI/UX
fidelity demo inside the `demo-monorepo` pnpm workspace. It reproduces the public marketing site —
the seven-item mega nav, product hubs, rate tables, calculators, support and legal pages — plus a
mock **NetBank** where you can log on, browse accounts, and actually move money between them.

> **Unofficial demo.** Not affiliated with, endorsed by, or connected to the Commonwealth Bank of
> Australia. Every rate, fee, product detail, branch, article and customer record is fabricated.
> No real banking, credit, payment or identity service is involved.

## Getting started

```bash
pnpm install          # from the repo root
pnpm dev:commbank     # http://localhost:5179
```

No environment variables are required. `.env.example` documents the optional `VITE_*` values.

### Demo credentials

Log on at `/logon`. **Any client number and password are accepted** — the form comes pre-filled:

| Field         | Value      |
| ------------- | ---------- |
| Client number | `12345678` |
| Password      | `demo`     |

The same demo mode applies to `/register`, which logs you straight in.

## Routes

**Marketing**

| Route                                                     | Page                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| `/`                                                       | Homepage — hero, quick links, product grid, Yello, app, news  |
| `/banking`                                                | Banking hub                                                   |
| `/banking/bank-accounts`                                  | Everyday accounts with a fee comparison table                 |
| `/banking/savings-accounts`                               | Savings accounts, Term Deposit rates, savings goal calculator |
| `/banking/credit-cards`                                   | Credit card comparison with a category filter and fee table   |
| `/banking/personal-loans`                                 | Personal and car loans with a repayments calculator           |
| `/banking/international-travel`                           | Travel products and the foreign exchange calculator           |
| `/home-loans`                                             | Home loans hub, life stages, FAQs                             |
| `/home-loans/rates`                                       | Variable and fixed rate tables by loan purpose                |
| `/home-loans/calculator`                                  | Repayments calculator                                         |
| `/insurance`                                              | Home, landlord, car, travel, life and pet insurance           |
| `/investing-and-super`                                    | CommSec, ETFs, managed funds, Essential Super                 |
| `/business`                                               | Business banking with a product category filter               |
| `/institutional`                                          | Institutional banking and markets                             |
| `/commbank-yello`                                         | Yello tiers, eligibility and benefits                         |
| `/digital-banking`                                        | Digital banking hub                                           |
| `/digital-banking/netbank`                                | NetBank marketing page                                        |
| `/digital-banking/app`                                    | CommBank app marketing page                                   |
| `/products/interest-rates-and-fees`                       | Consolidated rates and fees                                   |
| `/tools-and-calculators`                                  | All four calculators on one page                              |
| `/support`                                                | Searchable FAQs with category filters                         |
| `/locate-us`                                              | Branch and ATM finder                                         |
| `/security`                                               | CommBank Safe — protections and scam signs                    |
| `/about-us`, `/careers`                                   | About and careers                                             |
| `/newsroom`, `/newsroom/:slug`                            | Newsroom index and article detail                             |
| `/search`                                                 | Site-wide search results                                      |
| `/important-info`, `/privacy`, `/terms`, `/accessibility` | Legal pages                                                   |

**Auth and NetBank** (all `/netbank/*` routes redirect to `/logon?redirect=…` when logged off)

| Route                   | Page                                                       |
| ----------------------- | ---------------------------------------------------------- |
| `/logon`                | Log on with NetBank / CommBiz / CommSec tabs               |
| `/register`             | Register for NetBank                                       |
| `/netbank`              | Dashboard — net position, account tiles, recent activity   |
| `/netbank/accounts/:id` | Account detail with transaction search and category filter |
| `/netbank/transfer`     | Transfer money between accounts                            |
| `/netbank/payees`       | Payees and BPAY billers                                    |
| `/netbank/cards`        | Card controls — lock, block international, travel notice   |
| `/netbank/statements`   | Statement list                                             |
| `/netbank/yello`        | Yello hub with tier progress and activatable offers        |
| `/netbank/settings`     | Notification, display and statement settings, demo reset   |

## What actually works

These are real, not screenshots:

- **Home loan repayments calculator** — standard amortisation with weekly, fortnightly and monthly
  frequencies plus an interest-only mode.
- **Borrowing power calculator** — serviceability at an assessment rate above the advertised rate.
- **Savings goal calculator** — monthly compounding, splitting contributions from interest.
- **Foreign exchange calculator** — 10 currencies with a retail margin on the mid-market rate.
- **Branch and ATM locator** — search plus state, type and service filters over 27 locations.
- **Support FAQ search** and **site-wide search** over an index built from the product data.
- **NetBank transfer** — validates against the available balance, updates both accounts, and
  appends a transaction to each side.
- **Card controls** — lock, block international and travel notice toggles, persisted per card.

## Persistence

There is no database and no API server. Everything lives in `localStorage`:

| Key                          | Contents                          |
| ---------------------------- | --------------------------------- |
| `commbank-demo-session`      | Base64-encoded mock session       |
| `commbank-demo-accounts`     | Account balances                  |
| `commbank-demo-transactions` | Transaction history               |
| `commbank-demo-cards`        | Card toggle states                |
| `commbank-demo-settings`     | Notification and display settings |
| `commbank-demo-yello-offers` | Activated Yello offers            |
| `commbank-demo-cookies`      | Cookie-notice dismissal           |

Reset the account data from `/netbank/settings`, or clear site data to reset everything.

## Structure

```
src/
  components/
    brand/     CommBankLogo (inline SVG diamond + Inter wordmark)
    layout/    SiteHeader (mega nav), SiteFooter, PageHero, Breadcrumb, PageLayout
    ui/        Button, Badge, Card, Accordion, Tabs, RateTable, Field, EmptyState
    home/      Homepage sections
    products/  ProductCard
    tools/     Repayment, borrowing power, savings goal, FX, branch locator
    netbank/   NetBankLayout, AccountTile, TransactionList
    marketing/ HelpSection, ThingsYouShouldKnow, FeedbackBar, CookieBanner
  data/        Products, rates, branches, FAQs, articles, Yello, NetBank seed data
  hooks/       useAuth, useBanking, useDocumentTitle
  lib/         auth, calculators, format, search, storage, cn
  pages/       Marketing pages, products/, netbank/
  test/        Vitest suites
```

## Brand assets

`public/brand/` contains `logo.svg`, `logo-reversed.svg`, `diamond.svg`, `favicon.svg` and a
`brand-assets.json` manifest.

The cloud environment this was built in does not allowlist `commbank.com.au`, so the official
`commBank-logo.svg` could not be downloaded. The committed files are **vector reproductions** built
from the published web brand guidelines (yellow `#FFCC00`, black `#000000`) and the 2020 identity
refresh that retired the black corner stripe and the conjoined `mm` ligature. Run
`scripts/fetch-brand-assets.sh` from a network where the host is reachable to swap in the official
asset, then flip the `origin` field in the manifest.

## Design tokens

Tailwind v4 `@theme` in `src/index.css`, no `tailwind.config`:

| Token                       | Value     |
| --------------------------- | --------- |
| `--color-cba-yellow`        | `#FFCC00` |
| `--color-cba-yellow-bright` | `#FFD84D` |
| `--color-cba-yellow-deep`   | `#E5B300` |
| `--color-black`             | `#000000` |
| `--color-ink`               | `#23201F` |
| `--color-line`              | `#E3E3E3` |
| `--color-positive`          | `#008A00` |
| `--color-alert`             | `#D0021B` |

Font is self-hosted Inter via `@fontsource/inter` — no Google Fonts links.

## Scripts

| Script           | What it does                                |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Vite dev server on 5179                     |
| `pnpm build`     | `tsc -b && vite build`                      |
| `pnpm preview`   | Preview the production build                |
| `pnpm lint`      | ESLint                                      |
| `pnpm typecheck` | `tsc -b --noEmit`                           |
| `pnpm test`      | Vitest (63 tests)                           |
| `pnpm shots`     | Playwright vision screenshots into `shots/` |
| `pnpm video`     | Playwright walkthrough recording            |

`pnpm shots` and `pnpm video` need Chromium: `pnpm exec playwright install chromium`.

## Accessibility

Skip link on every page, `aria-expanded` on menus and disclosures, `aria-pressed` on filter chips,
`role="switch"` with `aria-checked` on toggles, `aria-current` on the active NetBank nav item,
scoped table headers with captions, visible focus rings, and live regions announcing calculator
results and filter counts.
