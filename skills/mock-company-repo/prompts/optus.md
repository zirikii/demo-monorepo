# Build Optus Demo — Full Landing, Auth, and Business Dashboard

## Mission

Scaffold a production-quality **Optus UI clone** for demo purposes that looks and feels like the real Optus Enterprise and Business experience. This is a UI/UX fidelity demo, not a production app: dummy data, mock auth, local env vars, markdown/JSON persistence. No real external services.

**Deliverable:** a single PR against `main` with a complete, lint-clean, build-passing codebase that runs locally via `pnpm install && pnpm dev:optus`.

## Company profile

- **Product:** Optus is an Australian telecommunications provider. The demo should focus on an Optus Enterprise self-service hub inspired by Insight Plus and My Fleet Manager: mobile fleet usage, service health, billing analytics, inbound call reporting, and cost centre allocation.
- **Primary users:** Enterprise telecom administrators, finance managers, IT operations leads, and cost-centre owners managing Optus mobile, broadband, voice, and device services.
- **Core surfaces to clone:** Marketing homepage, pricing/business solutions page, login/signup, Business Hub overview, Fleet Manager, Insight Plus reporting, Billing, Service Health, Reports, and Settings.
- **Dummy-data theme:** Australian enterprise telecom accounts, cost centres, mobile fleets, NBN/5G services, inbound call queues, monthly spend, roaming alerts, and downloadable reports.

## Repo context

- Repo: `demo-monorepo`
- Current repo is a pnpm workspace. Scaffold the app under `apps/optus/`, wire it into root scripts, and keep it independent from other app token systems.

## Target tech stack (mimic Optus)

| Layer | Technology |
|-------|------------|
| Framework | Next.js App Router + React 19 + TypeScript |
| Styling | Tailwind CSS v3 with app-local Optus tokens |
| Components | Local shadcn-style primitives |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Tables | @tanstack/react-table |
| State | React server components + client hooks |
| Data | Local JSON seed files + markdown content |
| Auth | Mock session via HTTP-only signed cookie + middleware |
| API | Route handlers reading/writing local files |
| Tests | Vitest + React Testing Library |
| Lint/format | ESLint + Prettier |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payment providers.

## Brand assets — source real files (do this first)

Before writing UI code, fetch and commit official brand assets so the app looks **exactly** like an Optus-branded product.

**Sources to try (in order):**

1. Official media centre logos page: `https://www.optus.com.au/about/media-centre/multimedia/logos`
2. Optus homepage favicon and manifest assets: `https://www.optus.com.au/`
3. User-provided official-style SVG wordmark in this prompt for `public/brand/logo.svg` if direct media-centre downloads are blocked.
4. Live Optus Enterprise and Business pages for product cues:
   - `https://www.optus.com.au/enterprise/security/security-and-management/insight-plus`
   - `https://www.optus.com.au/enterprise/mobility/mobile-fleet-management/telecom-expense-management`
   - `https://www.optus.com.au/insightplus/Plus/index.html`

**Required files in `public/brand/`:**

- `logo.svg` — Optus wordmark from the provided SVG, filled with Optus teal.
- `logo-white.svg` — same wordmark filled white for dark backgrounds.
- `logo-mark.svg` — compact O mark derived from the logo for app icon usage.
- `favicon.svg` — teal/yellow Optus demo favicon.
- `brand-assets.json` — manifest with source URL, fallback note, and fetch date.

**How to fetch (agent must execute, not skip):**

1. Try the official media-centre page with `curl -L` and inspect it for image URLs.
2. Try the homepage for favicon and app icons.
3. If the official page blocks direct asset downloads, write the user-provided SVG into `public/brand/logo.svg`, generate a white variant and favicon, and document the fallback in `brand-assets.json`.
4. Add `scripts/fetch-brand-assets.sh` that reproduces the downloads and fallback file generation idempotently.
5. Wire assets in `app/layout.tsx`: favicon, header logo, login page logo. **No external hotlinks** — only `/brand/...` paths.

## Design system — match the real UI

Use an Optus token layer with exact brand values: teal `#00A3AD`, teal dark `#007C89`, yellow `#FECD03`, yellow soft `#FFF4B8`, ink `#142326`, page `#F6FBFB`, card `#FFFFFF`, line `#DCE9EA`, success `#168A5B`, warning `#B7791F`, danger `#D83A34`. Typography should feel friendly and rounded: `Inter`, `Aptos`, `Helvetica Neue`, Arial, sans-serif. Components should use rounded cards, high-contrast CTAs, teal navigation, yellow highlight bands, clean telecom metric cards, and dense enterprise tables.

Build reusable primitives: AppShell, Sidebar/TopNav, PageHeader, DataTable, Badge, Button variants, Dialog/Sheet, EmptyState, LoadingSkeleton, Toast.

## Application structure

Build a large, navigable codebase organized by feature:

```
apps/optus/
  app/
    page.tsx
    pricing/page.tsx
    login/page.tsx
    signup/page.tsx
    (hub)/
      overview/page.tsx
      fleet/page.tsx
      insights/page.tsx
      billing/page.tsx
      services/page.tsx
      reports/page.tsx
      settings/
    api/
  components/
  content/
  data/
  hooks/
  lib/
  public/brand/
  scripts/fetch-brand-assets.sh
```

## Pages — detailed requirements

### Marketing landing (`/`)

Hero with Optus logo, teal/yellow visual system, business hub mock dashboard, proof points, Insight Plus and My Fleet Manager feature grid, customer outcomes, plan teaser, and footer. Original copy stored in `content/landing/*.md`.

### Pricing (`/pricing`)

Tiered business plans, comparison table, FAQ accordion, CTA to signup, and copy positioning the app as a self-service enterprise demo.

### Login / Signup

Centered card with official logo. Any credentials work in demo mode; show a muted hint. Login sets mock cookie and redirects to `/overview`. Signup writes to `data/users.json` and auto-logs in.

### Dashboard shell

Persistent teal sidebar and top header matching Optus Business styling. Navigation: Overview, Fleet Manager, Insight Plus, Billing, Services, Reports, Settings. Use `aria-current="page"` for active nav.

### Core product screens

- **Overview:** Executive dashboard with monthly spend, active services, roaming alerts, service uptime, usage trends, cost centre split, priority actions, and service-health summary.
- **Fleet Manager:** Device/service table with status, plan, user, cost centre, data usage, roaming flag, and suspend/reactivate actions through local API.
- **Insight Plus:** Billing and inbound call analytics with charts, report subscriptions, CSV-ready report list, and queue insights.
- **Billing:** Invoices, payment status, cost allocation, unbilled usage risks, and month-over-month telecom spend.
- **Services:** Mobile, broadband, voice, and 5G services with outage/maintenance badges.
- **Reports:** Saved report catalogue with download-ready mock rows and subscription toggles.
- **Settings:** Account, profile, team members, roles, integrations, and notification preferences persisted to JSON.

## Data layer

- Realistic Australian dummy data with 25+ rows where relevant.
- API routes read/write JSON via `fs/promises`; use atomic writes with temp file + rename.
- Markdown content in `content/` with frontmatter.

## Env vars (`.env.example`)

```
NEXT_PUBLIC_APP_NAME=Optus Business Hub
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEMO_AUTH_SECRET=change-me
DEMO_ADMIN_EMAIL=admin@example.com
DEMO_ADMIN_PASSWORD=demo
```

## Auth (mock)

`middleware.ts` protects hub routes; unauthenticated users redirect to `/login?redirect=...`. Sessions are signed HTTP-only cookies using `jose` with `DEMO_AUTH_SECRET`. Logout clears cookie.

## Code quality

TypeScript strict, ESLint clean, build clean, Prettier formatted, accessible, responsive, no console errors on happy paths, comments only for non-obvious logic.

## Tests (minimum)

Vitest + RTL covering: formatters, auth token encode/decode, fleet table rows/badges/actions, nav active state, and one API route GET/POST. Add `"test": "vitest run"` script.

## README

Replace default README: overview (unofficial demo, not affiliated with Optus), prerequisites, setup, demo credentials, project structure tour, JSON persistence, scripts, and asset sourcing note.

## Implementation order

1. Fetch brand assets.
2. Install deps.
3. Design tokens + global CSS + component primitives.
4. Types, seed data, content.
5. Mock auth + middleware.
6. App shell + nav.
7. Hero product screen.
8. Remaining product screens.
9. Settings.
10. Marketing + auth pages.
11. API routes wired to JSON.
12. Tests.
13. README + lint/build/test + PR.

## PR requirements

Use the required Cursor Cloud branch format for this repo. Open a draft PR titled **feat: Optus demo — landing, auth, and dashboard** with Summary, fidelity notes, Test plan checklist, Demo credentials, and Known limitations.

## Constraints

- No lorem ipsum.
- No real secrets in committed files.
- No real AI/integrations; simulate with local JSON, timers, and toggles.
- Prefer many small files over monoliths.
- Official logo + favicon committed in `public/brand/`, rendered in header and browser tab.
- README must state this is an unofficial demo and not affiliated with Optus.

**Success criteria:** `pnpm install && pnpm dev:optus`, log in with demo credentials, land on `/overview`, and see a UI that closely matches the Optus brand including the official-style logo and favicon committed under `public/brand/`.
