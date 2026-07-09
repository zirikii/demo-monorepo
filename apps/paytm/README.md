# Paytm Web Demo (unofficial)

A pure-React recreation of the paytm.com consumer website, built for internal demos and
codebase-exploration testing.

> **Disclaimer:** This is an **unofficial demo**, not affiliated with, endorsed by, or connected
> to Paytm / One97 Communications. Logos and icons under `public/brand/` are sourced from Paytm's
> public web assets purely for visual fidelity (see `public/brand/brand-assets.json`). All
> marketing copy is original, all data (plans, fares, rates, results, jobs) is fictional, and no
> payment, UPI, or booking flow is real — every "payment" ends in a clearly-labelled simulated
> confirmation.

## Stack

| Layer | Technology |
| --- | --- |
| Bundler | Vite 6 |
| Framework | React 19 (SPA — deliberately **not** Next.js) |
| Routing | react-router-dom v7 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens in `src/index.css`) |
| Fonts | Self-hosted Inter via `@fontsource` |
| Icons | lucide-react + fetched brand PNG/SVG assets |
| Shared package | `@demo/ui` (`cn` class merger, `DemoRibbon`) |
| Tests | Vitest + React Testing Library (69 tests) |

## Getting started

```bash
# from the monorepo root
pnpm install
pnpm dev:paytm      # http://localhost:5174

# quality gates
pnpm --filter paytm-web-demo lint
pnpm --filter paytm-web-demo test
pnpm build:paytm
```

## Routes (26)

| Area | Routes |
| --- | --- |
| Home | `/` |
| Recharges & bills | `/recharge`, `/electricity-bill-payment`, `/dth-recharge`, `/fastag-recharge`, `/broadband-bill-payment`, `/loan-emi-payment`, `/bill-payments` |
| Travel & entertainment | `/flights`, `/bus-tickets`, `/train-tickets`, `/movies` |
| Payments & finance | `/upi`, `/credit-cards`, `/insurance`, `/personal-loan`, `/gold`, `/paytm-money`, `/offers` |
| Business | `/business` |
| Company | `/about-us`, `/careers`, `/investor-relations`, `/blog`, `/support`, `/security` |
| Fallback | `*` (404) |

## Project structure

```
apps/paytm/
├── public/brand/          # fetched Paytm logos + icons (see brand-assets.json)
├── scripts/
│   └── fetch-brand-assets.sh   # reproducible asset download
└── src/
    ├── components/
    │   ├── layout/        # Header (mega-menu), CategoryStrip, Footer, PageLayout
    │   ├── ui/            # Button, TextField, Select, Tabs, Accordion, Modal, ...
    │   ├── home/          # homepage sections (RechargesCard, TravelWidget, UpiHero, ...)
    │   ├── recharge/ bills/ travel/ finance/   # feature components
    │   └── shared/        # FormBand, FaqSection, SuccessModal, SignInModal, ...
    ├── data/              # typed seed modules (operators, plans, routes, jobs, ...)
    ├── hooks/             # useDocumentTitle, useDisclosure
    ├── lib/               # cn (re-export of @demo/ui), format, validators, emi
    ├── pages/             # one file per route
    └── test/              # Vitest + RTL suites
```

## How the mocks work

- **Forms** (recharge, bills, FASTag, travel, gold) validate locally (`src/lib/validators.ts`)
  and open a `SuccessModal` labelled *"Demo only — no money moved"*.
- **Sign in** is a two-step mock (any valid-looking mobile + any 6-digit OTP).
- **EMI calculator** runs real reducing-balance math (`src/lib/emi.ts`) — covered by tests.
- **Offers / careers / blog** filter seed data client-side; nothing talks to a network.
