# Build CommBank Demo — Full commbank.com.au Website Clone

## Mission

Scaffold a production-quality **commbank.com.au** website clone for demo purposes that looks and
feels like the real Commonwealth Bank of Australia site at https://www.commbank.com.au/. This is a
UI/UX fidelity demo, not a production banking app: dummy data, mock auth, local TypeScript data
modules. No real external services, no real money movement.

**Deliverable:** a single PR against `main` with a complete, lint-clean, build-passing codebase
under `apps/commbank/` in this pnpm monorepo. Run via `pnpm install && pnpm dev:commbank`.

**Monorepo alignment (required):** follow the same conventions as `apps/changi`, `apps/nine`, and
`apps/squiz`:

- Vite + React 19 + TypeScript + Tailwind v4 (CSS-first `@theme`, no `tailwind.config`)
- Depend on `@demo/ui` via `workspace:*`; re-export `cn` from `@demo/ui/cn`; show `<DemoRibbon />`
  in the header
- Scripts: `dev`, `build`, `lint`, `typecheck`, `test` (Vitest), `video` + `shots` (Playwright)
- Wire root `package.json` with `dev:commbank` / `build:commbank`; update root `README.md` and
  `AGENTS.md`
- Default port **5179** (avoid colliding with kddi 5173 / paytm 5174 / squiz 5175 / changi 5176 /
  nine 5177 / optus 5178)
- Package name: `commbank-website-demo`

## Company profile

- **Product:** commbank.com.au — Australia's largest retail bank. Public marketing site for
  everyday banking, home loans, credit cards, insurance, investing & super, business and
  institutional banking, plus the NetBank secure customer portal.
- **Primary users:** Australian retail customers researching accounts, cards, and home loans, and
  existing customers logging on to NetBank to check balances, transfer money, and manage cards.
- **Core surfaces to clone:** homepage hero + product grid, the seven-item primary nav with mega
  menus (Banking, Home loans, Insurance, Investing & Super, Business, Institutional, CommBank
  Yello), the Log on menu (NetBank / CommBiz / CommSec), product hubs and detail pages, rates and
  fees tables, tools & calculators, support, locate us, newsroom, legal pages, and a mock NetBank
  dashboard.
- **Dummy-data theme:** realistic Australian retail-banking copy — Smart Access, NetBank Saver,
  GoalSaver, Term Deposits, CommBank Neo, Low Rate / Low Fee / Awards / Smart Awards / Ultimate
  Awards credit cards, Digi Home Loan, Standard Variable Rate, Simple Home Loan, Wealth Package,
  Business Transaction Account, Smart EFTPOS terminal, Business Overdraft, CommBank Yello tiers.
  Never lorem ipsum.

## Repo context

- Repo: `demo-monorepo` (pnpm workspace, `apps/*` + `packages/ui`)
- New app under `apps/commbank/` — do not dump at repo root, do not modify other apps.

## Target tech stack

| Layer         | Technology                                          |
| ------------- | --------------------------------------------------- |
| Framework     | Vite 6 + React 19 + React Router 7                  |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`) via `@theme`  |
| Components    | Custom primitives + `lucide-react` icons            |
| Shared        | `@demo/ui` (`cn`, `DemoRibbon`)                     |
| Fonts         | `@fontsource/inter` (self-hosted, no Google Fonts)  |
| Forms         | `react-hook-form` + `zod` via `@hookform/resolvers` |
| State         | React context + hooks                               |
| Data          | Local TypeScript data modules                       |
| Auth          | Mock session in `localStorage` + route guards       |
| Tests         | Vitest + React Testing Library (jsdom)              |
| Video / shots | Playwright walkthrough + vision screenshots         |
| Lint/format   | ESLint 9 flat config + Prettier                     |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payment providers.

## Brand assets

The build environment has restricted egress and `commbank.com.au` is not in the network allowlist,
so the official SVG at `https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg` cannot
be downloaded during the run. Reproduce the mark faithfully as vector art committed under
`public/brand/`, and ship `scripts/fetch-brand-assets.sh` so the real asset can be pulled in an
allowlisted environment.

**Required files in `public/brand/`:**

- `logo.svg` — black diamond with the yellow inner wedge plus the `CommBank` wordmark (light
  backgrounds)
- `logo-reversed.svg` — same mark with a white wordmark for black/dark surfaces
- `diamond.svg` — the standalone diamond mark
- `favicon.svg` — diamond mark sized for a browser tab
- `brand-assets.json` — manifest recording every file, its source URL, and the disclaimer

**Colours (CommBank web brand guidelines):**

- CommBank Yellow `#FFCC00` (primary), bright yellow `#FDD200`, deep gold `#E5B800`
- CommBank Black `#000000`, brand ink `#23201F`
- Supporting greys: `#4A4A4A`, `#767676`, `#E3E3E3`, `#F2F2F2`, `#FAFAFA`
- Semantic: positive `#008A00`, alert `#D0021B`, info `#0B5FFF`

No external hotlinks in the UI. Never invent a different logo.

## Application structure

Build a large, navigable codebase organised by feature:

```
src/
  components/ brand/ layout/ ui/ marketing/ home/ products/ tools/ netbank/
  data/       nav, accounts, cards, homeLoans, personalLoans, insurance,
              investing, business, institutional, yello, branches, faqs,
              articles, calculators, netbank
  hooks/      useAuth, useDocumentTitle, useAccounts
  lib/        auth, cn, format, calculators, storage, search
  pages/      marketing pages, products/, netbank/
  test/       Vitest suites
```

## Pages — required routes

**Marketing / public**

| Route                                  | Page                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| `/`                                    | Homepage — hero, quick-links, product grid, Yello, app promo |
| `/banking`                             | Banking hub                                                  |
| `/banking/bank-accounts`               | Everyday bank accounts (Smart Access et al.)                 |
| `/banking/savings-accounts`            | Savings accounts + term deposits                             |
| `/banking/credit-cards`                | Credit cards comparison                                      |
| `/banking/personal-loans`              | Personal & car loans                                         |
| `/banking/international-travel`        | International & travel + FX calculator                       |
| `/home-loans`                          | Home loans hub                                               |
| `/home-loans/rates`                    | Home loan rates tables (owner occupied / investment)         |
| `/home-loans/calculator`               | Repayment calculator (real amortisation maths)               |
| `/insurance`                           | Insurance (home, car, travel, life)                          |
| `/investing-and-super`                 | Investing & Super (CommSec, Essential Super)                 |
| `/business`                            | Business banking hub                                         |
| `/institutional`                       | Institutional banking                                        |
| `/commbank-yello`                      | CommBank Yello tiers & benefits                              |
| `/digital-banking`                     | Digital banking hub                                          |
| `/digital-banking/netbank`             | NetBank marketing page                                       |
| `/digital-banking/app`                 | CommBank app marketing page                                  |
| `/products/interest-rates-and-fees`    | Rates & fees                                                 |
| `/tools-and-calculators`               | Tools & calculators hub                                      |
| `/support`                             | Help & support with searchable FAQs                          |
| `/locate-us`                           | Branch / ATM finder with filters                             |
| `/security`                            | CommBank Safe — security & scams                             |
| `/about-us`                            | About us                                                     |
| `/careers`                             | Careers                                                      |
| `/newsroom`                            | Newsroom article index                                       |
| `/newsroom/:slug`                      | Article detail                                               |
| `/search`                              | Site-wide search results                                     |
| `/important-info`                      | Important information index                                  |
| `/privacy`, `/terms`, `/accessibility` | Legal pages                                                  |

**Auth + NetBank (mock)**

| Route                   | Page                                                        |
| ----------------------- | ----------------------------------------------------------- |
| `/logon`                | Log on — NetBank / CommBiz / CommSec tabs, demo credentials |
| `/register`             | Register for NetBank                                        |
| `/netbank`              | Dashboard — account tiles, balances, quick links            |
| `/netbank/accounts/:id` | Account detail with transaction list + filters              |
| `/netbank/transfer`     | Transfer & pay — moves money between mock accounts          |
| `/netbank/payees`       | Payees & BPAY billers                                       |
| `/netbank/cards`        | Cards — lock/block/limit toggles                            |
| `/netbank/statements`   | Statements                                                  |
| `/netbank/yello`        | Yello hub with tier progress                                |
| `/netbank/settings`     | Settings                                                    |
| `*`                     | 404                                                         |

All `/netbank/*` routes are guarded: unauthenticated visitors are redirected to
`/logon?redirect=…`.

## Design system — match the real UI

- Sticky white header, black text, yellow underline/active indicator, mega-menu dropdowns with
  multi-column link groups, and a black **Log on** button top-right that opens the NetBank /
  CommBiz / CommSec menu.
- Yellow (`#FFCC00`) primary buttons with black text; black secondary buttons with white text;
  black-outline tertiary buttons.
- Generous white space, `1200px` max-width container, card grids with thin `#E3E3E3` borders,
  large black headings, `Inter` type.
- Black footer with multi-column link groups, social icons, and the ABN/AFSL/credit-licence
  disclosure line.
- Reusable primitives: `Button`, `Badge`, `Card`, `PageHero`, `Breadcrumb`, `SectionHeading`,
  `ProductCard`, `RateTable`, `Accordion`, `Tabs`, `EmptyState`, `LoadingSkeleton`, `Toast`.

## Interactivity (no fake screenshots — must actually work)

1. **Home loan repayment calculator** — principal, rate, term, repayment frequency, interest-only
   toggle; correct amortisation maths; total interest and total repaid.
2. **Foreign exchange calculator** — AUD to 8+ currencies with a mock rate table.
3. **Branch & ATM locator** — search + service filters over a seeded list of NSW/VIC/QLD locations.
4. **Support FAQ search** — token search with category filters and accordions.
5. **Site search** — searches an index built from page/product data.
6. **NetBank transfer** — validates against the from-account balance, then updates both balances
   and appends transactions, persisted to `localStorage`.
7. **Card controls** — lock / block international / travel-notification toggles persisted per card.

## Data layer

Realistic Australian retail-banking dummy data in TypeScript modules. At least 25 rows where
pagination or filtering matters (transactions, branches, FAQs). Persistence is `localStorage`
only — no database, no API server.

## Auth (mock)

Any email/password is accepted; the form pre-fills demo credentials and shows a demo-mode callout.
Session is a base64-encoded JSON blob in `localStorage`. Logout clears it. Do not tighten this.

## Code quality

TypeScript `strict` (no `any`), ESLint clean, accessible (`focus-visible` rings, `aria-current`,
`aria-expanded`, `aria-pressed`, labelled nav landmarks), responsive, comments only for non-obvious
logic.

## Tests (minimum)

Vitest + RTL covering: currency/date formatters, session encode/decode round-trip and tamper
rejection, home loan amortisation maths, FX conversion, branch/FAQ/site-search filtering, the
transfer reducer, and render/interaction tests for the header nav, product cards, and rate tables.

## Computer-use verification (required before PR)

After lint, build, and unit tests pass:

1. Start the app on port 5179.
2. Drive a real browser through: homepage → mega menu → home loans → repayment calculator →
   log on with demo credentials → NetBank dashboard → transfer money → confirm balances changed.
3. Record the whole walkthrough as a screen video; capture stills of the homepage, a product page,
   and the NetBank dashboard.
4. Confirm no console errors on the happy path.
5. Attach the recording and screenshots to the PR body.

## README

Unofficial demo disclaimer (not affiliated with the Commonwealth Bank of Australia), setup, demo
credentials, route map, structure tour, `localStorage` persistence notes, scripts.

## Implementation order

1. Brand assets → 2. deps → 3. tokens + primitives → 4. data modules → 5. mock auth →
2. header/footer shell → 7. homepage → 8. product pages → 9. tools → 10. NetBank →
3. support/legal → 12. tests → 13. README + lint/build/test → 14. computer-use recording →
4. PR.

## PR requirements

Branch `cursor/commbank-website-demo-8668`. Title: **feat: CommBank website demo — full
commbank.com.au clone with NetBank**. Body must include summary, fidelity notes, screenshots and
the computer-use recording, a test plan checklist, demo credentials, and known limitations.

## Constraints

- No lorem ipsum. No real secrets. No real integrations. Prefer many small files over monoliths.
- Every page must carry an unofficial-demo disclaimer somewhere in the chrome.

**Success criteria:** app runs on 5179; the seven-item mega nav works; every route above renders;
the calculator, locator, search, and NetBank transfer all really work; the CommBank diamond logo
and favicon are served from `public/brand/`; a computer-use walkthrough was recorded; the PR is
open with verification artifacts.
