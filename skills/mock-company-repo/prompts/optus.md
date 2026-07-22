# Build Optus Demo — Full Landing, Auth, and Dashboard

## Mission

Scaffold a production-quality Optus UI clone for demo purposes that looks and feels like the real optus.com.au consumer site. This is a UI/UX fidelity demo, not a production app: dummy data, mock auth, local JSON persistence, and no real external services.

Deliver a PR against `main` with a complete, lint-clean, build-passing workspace app that runs locally with `pnpm --filter optus-website-demo dev`.

## Company profile

- Product: Australian telecommunications provider for mobile, prepaid, nbn, home internet, entertainment, support, and the My Optus self-service experience.
- Primary users: Australian consumers comparing mobile and internet plans, managing bills, usage, add-ons, recharge, support, and account settings.
- Core surfaces to clone: marketing home, mobile plans, prepaid, home internet, support, My Optus dashboard, usage, bills, add-ons, support cases, and settings.
- Dummy-data theme: Australian households and small accounts in Sydney, Melbourne, Brisbane, Perth, and Adelaide with realistic plan names, device repayment details, nbn orders, bills, outages, rewards, and support cases.

## Repo context

- Repo: `demo-monorepo`
- Monorepo app: scaffold under `apps/optus/` and wire it into the pnpm workspace and root scripts.

## Target tech stack

Use Next.js App Router + React + TypeScript + Tailwind + shadcn-style local primitives. Use local JSON files and route handlers for persistence. Use mock auth via signed HTTP-only cookie and middleware.

## Brand assets — source real files first

Sources to try in order:

1. Official Optus media centre logos page: `https://www.optus.com.au/about/media-centre/multimedia/logos`
2. Optus homepage and page source: `https://www.optus.com.au/`
3. Optus-hosted content paths under `/content/dam/optus/`
4. Fallback SVG source only if direct Optus asset fetch is blocked: `https://upload.wikimedia.org/wikipedia/commons/c/ca/Optus_logo.svg`, which cites Optus as source.

Required files in `public/brand/`:

- `logo.svg`
- `logo-white.svg`
- `logo-mark.svg`
- `favicon.svg`
- `brand-assets.json`

Write `scripts/fetch-brand-assets.sh` so the downloads are reproducible. Self-host all assets and never hotlink external URLs in the UI.

## Design system

Use Optus teal `#00A3AD` as the primary brand token, deep navy `#00343D` for high-contrast headers, bright yellow `#FFD200` for promotional cards, white cards, rounded pill CTAs, large plan cards, comparison grids, and friendly consumer copy. Use a rounded sans-serif feel with `Inter`/system fallbacks. Build reusable primitives for app shell, top nav, product card, data table, badge, button variants, empty state, skeleton, and toast-like status panels.

## Application structure

Build a large, navigable app:

```text
apps/optus/
  app/
    page.tsx
    mobile/page.tsx
    prepaid/page.tsx
    internet/page.tsx
    support/page.tsx
    login/page.tsx
    signup/page.tsx
    (myoptus)/dashboard/page.tsx
    (myoptus)/usage/page.tsx
    (myoptus)/bills/page.tsx
    (myoptus)/add-ons/page.tsx
    (myoptus)/support-cases/page.tsx
    (myoptus)/settings/*
    api/*
  components/
  content/
  data/
  hooks/
  lib/
  public/brand/
```

## Page requirements

- Marketing home (`/`): Optus-style mega nav, recharge/activate quick links, hero for mobile + home internet bundles, product cards, why choose Optus, My Optus app promo, support strip, footer, and Acknowledgement of Country.
- Mobile (`/mobile`): postpaid plan cards, phone bundles, 5G network proof points, filters, comparison table.
- Prepaid (`/prepaid`): recharge cards, auto-recharge toggles, SIM activation CTA.
- Internet (`/internet`): nbn and 5G home internet cards, address-check form, order-progress examples.
- Support (`/support`): search-first support hub, outage checker mock, popular topics, case creation CTA.
- Login/signup: centered Optus-branded card, demo credentials hint, any credentials accepted.
- My Optus app shell: left rail/top rail with official logo, usage, bills, add-ons, support cases, settings.
- Dashboard: hero account overview, usage meters, bill due, service health, plan cards, active cases, upgrade prompts.
- Settings: account, profile, team/family members, integrations/notifications toggles persisted to JSON.

## Data layer

Use JSON seed files with at least 25 rows where tables need pagination. API routes read/write JSON through `fs/promises` with temp-file + rename atomic writes. Markdown content powers long-form marketing and legal snippets.

## Env vars

```text
NEXT_PUBLIC_APP_NAME=Optus
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEMO_AUTH_SECRET=change-me
DEMO_ADMIN_EMAIL=admin@example.com
DEMO_ADMIN_PASSWORD=demo
```

## Tests

Vitest + React Testing Library covering:

- currency/data formatters
- auth token encode/decode/tamper rejection
- plan card rendering and disabled states
- My Optus nav active state
- one API route GET/POST mutation

## README

Document that this is an unofficial demo, not affiliated with Optus. Include setup, demo credentials, scripts, architecture tour, brand asset sources, and known limitations.

## Implementation order

1. Fetch brand assets.
2. Install/use workspace dependencies.
3. Design tokens + global CSS.
4. Types, seed data, and content.
5. Mock auth + middleware.
6. App shell and nav.
7. Homepage hero and core commercial pages.
8. My Optus dashboard and account screens.
9. API routes.
10. Tests.
11. README, lint, build, test, manual video, PR.

## PR requirements

Branch `cursor/optus-website-demo-67d7`. Open a draft PR titled `feat: Optus demo — website and My Optus dashboard` with summary, fidelity notes, test plan, demo credentials, known limitations, and the walkthrough video artifact.

## Constraints

- Dummy data only.
- No real secrets, payments, auth, CRM, telco APIs, or live Optus integrations.
- Official/public brand assets committed under `public/brand/`.
- No lorem ipsum.
- Prefer many focused files over monoliths.
- Success criteria: run the app, log in with demo credentials, and see a close Optus-styled website and dashboard with assets self-hosted.
