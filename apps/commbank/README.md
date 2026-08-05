# CommBank website demo (unofficial)

Vite + React 19 look-alike of [commbank.com.au](https://www.commbank.com.au/) for demos and
codebase exploration. **Not affiliated with, endorsed by, or connected to Commonwealth Bank of
Australia.** Every balance, transaction, rate and payee in this app is fictional, there is no
backend, and no money can be moved.

## Quick start

```bash
# from the monorepo root
pnpm install
pnpm dev:commbank    # http://localhost:5179
```

Demo credentials (any client number and password work — the fields are pre-filled):
`12345678` / `demo1234`

## What's here

The public site mirrors the structure of commbank.com.au: the seven primary nav hubs, product
detail pages, rate tables, working calculators, support and security, and a branch locator. Behind
the mock log on there is a NetBank dashboard with accounts, transactions, transfers, payments,
cards and CommBank Yello.

### Routes

| Route                                           | Mirrors                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `/`                                             | commbank.com.au homepage — hero carousel and the five-column quick-link grid |
| `/banking`                                      | `/banking.html`                                                              |
| `/bank-accounts`                                | `/bank-accounts.html`                                                        |
| `/credit-cards`                                 | `/credit-cards.html`                                                         |
| `/personal-loans`                               | Personal loans & car loans                                                   |
| `/travel`                                       | Travel & international money                                                 |
| `/home-loans`                                   | `/home-loans.html`                                                           |
| `/home-loans/types`                             | `/home-loans/types.html`                                                     |
| `/home-loans/rates`                             | Home loan interest rates                                                     |
| `/insurance`                                    | `/insurance.html`                                                            |
| `/investing-and-super`                          | `/investing-and-super.html`                                                  |
| `/business`                                     | `/business.html`, including the business product selector                    |
| `/institutional`                                | `/institutional.html`                                                        |
| `/commbank-yello`                               | `/commbank-yello.html`                                                       |
| `/digital-banking`                              | `/digital-banking.html`                                                      |
| `/digital-banking/netbank`                      | `/digital-banking/netbank.html`                                              |
| `/digital-banking/app`                          | CommBank app                                                                 |
| `/rates-and-fees`                               | Rates & fees                                                                 |
| `/tools-and-calculators`                        | Calculators hub (all four calculators actually compute)                      |
| `/support`                                      | `/support.html` — searchable FAQs with category chips                        |
| `/support/contact-us`                           | `/support/contact-us.html`                                                   |
| `/support/security`                             | CommBank Safe                                                                |
| `/locate-us`                                    | Branch and ATM locator with suburb/state/type filters                        |
| `/about-us`, `/careers`                         | Corporate                                                                    |
| `/newsroom`, `/newsroom/:slug`                  | Newsroom index and article                                                   |
| `/important-info`, `/privacy`, `/accessibility` | Legal                                                                        |
| `/search`                                       | Site search across products, FAQs, articles and locations                    |
| `/products/:slug`                               | Generic product detail for all 26 products                                   |
| `/login`, `/register`                           | NetBank log on and registration                                              |
| `/netbank`                                      | Accounts overview, spend breakdown, Yello tier                               |
| `/netbank/accounts/:accountId`                  | Account detail with transaction search and category filter                   |
| `/netbank/transfer`                             | Transfer between accounts — mutates balances                                 |
| `/netbank/pay`                                  | Pay anyone / BPAY against saved payees                                       |
| `/netbank/cards`                                | Lock and unlock cards                                                        |
| `/netbank/yello`                                | Tier progress and activatable offers                                         |
| `/netbank/settings`                             | Notification toggles, customer details, demo data reset                      |

### Calculators

All four compute for real, in `src/lib/calculators.ts`:

- **Home loan repayments** — amortising P&I or interest-only, weekly / fortnightly / monthly, with
  an LVR readout and an LMI warning above 80%
- **Borrowing power** — monthly surplus capitalised at the product rate plus a 3.00% serviceability
  buffer
- **Savings goal** — monthly compounding with end-of-month contributions
- **Foreign exchange** — 16 currencies over a static indicative board rate table

## Persistence

There is no database. Sessions are a base64 JSON blob in `localStorage`, and accounts,
transactions and card lock states are stored under `commbank-demo-*` keys. Transfers and payments
mutate that state, so the demo shows real balance movement. Reset it from
`/netbank/settings` or by clearing browser storage.

Login is intentionally mock — any credentials are accepted, matching the convention across every
app in this monorepo.

## Brand assets

`public/brand/` holds self-hosted CommBank artwork; nothing is hotlinked. The canonical asset is
`https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg`, but commbank.com.au is
unreachable from the restricted build environment, so the same artwork is pulled from public
mirrors. Every source URL is recorded in `public/brand/brand-assets.json`, and
`pnpm brand` re-fetches them.

| File             | Use                                                                  |
| ---------------- | -------------------------------------------------------------------- |
| `logo.svg`       | Full lockup — black wordmark plus yellow diamond, used in the header |
| `logo-white.svg` | Reversed lockup for the black footer and NetBank header              |
| `diamond.svg`    | Flat mark for compact use                                            |
| `favicon.svg`    | Gradient diamond, used as the browser favicon                        |

Palette (`src/index.css` `@theme`): CommBank yellow `#fecb26` sampled from the official logo,
bright yellow `#ffcc00`, black `#000000`, plus the ink, surface and tone ramps.

## Scripts

| Script           | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Vite on 5179                               |
| `pnpm build`     | `tsc -b` then production build             |
| `pnpm test`      | Vitest unit suite                          |
| `pnpm test:tz`   | The same suite under six timezones         |
| `pnpm lint`      | ESLint                                     |
| `pnpm typecheck` | `tsc -b --noEmit`                          |
| `pnpm brand`     | Re-fetch brand assets into `public/brand/` |

`pnpm test:tz` exists because transactions, articles and customer records are date-only
`YYYY-MM-DD` values. Mixing UTC and local handling of those is correct exactly at UTC+0
and wrong either side of it, so a UTC-only run is blind to it — which is how an earlier
revision shipped transaction dates that were a day out in Sydney and Los Angeles. The
matrix spans UTC+14 (Kiritimati) to UTC−11 (Midway).

`PROMPT.md` holds the build spec this app was generated from.
