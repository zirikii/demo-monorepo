# Build CommBank Demo — Full commbank.com.au Website Clone

## Mission

Scaffold a production-quality **commbank.com.au** website clone for demo purposes that looks and
feels like the real Commonwealth Bank of Australia public site at https://www.commbank.com.au/.
This is a UI/UX fidelity demo, not a production banking app: dummy data, mock auth, local
TypeScript/JSON content, localStorage persistence. No real external services, no real money
movement.

**Deliverable:** a single PR against `main` with a complete, lint-clean, build-passing codebase
under `apps/commbank/` in this pnpm monorepo, plus a computer-use screen recording of the running
app. Run via `pnpm install && pnpm dev:commbank`.

**Monorepo alignment (required):** follow the same conventions as `apps/changi` and `apps/nine`:

- Vite + React 19 + TypeScript + Tailwind v4 (CSS-first `@theme`, no `tailwind.config`)
- Depend on `@demo/ui` via `workspace:*`; re-export `cn` from `@demo/ui/cn`; show `<DemoRibbon />`
- Scripts: `dev`, `build`, `lint`, `typecheck`, `test` (Vitest), `format`
- Wire root `package.json` with `dev:commbank` / `build:commbank`; update root `README.md` and
  `AGENTS.md`
- Default port **5179** (5173 kddi, 5174 paytm, 5175 squiz, 5176 changi, 5177 nine, 5178 optus)
- Package name: `commbank-website-demo`

## Company profile

- **Product:** commbank.com.au — the public website of Australia's largest retail bank, covering
  banking, home loans, insurance, investing & super, business, institutional, and the CommBank
  Yello recognition program, plus NetBank digital banking.
- **Primary users:** Australian personal and business banking customers researching products,
  checking rates, using calculators, finding branches, and logging on to NetBank.
- **Core surfaces to clone:** homepage hero + quick-link grid, the seven primary nav hubs, product
  detail pages, rates & fees tables, tools & calculators, support/security, locate us, and an
  authenticated NetBank dashboard.
- **Dummy-data theme:** realistic Australian retail banking — Smart Access, NetBank Saver,
  GoalSaver, Awards credit cards, Digi Home Loan, Wealth Package, BPAY, PayID, Yello tiers,
  AUD amounts formatted `en-AU`. Never lorem ipsum.

## Repo context

- Repo: `demo-monorepo` (pnpm workspace, `apps/*` + `packages/ui`)
- New app under `apps/commbank/` — do not dump at repo root, do not delete other apps.

## Target tech stack

| Layer     | Technology                                        |
| --------- | ------------------------------------------------- |
| Framework | Vite 6 + React 19 + TypeScript (strict)           |
| Routing   | react-router-dom v7 (`BrowserRouter`)             |
| Styling   | Tailwind CSS v4 via `@tailwindcss/vite`, `@theme` |
| Icons     | lucide-react (`aria-hidden` on decorative)        |
| Fonts     | `@fontsource/public-sans` (self-hosted)           |
| Forms     | react-hook-form + zod + `@hookform/resolvers`     |
| State     | React context + hooks                             |
| Data      | Local TS seed modules under `src/data/`           |
| Auth      | Mock session (base64 token in localStorage)       |
| Tests     | Vitest + @testing-library/react, jsdom            |
| Lint      | ESLint 9 flat config + Prettier                   |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payment providers.

## Brand assets — source real files (do this first)

The commbank.com.au origin is **blocked by network egress rules** in the build environment. Source
the genuine CommBank diamond + wordmark artwork from reachable mirrors on `raw.githubusercontent.com`:

- Wordmark + diamond lockup (1024×177):
  `https://raw.githubusercontent.com/cissa-unimelb/cissa_website/master/static/assets/images/sponsors/commbank.svg`
- Gradient diamond (favicon/app-icon style, 64×64):
  `https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/c/commbank.com.au.svg`
- Flat black/yellow diamond (40×40):
  `https://raw.githubusercontent.com/shortedapp/asx-company-images/master/companies/C/CBA/CBAalt.svg`

Required files in `public/brand/`:

- `logo.svg` — full lockup (black wordmark + yellow diamond), used in the header
- `logo-white.svg` — reversed lockup for the black footer
- `diamond.svg` — flat mark for compact/mobile use
- `favicon.svg` — gradient diamond
- `brand-assets.json` — manifest recording every source URL and any derivation
- `scripts/fetch-brand-assets.sh` — reproducible re-fetch

No external hotlinks in the UI. Never invent a fake logo. Record the canonical upstream URL
(`https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg`) in the manifest even though
it is unreachable from the build environment.

## Design system — match the real UI

CommBank's site is high-contrast: white page, black type, CommBank yellow as the single accent.

- `--color-cba-yellow: #fecb26` (from the official logo SVG), `--color-cba-yellow-bright: #ffcc00`,
  `--color-cba-yellow-dark: #e0b000`
- Ink ramp: `#000000` / `#1d1d1d` / `#4a4a4a` / `#767676`
- Surfaces: `#ffffff`, tint `#f5f5f5`, deep tint `#ebebeb`; lines `#d8d8d8` / `#e6e6e6`
- Tones: positive `#008a3e`, critical `#c8102e`, info `#0057b8`, caution `#a86500`
- Radii: `4px / 8px / 16px / 9999px`; container `max-w-[1180px]`
- Primary CTA = yellow pill with black text; secondary = black-outline pill; tertiary = black
  underline link with chevron
- Footer is black with white text and yellow link hovers

Build reusable primitives: `SiteHeader` (utility bar + mega menu + Log on), `SiteFooter`,
`PageHero`, `Breadcrumb`, `Button`, `Badge`, `Card`, `ProductCard`, `RateTable`, `Accordion`,
`Tabs`, `EmptyState`, `LoadingSkeleton`, `CookieBanner`, `ScrollToTop`.

## Application structure

Build a large, navigable codebase (~110+ files) organised by feature:

```
apps/commbank/
  index.html
  public/brand/…
  scripts/fetch-brand-assets.sh
  src/
    main.tsx App.tsx index.css
    components/{layout,ui,marketing,products,calculators,netbank}/
    data/   (nav, accounts, cards, homeLoans, insurance, investing, business,
             institutional, yello, rates, branches, faqs, articles, netbank)
    hooks/  (useAuth, useDocumentTitle, useLocalStorage)
    lib/    (cn, format, auth, storage, calculators, search)
    pages/  (see routes)
    test/
```

## Routes — replicate as many real pages as possible

Public site:

| Route                                           | Real page                             |
| ----------------------------------------------- | ------------------------------------- |
| `/`                                             | commbank.com.au homepage              |
| `/banking`                                      | `/banking.html`                       |
| `/bank-accounts`                                | `/bank-accounts.html`                 |
| `/credit-cards`                                 | `/credit-cards.html`                  |
| `/personal-loans`                               | `/personal-loans.html`                |
| `/travel`                                       | travel & international money          |
| `/home-loans`                                   | `/home-loans.html`                    |
| `/home-loans/types`                             | `/home-loans/types.html`              |
| `/home-loans/rates`                             | interest rates tables                 |
| `/insurance`                                    | `/insurance.html`                     |
| `/investing-and-super`                          | `/investing-and-super.html`           |
| `/business`                                     | `/business.html`                      |
| `/institutional`                                | `/institutional.html`                 |
| `/commbank-yello`                               | `/commbank-yello.html`                |
| `/digital-banking`                              | `/digital-banking.html`               |
| `/digital-banking/netbank`                      | `/digital-banking/netbank.html`       |
| `/digital-banking/app`                          | CommBank app page                     |
| `/rates-and-fees`                               | rates & fees                          |
| `/tools-and-calculators`                        | calculators hub (working calculators) |
| `/support`                                      | `/support.html`                       |
| `/support/contact-us`                           | `/support/contact-us.html`            |
| `/support/security`                             | CommBank Safe                         |
| `/locate-us`                                    | branch/ATM locator                    |
| `/about-us`, `/careers`                         | corporate                             |
| `/newsroom`, `/newsroom/:slug`                  | newsroom index + article              |
| `/important-info`, `/privacy`, `/accessibility` | legal                                 |
| `/search`                                       | site search results                   |
| `/products/:slug`                               | generic product detail                |
| `/login`, `/register`                           | NetBank log on / register             |
| `*`                                             | 404                                   |

Authenticated NetBank (guarded, redirects to `/login?redirect=…`):

`/netbank` (accounts overview), `/netbank/accounts/:id` (transactions + filters),
`/netbank/transfer`, `/netbank/pay`, `/netbank/cards`, `/netbank/yello`, `/netbank/settings`.

## Pages — detailed requirements

**Homepage.** Yellow-accented hero carousel (Digi Home Loan Qantas Points offer, NetBank Saver
5.20% p.a. intro rate, CommBank Yello), then the real quick-link grid: Banking (Bank & savings
accounts / Credit cards / Personal loans & car loans), Home loans, Insurance & more (Travel
products & services / Overseas payment / Foreign exchange calculator), Business (Bank accounts &
cards / EFTPOS & eCommerce / Business loans & finance), Rates & calculators (Rates & fees / Tools &
calculators / Business product selector). Add "Australia's best banking app", security alert strip,
newsroom teasers, and the "We're here to help" 4-card block that ends most real pages.

**Hub pages.** `PageHero` + intro, product card grid, comparison table, "Banking for the stage
you're at" life-stage cards, FAQ accordion, help block.

**Home loans.** Mirror the real page: Qantas Points hero, "Why choose CommBank?" (Canstar awards,
10-minute conditional approval, support at every step), three product cards (Digi Home Loan,
Standard Variable Rate, Simple Home Loan), life stages, support cards, additional-information
accordions, and the "Things you should know" disclosure block.

**Calculators (must actually compute).** Home loan repayments (P&I and interest-only, weekly /
fortnightly / monthly), borrowing power, savings goal projection, and foreign exchange conversion
over a static rate table.

**Locate us.** Filterable list of branches/ATMs by suburb/state with services chips and opening
hours; empty state when no match.

**Support.** Searchable FAQ list with category chips, contact channels (13 2221, business 13 1998,
overseas +61 2 9999 3283), and a CommBank Safe security page with scam alerts.

**Login / register.** Demo mode: any client number/password works, fields pre-filled, muted demo
callout. Login redirects to `/netbank` or the `redirect` query param.

**NetBank.** Accounts overview with balances and available funds, account detail with searchable
and filterable transaction list, transfer between accounts (updates balances in localStorage), pay
anyone / BPAY form with validation, cards with lock/unlock toggles, Yello tier progress, settings
toggles.

## Data layer

Realistic Australian banking dummy data: 6+ accounts, 60+ transactions with merchant names and
categories, 6 credit cards, 5 home loans with rates and comparison rates, insurance and investment
products, 4 Yello tiers, 20+ branches/ATMs across AU states, 25+ FAQs, 8+ newsroom articles. All
money formatted with `Intl.NumberFormat("en-AU", { currency: "AUD" })` — no date-fns/dayjs.

## Auth (mock)

Base64-encoded JSON session in `localStorage` under `commbank-demo-session`. Never tighten this —
the monorepo convention is that any credentials are accepted.

## Code quality

TypeScript strict (no `any`), ESLint/build clean, accessible (`focus-visible` rings,
`aria-current="page"`, `aria-expanded`, `aria-pressed`, labelled nav landmarks), responsive from
360px up, comments only for non-obvious logic.

## Tests (minimum)

Vitest + RTL covering: currency/date/rate formatters, session encode/decode round-trip plus tamper
rejection, all four calculator functions against hand-checked values, branch and FAQ filtering,
`SiteHeader` nav rendering and active state, homepage render, and the NetBank transfer flow
mutating balances.

## Computer-use verification (required before PR)

After lint, typecheck, build, and unit tests pass:

1. `pnpm dev:commbank` (port 5179).
2. Browser walkthrough: homepage with real logo → a hub page → home loan calculator producing a
   repayment figure → log on with demo credentials → NetBank accounts → a transfer that changes a
   balance.
3. Record the whole walkthrough to video; capture stills of the homepage and NetBank dashboard.
4. Confirm no console errors on the happy path.
5. Attach recording + screenshots to the PR body.

## README

Unofficial demo disclaimer (not affiliated with Commonwealth Bank of Australia), setup, demo
credentials, route map, brand asset provenance, scripts table.

## Implementation order

1. Fetch brand assets → 2. scaffold + deps → 3. tokens/global CSS/primitives → 4. types + seed data
   → 5. mock auth + route guard → 6. header/footer shell → 7. homepage → 8. remaining public pages →
2. calculators → 10. NetBank → 11. tests → 12. README + root wiring → 13. lint/typecheck/build/test
   → 14. computer-use verification + recording → 15. PR.

## Constraints

- No lorem ipsum — realistic Australian retail-banking copy.
- No real secrets, no real customer data, no real money movement.
- No real AI/integrations — simulate.
- Prefer many small files over monoliths.
- Commit incrementally; if blocked, decide, document, continue.

**Success criteria:** app runs on 5179; the homepage is recognisably commbank.com.au with the
official logo and favicon self-hosted under `public/brand/`; every route above renders; calculators
compute; demo credentials reach a working NetBank dashboard; computer-use walkthrough recorded; PR
open with verification artifacts.
