# CommBank public site + NetBank demo

> **Unofficial demonstration only.** This project is not affiliated with, endorsed by, or
> connected to Commonwealth Bank of Australia. It is not suitable for real banking. Every
> customer, balance, transaction, rate and product value is fictional.

A Vite 6, React 19 and TypeScript recreation of the current CommBank public-site language, plus a
local-only mock NetBank experience. The app makes no runtime network requests and stores its mock
session and preferences only in browser `localStorage`.

## Run

```bash
pnpm install
pnpm dev:commbank
```

Open `http://localhost:5179`. No environment variables are required; `.env.example` documents the
optional public demo metadata.

Demo NetBank credentials:

- Client number: `12345678`
- Password: `demo`
- Any non-empty credentials are accepted.

## Features

- 30 navigable public routes covering accounts, cards, lending, insurance, investing, business,
  digital banking, support, search, locations and legal disclosure.
- Responsive public shell with keyboard-friendly navigation, current-route states and the shared
  `@demo/ui` `DemoRibbon`.
- Protected NetBank routes for overview, accounts, transaction search/filtering, transfers, BPAY,
  cards, scheduled payments, statements, inbox, profile, security and settings.
- 42 fictional Australian transactions, native `en-AU`/AUD formatting and an interactive home
  loan calculator.
- Mock session, card controls, read messages and preferences persisted locally. Passwords are
  never persisted.

## Quality commands

```bash
pnpm --filter commbank-netbank-demo test
pnpm --filter commbank-netbank-demo typecheck
pnpm --filter commbank-netbank-demo lint
pnpm --filter commbank-netbank-demo build
```

## Brand assets

The intended public source is recorded in `public/brand/brand-assets.json`. Run
`scripts/fetch-brand-assets.sh` to refresh it where network access is available. The checked-in SVG
is a faithful local fallback of the current yellow/black diamond and CommBank wordmark because the
source host was unavailable during implementation. No asset is hotlinked at runtime.

## Limitations

- This SPA is a visual and interaction demo, not a pixel-perfect copy of every official page.
- Product figures are illustrative, not current offers or financial advice.
- Statement downloads are generated local text files; maps, contacts and security actions are
  simulations.
- Clearing site data removes the demo session and all saved preferences.
