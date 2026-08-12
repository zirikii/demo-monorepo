# Build Employment Hero Demo — Marketing Site, Auth, and Platform

## Mission

Scaffold a production-quality **Employment Hero UI clone** for demo purposes that looks and
feels like the real product at <https://employmenthero.com/>. Dummy data, mock auth,
localStorage persistence. No real external services.

**Deliverable:** a single PR against `main` in demo-monorepo with:

1. A complete, lint-clean, build-passing app under `apps/employment-hero/`
2. A **computer-use screen recording** of testing the running app (plus key screenshots)
3. PR description covering summary, fidelity, verification, test plan, demo credentials,
   and limitations

## Company profile

- **Product:** Employment Hero — an AI "Employment Operating System" (eOS) covering
  hiring, HR, payroll, and employee experience for SMEs, plus HeroForce (employer of
  record / managed employment).
- **Primary users:** business owners and people/payroll teams at 10–2,000 person
  companies; employees; job seekers; and accounting/bookkeeping partners.
- **Core surfaces to clone:** audience-segmented mega-menu header, homepage, product
  pages (Hiring, HR, Payroll, Employee Experience, HeroForce), pricing, resources/blog,
  case studies, job board, partner network, login, and an authenticated platform.
- **Dummy-data theme:** realistic Australian SME employment data — award-covered
  hospitality, retail, NDIS, construction and software companies; AU payroll concepts
  (STP Phase 2, super, Payday Super, awards, leave accruals).

## Repo context

- Repo: `demo-monorepo` (pnpm workspace)
- App lives at `apps/employment-hero/`, package name `employment-hero-demo`, dev port
  **5180** (next free after commbank's 5179).
- Root scripts `dev:employment-hero` / `build:employment-hero` must be wired up.

## Target tech stack (match sibling Vite apps)

| Layer     | Technology                                            |
| --------- | ----------------------------------------------------- |
| Framework | Vite 6 + React 19 + TypeScript (strict)               |
| Styling   | Tailwind v4 via `@tailwindcss/vite`, `@theme` tokens  |
| Routing   | `react-router-dom` v7 `BrowserRouter`                 |
| Icons     | `lucide-react`                                        |
| State     | React context + hooks                                 |
| Data      | Local TypeScript seed modules                         |
| Auth      | Mock session — base64 JSON in `localStorage`          |
| Tests     | Vitest + React Testing Library                        |
| Lint      | ESLint 9 flat config (copy the `nine`/`commbank` one) |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payment
providers.

## Brand assets

`employmenthero.com` and every logo CDN are unreachable from the cloud build environment
(connection reset at the egress proxy), so the artwork in `public/brand/` is a
hand-authored recreation from the logo supplied with the task: a rounded-square "hero"
symbol plus the lowercase `employment hero` wordmark. `scripts/fetch-brand-assets.sh`
records the canonical upstream URLs and re-fetches them when the network allows.

**Required files in `public/brand/`:** `symbol.svg`, `symbol-purple.svg`, `logo.svg`,
`logo-white.svg`, `favicon.svg`, `og-image.svg`, `brand-assets.json`.

Self-host only — no external hotlinks in the UI. Never invent a logo when a real asset is
obtainable.

## Design system — match the real UI

- Primary brand colour **Purple Heart `#7622D7`**, near-black **`#212529`**, white.
  Supporting violets and tints for section washes; lime/amber/sky accents for badges.
- Rounded geometry: pill buttons, generous card radii (16–28px).
- Typography: Poppins as the free stand-in for Employment Hero's Saiga wordmark font,
  Inter for body copy (their product uses Untitled Sans).
- Voice: short declarative headline fragments with a full stop —
  "Employment. Intelligently Run."
- Layout: audience-segmented mega-menus (Businesses / Partners / Employees / Job Seekers),
  alternating feature rows, stat strips, tabbed content switchers, and a closing CTA band.

Build reusable primitives: `AppShell`, `SiteHeader`, `SiteFooter`, `PageHero`, `Section`,
`Button`, `Card`, `Badge`, `Field`, `Tabs`, `Accordion`, `Stat`, `Avatar`, `EmptyState`,
`DataTable`.

## Application structure

Organise by feature under `apps/employment-hero/src/`:

```
components/  ui/ layout/ marketing/ platform/ brand/
data/        nav, products, pricing, industries, blog, case studies, jobs, platform seeds
hooks/       useAuth, useWorkspace, useDocumentTitle
lib/         auth, storage, format, search, cn
pages/       marketing pages (flat) + platform/ subfolder
test/        Vitest suites + setup.ts
```

## Pages

Marketing: home, Employment OS, products (hiring, HR, payroll, employee experience,
HeroForce, SmartMatch/find-candidates, Swag Spend, earned wage access), solutions index +
detail, industries index + detail, pricing, integrations, AI commitment, EH Work,
job board + job detail, partner network (+ referral, certified, directory), resources hub
(+ four audience hubs), blog + article, newsroom, webinars, case studies + detail,
about us, careers, contact, request a demo, start free, support, Hero Foundation, media
centre, legals (privacy, terms, accessibility), search, login, 404.

Platform (authenticated): dashboard, people directory + employee detail, hiring/ATS,
payroll runs, leave, performance, reports, settings.

## Auth (mock)

Any credentials work. Session is a base64 JSON blob in `localStorage` under
`employment-hero-demo-session`. `/start-free` creates a session and lands on `/platform`.
Protected routes redirect anonymous users to `/login?redirect=…`.

## Intentional demo bug (required)

Reproduce the CommBank-style login crash, tracked as Jira **DR-20** with labels `bug`,
`employment-hero`, `low`:

`src/pages/Login.tsx` defines `portalConfig` keyed by display-cased names (`Employer`,
`Employee`, `Payroll`) but looks the entry up with the lowercase `?portal=` query value
(defaulting to `employer`). An `as keyof typeof portalConfig` cast hides the mismatch from
TypeScript, so typecheck, lint, and unit tests all pass — the page only fails at render
time with `Uncaught TypeError: Cannot read properties of undefined (reading 'name')`.

The rest of the app must stay fully usable, so `/start-free` remains the working way into
the platform.

## Tests (minimum)

Vitest + RTL covering: formatters, auth encode/decode round-trip, mock login, nav data
integrity, header mega-menu interaction, pricing plan toggle, job board filtering,
platform leave/payroll actions, and a test that **documents** the intentional login crash
rather than failing on it.

## Computer-use verification (required before PR)

After lint, typecheck, build and unit tests pass, start the app and use browser automation
to walk: homepage → a product page → pricing → start free → platform dashboard → one
platform interaction → the broken `/login` page. Record the walkthrough to video and
capture stills of the hero surfaces and the crash.

## README

Unofficial demo disclaimer (not affiliated with Employment Hero), setup, demo
credentials, route table, structure tour, the intentional bug and how to fix it, scripts.

## Constraints

- No lorem ipsum — realistic Australian employment copy.
- No real secrets in committed files.
- No real AI/integrations — simulate with timers and canned responses.
- Prefer many small files over monoliths.
- Commit incrementally; if blocked, decide, document, continue.
