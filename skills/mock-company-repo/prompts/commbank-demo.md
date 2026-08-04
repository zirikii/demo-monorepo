# Build CommBank Demo — Full Public Site, Auth, and NetBank

## Mission

Build a production-quality, unofficial **Commonwealth Bank of Australia website demo** under
`apps/commbank/` in `demo-monorepo`. Recreate the current public CommBank visual language and
information architecture as closely as practical from public pages at
`https://www.commbank.com.au/`, then add a convincing local-only NetBank experience. Use dummy
data, mock authentication, and localStorage only. Never connect to real banking services.

Deliver one PR against `main` with a lint-clean, build-passing app, tests, a recorded browser
walkthrough, screenshots, demo credentials, fidelity notes, and known limitations.

## Company profile

- **Product:** Australian retail and business banking, lending, cards, insurance, investing,
  travel money, and digital banking through NetBank and the CommBank app.
- **Primary users:** Australian personal banking customers, home buyers, travellers, investors,
  and small-business owners.
- **Core public surfaces:** Home, bank accounts, savings, credit cards, home loans, personal
  loans, insurance, investing and super, business banking, digital banking, support, calculators,
  locations, contact, and product detail pages.
- **Authenticated surfaces:** NetBank overview, accounts, transactions, transfers, BPAY, cards,
  statements, inbox, profile, security, and settings.
- **Dummy-data theme:** A Sydney household with everyday and savings accounts, a credit card,
  home loan, BPAY billers, Australian merchants, scheduled payments, and financial insights.

## Target stack

| Layer | Technology |
| --- | --- |
| Framework | Vite 6 + React 19 + TypeScript |
| Routing | React Router |
| Styling | Tailwind CSS v4 with an app-owned token layer |
| Components | Reusable local primitives plus `@demo/ui` helpers |
| Icons | `lucide-react` |
| Forms | `react-hook-form` + `zod` |
| State | React context + hooks |
| Data/auth | TypeScript seed modules + localStorage mock session |
| Tests | Vitest + React Testing Library |

Run on port `5179`, use package name `commbank-netbank-demo`, and add root
`dev:commbank` / `build:commbank` scripts.

## Brand assets

Fetch and self-host the supplied official logo:

- `https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg`

Create:

- `public/brand/commbank-logo.svg`
- `public/brand/favicon.svg` derived from the official mark
- `public/brand/brand-assets.json`
- `scripts/fetch-brand-assets.sh`

No hotlinks in the rendered app. Use official public assets where the environment can fetch them;
otherwise use designed CSS/gradient image panels and document the limitation. Do not invent a
replacement logo.

## Design system

The current identity is yellow, black, white, and warm neutral grey. Define all values once in
`src/index.css` and consume semantic classes:

- CommBank yellow `#FECA0A`
- Primary ink `#23201F`
- White `#FFFFFF`
- Page neutral `#F6F6F4`
- Muted text and borders derived as named app tokens

Use a clean humanist sans-serif, broad white space, large editorial headings, black pill/rounded
buttons, yellow highlights, soft grey cards, and strong photographic-style hero compositions.
Build responsive, accessible primitives for buttons, cards, breadcrumbs, accordions, tabs,
dialogs, drawers, search, product comparisons, calculators, transaction lists, toasts, and
loading/empty states.

## Public application shell

- Demo disclaimer ribbon
- Utility bar: personal/business/institutional, locate us, help, search
- Primary header with official logo, mega-menu capable navigation, and yellow `Log on` action
- Mobile drawer with the same information architecture
- Footer with product, support, legal, security, accessibility, social, and contact groups
- Active navigation state, visible focus rings, keyboard-operable menus, and responsive layouts

## Public pages and routes

Implement each as a real navigable route, using shared category/detail templates where suitable:

1. `/` — current-style homepage with hero, shortcut tiles, product discovery, financial wellbeing,
   news/content cards, support CTA, and footer.
2. `/banking` — banking category hub.
3. `/banking/everyday-accounts` — Smart Access style everyday account detail.
4. `/banking/savings-accounts` — savings comparison and NetBank Saver/GoalSaver cards.
5. `/banking/term-deposits` — term deposit detail and rate table.
6. `/credit-cards` — cards category and comparison.
7. `/credit-cards/low-fee` — low fee card detail.
8. `/credit-cards/awards` — awards card detail.
9. `/home-loans` — home loan hub with buying/refinancing paths.
10. `/home-loans/fixed-rate` — fixed-rate product detail.
11. `/home-loans/variable-rate` — variable-rate product detail.
12. `/home-loans/calculator` — interactive repayment calculator.
13. `/personal-loans` — personal and car loans.
14. `/insurance` — home, car, travel, and loan protection overview.
15. `/insurance/travel` — travel insurance detail.
16. `/investing` — investing and CommSec overview.
17. `/super` — superannuation overview.
18. `/business` — business banking landing.
19. `/business/accounts` — business accounts/cards.
20. `/business/loans` — business lending.
21. `/digital-banking` — CommBank app and NetBank overview.
22. `/digital-banking/netbank` — NetBank feature detail.
23. `/support` — support hub with issue categories.
24. `/support/security` — scams, fraud, and security guidance.
25. `/contact` — contact methods.
26. `/locations` — mock branch/ATM finder with local filters.
27. `/search` — client-side search across all routes and products.
28. `/about` — company/community overview.
29. `/news` — editorial content grid.
30. `/legal` — unofficial-demo, privacy, and local-data disclosure.

Copy must be realistic and specific, not lorem ipsum. Product values and rates are clearly marked
illustrative and must not be represented as current financial advice.

## Auth and NetBank

### Login

`/netbank/logon` visually references NetBank's secure login while clearly showing a demo-mode
callout. Pre-fill:

- Client number: `12345678`
- Password: `demo`

Any non-empty credentials work. Store a base64-encoded demo profile in
`commbank-demo-session`. Do not persist the entered password.

### Protected NetBank routes

- `/netbank` — account portfolio, total balance, quick actions, recent activity, insights
- `/netbank/accounts` — account cards and balances
- `/netbank/accounts/:id` — searchable/filterable transaction history
- `/netbank/transfer` — interactive transfer flow with review and success states
- `/netbank/bpay` — billers and mock BPAY payment
- `/netbank/cards` — card controls with persisted lock/unlock toggles
- `/netbank/payments` — upcoming and scheduled payments
- `/netbank/statements` — statement list with simulated downloads
- `/netbank/inbox` — secure message list/read state
- `/netbank/profile` — contact details and preferences
- `/netbank/security` — password, NetCode, devices, and security tips
- `/netbank/settings` — persisted display/notification toggles

Unauthenticated access redirects to `/netbank/logon?redirect=...`. Logout clears the session.

## Data and interaction requirements

- At least 35 Australian transactions with dates, categories, account references, and signed AUD
  amounts.
- Use native `Intl` with `en-AU` and `AUD`.
- Product search, branch filters, calculator inputs, transaction filters, card lock, inbox read
  state, notification preferences, and transfer/BPAY success flows must function.
- Never send network requests from app runtime.
- Include accessible labels, semantic headings, `aria-current`, dialog semantics, and keyboard
  focus styles.

## Tests

Add Vitest + RTL coverage for:

- AUD/date formatters
- Session encode/decode and invalid token handling
- Public navigation and active state
- Home-loan repayment calculation
- Login and protected-route behavior
- Transaction search/filter interaction
- Card lock persistence or transfer review/success flow

## Documentation

Add `apps/commbank/README.md`, `.env.example`, and `AGENTS.md`. State prominently that this is an
unofficial demonstration, not affiliated with CommBank, not suitable for real banking, and that
all balances/rates/customers are fictional.

Update root `package.json`, `README.md`, and `AGENTS.md`.

## Verification and PR

Run:

1. `pnpm install`
2. `pnpm --filter commbank-netbank-demo test`
3. `pnpm --filter commbank-netbank-demo typecheck`
4. `pnpm --filter commbank-netbank-demo lint`
5. `pnpm --filter commbank-netbank-demo build`
6. `pnpm lint`

Then start `pnpm dev:commbank` and record a browser walkthrough:

1. Load the public homepage and verify the official logo.
2. Navigate to at least two public product pages.
3. Search for a product.
4. Log on with the demo credentials.
5. View accounts and filter transactions.
6. Complete a mock transfer or toggle a card lock.
7. Log out.

Capture stills of the homepage, a product page, NetBank overview, and interaction result. Embed the
recording and key screenshots in the PR body. The PR must include summary, fidelity notes, test
plan, demo credentials, and limitations.

## Constraints

- Dummy data and localStorage only; no real database, OAuth, payments, banking APIs, or analytics.
- Official logo self-hosted under `public/brand/`.
- App-owned CommBank tokens; do not import another demo app's palette.
- Prefer many focused files and reusable route templates over monolithic components.
- Keep comments only for non-obvious constraints.
- The result is an accurate visual recreation for demonstration, not a deceptive production copy.
