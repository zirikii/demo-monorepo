# Build Optus Demo — Marketing Site, Auth, and My Optus Dashboard

## Mission

Scaffold a production-quality **Optus (optus.com.au) UI clone** for demo purposes that
looks and feels like the real telco site. This is a UI/UX fidelity demo, not a production
app: dummy data, mock auth, local env vars, JSON/markdown persistence. No real external
services.

**Deliverable:** a single PR that adds `apps/optus` to the demo-monorepo (a pnpm
workspace), lint-clean and build-passing, runnable via `pnpm dev:optus`.

## Company profile

- **Product:** Australian telecommunications carrier — postpaid & prepaid mobile plans,
  handsets on plans, nbn and 5G Home Internet, and entertainment (Optus Sport, SubHub).
- **Primary users:** Australian consumers managing services in the **My Optus** account
  portal, and prospective customers shopping plans/phones.
- **Core surfaces to clone:** marketing landing, mobile plans, phones, internet,
  entertainment, and the authenticated **My Optus** dashboard (usage, bills, recharge,
  plans, settings).
- **Dummy-data theme:** AUD billing, Australian cities/stores, realistic plan and device
  names ("Optus Choice Plus", Samsung/Apple handsets), Aussie customer names.

## Repo context

- Monorepo: `demo-monorepo` (pnpm workspace, `apps/*` + `packages/ui`).
- New app under `apps/optus`, package name `optus-web-demo`, Next.js 15 + React 19 + TS +
  Tailwind v3, mirroring the existing `apps/spark` telco demo. Consume `@demo/ui`.

## Target tech stack (mirror apps/spark)

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 App Router, React 19 |
| Styling | Tailwind v3 + CSS vars |
| Components | Radix primitives + local `components/ui/*` |
| Icons | lucide-react |
| Forms | react-hook-form + zod (where applicable) |
| Tables | @tanstack/react-table |
| Data | Local JSON seed files + markdown content |
| Auth | Mock session via HTTP-only signed cookie (jose HS256) + middleware |
| API | Route handlers reading/writing local JSON |
| Tests | Vitest + React Testing Library |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payments.

## Brand assets

- Primary wordmark provided inline in the task (the "optus" lettering SVG). Self-host under
  `public/brand/`.
- **Egress note:** optus.com.au CDN is unreachable from the cloud VM (connection reset), so
  real photography cannot be fetched. Use the provided wordmark, derive white/mark variants,
  and build imagery from Optus-yellow color blocks and gradients instead of external photos.
- Required files in `public/brand/`: `logo.svg` (ink wordmark), `logo-white.svg` (reversed),
  `logo-mark.svg` + `favicon.svg` (yellow spark mark), `brand-assets.json` manifest.
- Add `scripts/fetch-brand-assets.sh` documenting the intended official sources for when
  egress is enabled.

## Design system — Optus brand

- Yellow `#FBCC30` (brand spark / highlights / hero blocks), yellow-dark `#E6B620`,
  yellow-light `#FEF3D0`.
- Ink/"midnight" `#142433` (dark surfaces, text, primary buttons), ink-soft `#47535F`.
- Secondary accents: teal `#009E9B`, coral `#FF6B57`, green `#00A94F`.
- Surfaces white / `#F6F7F8` / `#EDEFF1`; lines `#E2E5E8`.
- Radii: lg 12px / md 8px / sm 6px. Font: Inter/Nunito Sans via `next/font`.
- Establish these in `tailwind.config.ts` + `app/globals.css` — never reuse another app's
  palette.

Reusable primitives: SiteHeader/SiteFooter, Button (ink primary + yellow brand variants),
Badge, Accordion, Card patterns, EmptyState, LoadingSkeleton, DataTable.

## Pages

### Marketing
- `/` landing — yellow hero, plan highlights, device showcase, internet + entertainment
  promos, coverage teaser, "why Optus" grid, app-download CTA.
- `/mobile-plans` — SIM-only Choice plans (data, price, features), plan cards.
- `/phones` — device catalog (repayment + plan pricing).
- `/internet` — nbn + 5G Home Internet plans.
- `/prepaid` — prepaid plans + recharge promo.
- `/entertainment` — Optus Sport / SubHub tiles.
- `/deals` — current offers.
- `/stores` — store finder list.
- `/login`, `/signup` — mock auth; any credentials work, pre-filled demo creds.

### My Optus (route group `(myoptus)`, protected)
- `/dashboard` — usage %, next bill, last recharge, quick actions.
- `/usage` — data/talk/text meters.
- `/plans` — current plan + add-ons.
- `/bills` — paginated bill history table.
- `/recharge` — recharge (top-up) form writing to JSON.
- `/settings` (+ `account`, `profile`, `team`, `integrations`) — team table CRUD,
  integration toggles persisted to JSON.

## Data & API
- JSON seed under `data/`: users, plans, phones, internet, prepaid, bills, recharges,
  stores, deals, entertainment, settings (team + integrations + profile). 20+ rows where
  pagination/filtering is exercised.
- Route handlers under `app/api/`: `auth/{login,logout,signup}`, `bills`, `recharge`
  (GET/POST), `settings/team` (GET/POST/DELETE), `settings/integrations` (GET/PATCH).
- Atomic JSON writes (temp file + rename), en-AU / AUD formatting via `Intl`.

## Auth (mock)
`middleware.ts` protects `(myoptus)` routes → redirect to `/login?redirect=...`. Session in
signed HTTP-only cookie (`optus_demo_session`, jose HS256, `DEMO_AUTH_SECRET` fallback
`change-me`). Logout clears cookie. Login accepts any credentials.

## Tests (minimum)
- `format.test.ts` (AUD + date formatting)
- `session.test.ts` (encode/decode round-trip + tamper rejection, node env)
- `myoptus-nav.test.tsx` (active nav state)
- `plan-card.test.tsx` (renders + onSelect)
- `api/recharge/route.test.ts` (POST appends, rejects invalid)

## README + env
Replace with Optus overview (unofficial demo, not affiliated), setup, demo credentials,
structure tour, JSON persistence notes. `.env.example` with `NEXT_PUBLIC_APP_NAME`,
`NEXT_PUBLIC_APP_URL`, `DEMO_AUTH_SECRET`, `DEMO_ADMIN_EMAIL`, `DEMO_ADMIN_PASSWORD`.

## Workspace wiring
Add `dev:optus` / `build:optus` scripts to root `package.json`. `pnpm-workspace.yaml`
already globs `apps/*`. Document the app in root `README.md` and `AGENTS.md` (Next apps
collide on port 3000 — run with `PORT=...`).

## Implementation order
1. Brand assets → `public/brand/` + fetch script  2. Config + workspace wiring  3. Tokens +
globals + ui primitives  4. Types, seed data, content  5. Mock auth + middleware  6. App
shell + nav  7. Landing (hero)  8. Remaining marketing screens  9. My Optus screens
10. Settings  11. API routes  12. Tests  13. README + lint/build/test + PR.

## Constraints
- No lorem ipsum — realistic Australian telco copy.
- No real secrets committed. No real integrations — simulate.
- Many small files over monoliths. Commit incrementally.

**Success criteria:** `pnpm dev:optus`, log in with demo credentials, land on the My Optus
dashboard, and see a UI that closely matches Optus — yellow-forward branding with the
official wordmark and spark favicon under `public/brand/`, not placeholders. Codebase spans
`app/`, `components/`, `lib/`, `content/`, `data/`.
