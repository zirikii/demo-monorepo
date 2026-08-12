# Build Employment Hero Demo — Full Landing, Auth, and HR Portal

## Mission

Scaffold a production-quality **Employment Hero UI clone** for demo purposes that looks and feels like the real product at https://employmenthero.com/ (and the attached official logo mark). Dummy data, mock auth, local env vars, markdown/JSON persistence. No real external services.

**Deliverable:** a single PR against `main` in demo-monorepo with:
1. A complete, lint-clean, build-passing Vite app under `apps/employment-hero/`
2. A **computer-use screen recording** of testing the running app (plus key screenshots)
3. An intentional login rendering bug (same class of defect as CommBank DR-19)
4. A Jira ticket in project DR with labels `bug`, `employment-hero`, `low` and a plain-text description
5. PR description covering summary, fidelity, verification, test plan, demo credentials, and limitations

## Company profile

- **Product:** Employment OS — all-in-one HR, payroll, hiring, benefits, and employee experience for SMBs and mid-market
- **Primary users:** HR managers, people leaders, payroll admins, and employees in AU/NZ/UK/SG/CA
- **Core surfaces to clone:** Marketing home, Pricing, Product pages (Employment OS, HR, Payroll, Recruitment, Benefits, Learning, Time & attendance), Solutions, Customers, Blog, About, Careers, Contact, Request demo, Login/Signup, and a mock HR portal (People, Leave, Payroll, Recruitment, Settings)
- **Dummy-data theme:** Australian/NZ SME companies, employees, leave requests, pay runs, job requisitions — realistic names, not lorem

## Repo context

- Repo: `demo-monorepo`
- Place under `apps/employment-hero/`. Wire root `package.json` scripts (`dev:employment-hero`, `build:employment-hero`), `README.md`, and `AGENTS.md`. Match neighboring Vite apps (commbank/changi/nine): Vite 6 + React 19 + Tailwind v4 + TypeScript + react-router-dom 7. Default port **5180**.

## Target tech stack (mimic Employment Hero marketing + SPA peers)

| Layer | Technology |
|-------|------------|
| Framework | Vite 6 + React 19 + TypeScript + react-router-dom 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) with EH brand tokens |
| Components | Local primitives + lucide-react |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Tables | plain tables / lists (optional @tanstack/react-table for People) |
| State | React context + hooks + localStorage |
| Data | Local JSON/TS seed files + markdown content |
| Auth | Mock session in localStorage (any credentials) — **with intentional login crash** |
| API | Client-side modules reading seed data |
| Tests | Vitest + React Testing Library |
| Lint/format | ESLint + Prettier |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payment providers.

## Brand assets — source real files (do this first)

**Sources to try (in order):**
1. User-attached official Employment Hero logo (horizontal lockup: circular two-heads mark + lowercase “employment hero” wordmark)
2. Recreate faithful SVG lockup + favicon from that mark when CDN fetch is blocked by egress
3. Brand purple from public sources: `#7622D7` (Purple Heart), ink `#212529`, white

**Required files in `public/brand/`:**
- `logo.svg` — full horizontal lockup (mark + wordmark), dark
- `logo-white.svg` — white lockup for dark/purple heroes
- `mark.svg` — circular emblem only
- `favicon.svg` — mark-based favicon
- `brand-assets.json` — provenance + palette
- `scripts/fetch-brand-assets.sh` — documents sources / regenerates local SVGs

Self-host only — no external hotlinks. Never invent a random third-party pack logo.

## Design system — match the real UI

- Primary: `#7622D7` (EH purple), hover `#5E1BB0`, tint `#F3E9FF`
- Ink: `#212529`, soft `#5C636A`, faint `#8B9298`
- Surfaces: white `#FFFFFF`, soft `#F7F5FB`, deep `#EEEAF6`
- Accents: success green, coral highlight for CTAs secondary to purple
- Type: geometric sans — `@fontsource/dm-sans` (400–700)
- Radii: 8 / 12 / 20; soft shadows; generous marketing whitespace
- Hero: purple/gradient full-bleed atmosphere with brand-forward wordmark; one headline + one CTA group
- Motion: fade-up on hero/sections, subtle CTA hover

Build reusable primitives: AppShell, SiteHeader/Footer, PageHero, Section, Button, Badge, Card (interaction only), Field, Accordion, EmptyState, LoadingSkeleton, DemoRibbon.

## Intentional demo bug (required — like CommBank)

Mirror CommBank’s login crash pattern:

- In `src/pages/Login.tsx`, define a `portalConfig` keyed by **PascalCase** display names (`Employer`, `Employee`, `Payroll`)
- Look up with **lowercase** query values (`employer` default, `employee`, `payroll` from nav)
- Cast with `as keyof typeof portalConfig` so TypeScript/lint/tests pass
- Reading `portal.name` throws: `Cannot read properties of undefined (reading 'name')` → blank login page

Do **not** document the bug in README as “how to fix”; track it via Jira only (plain paragraph description). Optionally mention intentional demo defect briefly in AGENTS.md like nine/commbank patterns.

## Application structure

Build a large, navigable codebase (~100–140+ files) under `apps/employment-hero/`:

```
src/
  App.tsx main.tsx index.css
  components/ ui/ layout/ marketing/ portal/
  data/ content/ hooks/ lib/
  pages/ (marketing) pages/portal/ (app)
  test/
public/brand/
scripts/
```

## Pages — detailed requirements

### Marketing
- `/` Landing — hero, product pillars, logo bar, how-it-works, testimonials, pricing teaser, footer
- `/pricing` — tiers (HR Essentials, HR Engage, HR Elite, Employment Unlimited), FAQ
- `/products`, `/products/employment-os`, `/products/hr`, `/products/payroll`, `/products/recruitment`, `/products/benefits`, `/products/learning`, `/products/time-attendance`
- `/solutions`, `/solutions/small-business`, `/solutions/enterprise`, `/solutions/accountants`
- `/customers`, `/customers/:slug`
- `/resources`, `/blog`, `/blog/:slug`
- `/about`, `/careers`, `/partners`, `/contact`, `/request-demo`
- `/regions/au`, `/regions/nz`, `/regions/uk`, `/regions/sg`
- Legal: `/privacy`, `/terms`, `/security`
- Auth: `/login` (BUGGY), `/signup`
- `/search`, 404

### HR portal (mock, after auth)
- `/portal` overview dashboard
- `/portal/people`, `/portal/leave`, `/portal/payroll`, `/portal/recruitment`, `/portal/settings`
- Protect with RequireAuth → redirect `/login?redirect=...` (which also crashes)

Copy in `content/` markdown or TS content modules. Responsive.

## Data layer
Realistic AU/NZ SME dummy data: 25+ people, leave requests, pay runs, jobs, blog posts, customer stories.

## Env vars (`.env.example`)
```
VITE_APP_NAME=Employment Hero
VITE_APP_URL=http://localhost:5180
DEMO_AUTH_SECRET=change-me
DEMO_ADMIN_EMAIL=admin@example.com
DEMO_ADMIN_PASSWORD=demo
```

## Auth (mock)
Any email/password accepted **once Login renders**. Signed-style localStorage session. Logout clears session. Because of the intentional bug, Login never renders successfully on the happy path until fixed — that is deliberate.

## Code quality
TypeScript strict (avoid `any`), ESLint/build clean, accessible, responsive, comments only for non-obvious logic. Use `cn` from `@demo/ui/cn`. Include `<DemoRibbon>` in header.

## Tests (minimum)
Vitest + RTL: formatters/auth encode-decode, nav active state, pricing tiers render, one data helper. Script: `"test": "vitest run"`. Do not write a test that asserts Login renders successfully (would fail due to intentional bug); auth unit tests stay at lib level.

## Computer-use verification (required before PR)

1. Start `pnpm dev:employment-hero`
2. Walk landing (logo visible), pricing, a product page; attempt login and capture the blank crash
3. Record screen video + screenshots
4. Attach artifacts in PR body

## README
Unofficial demo disclaimer (not affiliated with Employment Hero), setup, demo credentials, structure, scripts. Do not spell out the login bug fix recipe in README (Jira owns that).

## Implementation order
1. Fetch/create brand assets
2. Install deps / wire monorepo
3. Design tokens + primitives
4. Seed data + content
5. Mock auth + intentional login bug
6. Shell + marketing pages
7. Portal screens
8. Unit tests
9. README + lint/build/test
10. Computer-use verification + screen recording
11. Create Jira DR ticket (plain text description; labels bug, employment-hero, low)
12. Open PR with artifacts

## PR requirements
Branch `cursor/employment-hero-demo-d839`. Title: **feat: Employment Hero demo — landing, auth, portal, intentional login bug**.

## Constraints
- No lorem ipsum — realistic Employment OS copy.
- No real secrets.
- Prefer many small files.
- Purple brand colour is required (official EH purple) despite generic AI-design avoidances — this is an existing brand system.

**Success criteria:** app runs; marketing pages work; `/login` crashes like CommBank; official-style logo under `public/brand/`; Jira ticket created; computer-use recording attached; PR open.
