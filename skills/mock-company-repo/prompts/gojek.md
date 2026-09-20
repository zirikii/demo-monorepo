# Build Gojek (gojek.io) Demo — Full Landing, Auth, and Tech Portal

## Mission

Scaffold a production-quality **Gojek Tech (gojek.io) UI clone** for demo purposes that looks and feels like the real product at https://www.gojek.io/. Dummy data, mock auth, local env vars, markdown/JSON persistence. No real external services.

This is the **engineering / Super App tech site**, not the consumer gojek.com app. Visual north star: a near-black typographic marketing site with the official Solv + wordmark lockup, Gojek green CTAs, product category tabs, open-source grid, and the careers / Life@Gojek / blog IA.

**Deliverable:** a single PR against `main` in demo-monorepo with:
1. A complete, lint-clean, build-passing app under `apps/gojek/`
2. A **computer-use screen recording** of testing the running app (plus key screenshots)
3. PR description covering summary, fidelity, verification, test plan, demo credentials, and limitations

## Company profile

- **Product:** Gojek Tech site for Southeast Asia’s leading on-demand Super App — 20+ products across transport, food, payments, daily needs, business, and entertainment, plus an engineering blog, Life@Gojek culture pages, careers, and open-source projects.
- **Primary users:** Engineers and candidates exploring Gojek Tech; recruiters; open-source contributors; journalists looking up scale facts.
- **Core surfaces to clone:** Home (`/`), About us, Life@Gojek, Blogs & News (+ post), Join us / Careers (+ job), Products (+ detail), Open source (+ project), Login / Signup, applicant Tech Portal (applications, saved jobs, OSS watchlist, settings).
- **Dummy-data theme:** Real Gojek product names (GoRide, GoFood, GoPay…), real OSS repos (Ziggurat, Heimdall, Proctor, ProbeD, Kubehandler, Kingsly, Weaver, Darkroom, Courier), realistic Jakarta / Singapore / Bangalore / Makassar roles, and published engineering-blog titles.

## Repo context

- Repo: `demo-monorepo`
- Existing pnpm workspace with Vite + React 19 marketing clones (atlassian, commbank, paytm, …). Scaffold under `apps/gojek/`. Match neighboring Vite apps: Tailwind v4, `@demo/ui` `cn` + `DemoRibbon` + `asset`, port **5184**, root scripts `dev:gojek` / `build:gojek`. Do not dump files at the monorepo root.

## Target tech stack (mimic neighboring Vite demos)

| Layer | Technology |
|-------|------------|
| Framework | Vite 6 + React 19 + TypeScript + React Router 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + app-local `@theme` tokens |
| Components | Hand-rolled primitives (Button, Field, Tabs, DataTable, Dialog) |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Tables | @tanstack/react-table (careers + portal applications) |
| State | React context + hooks |
| Data | Local JSON / TS seed files + markdown content |
| Auth | Mock session via encoded localStorage token (SPA equivalent of HTTP-only cookie) |
| API | Local modules reading/writing JSON + localStorage |
| Tests | Vitest + React Testing Library |
| Lint/format | ESLint + Prettier (repo root config) |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payment providers.

## Brand assets — source real files (do this first)

**Sources to try (in order):**
1. The official header lockup SVG supplied with the request (Solv + “gojek” wordmark, white fills) — write this verbatim to `public/brand/logo-white.svg`.
2. Same paths with `fill="#00AA13"` → `logo-green.svg` and `fill="#25282A"` → `logo-black.svg`.
3. Solv mark only (first two paths of the lockup) → `solv.svg` and `favicon.svg`.
4. Wikimedia Commons fallbacks: `https://commons.wikimedia.org/wiki/Special:FilePath/Gojek_logo_2022.svg` and `Gojek_logo_2019_white_text.svg`.
5. Official brand book colours from `https://lelogama.go-jek.com/gojeks_brand_guideline.pdf` and Asphalt: Gojek green `#00AA13`, charcoal `#25282A`.

**Required files in `public/brand/`:**
- `logo-white.svg` — header lockup on black
- `logo-green.svg` — green lockup for light/login surfaces
- `logo-black.svg` — charcoal lockup
- `solv.svg` — Solv logomark only
- `favicon.svg` — Solv mark for the browser tab
- `brand-assets.json` — provenance for every file

Fetch with curl into `public/brand/` where a remote original exists, write `brand-assets.json`, add `scripts/fetch-brand-assets.sh`, wire favicon + header logo. No external hotlinks. Never invent a fake logo. The user-supplied SVG is the visual source of truth for the wordmark.

## Design system — match the real UI

gojek.io is a **near-black, typographic poster site**. Few photographs. Huge stacked headlines. Green is reserved for Join us / primary CTAs.

Tokens (app-local, never share Tailwind configs):
- Background `#000000`, elevated surface `#0d0d0d`, card `#141414`
- Text `#ffffff`, secondary `rgba(255,255,255,0.62)`, faint `rgba(255,255,255,0.4)`
- Gojek green `#00AA13`, hover `#008f10`
- Brand charcoal `#25282A`
- Entertainment pink `#DF1995` (GoPlay / news category only)
- Hairline `#2a2a2a`
- Font: Outfit (Maison Neue stand-in) for display + UI; no invented brand typefaces
- Radius: sharp cards (0–4px); Join us CTA is a rounded-full green pill
- Header: sticky, transparent-to-black, white lockup left, text links + green Join us right
- Footer: large socio-economic CTA, site links, social (LinkedIn, X, Instagram, YouTube, GitHub), “Gojek tech | 2026 All Rights Reserved”

Build reusable primitives: AppShell/PageLayout, SiteHeader/SiteFooter, PageHeader, DataTable, Badge, Button variants, Dialog/Sheet, EmptyState, LoadingSkeleton, Toast.

Visual-fidelity checklist (home):
- Official Solv + gojek wordmark in the header and Solv favicon in the tab
- Hero copy exactly: “3 Countries. 20+ Products. 1 leading on-demand platform.”
- Subhead: “Once a call-centre operation in Jakarta, now a Decacorn in Southeast Asia.”
- Category tabs: Transport & Logistics, Food & Shopping, Payments, Daily needs, Business, News & Entertainment
- Open-source line: “We ❤️ open source.”
- Tech facts: JRuby/Java/Clojure/Go clusters; ~1000 orders per sentence; 350M internal API calls/sec; 2M drivers at 180k live orders
- Computer-use recording of landing → login → portal → one interaction

## Application structure

Build a large, navigable codebase (~100–140 files) organized by feature under `apps/gojek/`:

```
src/
  pages/  login/ signup/ portal/ settings-equivalent
  components/  ui/ layout/ marketing/ blog/ careers/ portal/ brand/ auth
  lib/ hooks/ content/ data/ test/
public/brand/
```

## Pages — detailed requirements

### Marketing landing (`/`)
Hero (exact headline), impact stats (900k food merchants, ~190M downloads, 1100% growth 2016–2019, $7B+ Indonesian economy 2019), “Our tech powers Southeast Asia”, product category tabs + product tiles, “We ❤️ open source.” grid (Ziggurat, statsd-docker, Proctor, ProbeD, Kubehandler, Heimdall, Kingsly), stacked tech-fact statements, Join us band, footer. Copy in `content/landing/*.md`. Responsive.

### About us (`/about`)
Origin story (2010 call centre → 2015 app → Super App / GoTo), three engineering hubs (Jakarta, Singapore, Bangalore), impact numbers, product map teaser.

### Life@Gojek (`/life-at-gojek`)
Culture: “We ardently believe failing is learning.” Ways of working (everyone codes, leaders earn respect, complementary strengths, TDD, pair programming). Benefits. Employee stories from dummy-but-realistic engineers.

### Blogs & News (`/blog`, `/blog/:slug`)
12+ posts using real public titles (Courier OSS, Darkroom, Clickstream, Atlas, Kubehandler, “Why we ask for code”, SET interview, etc.). Filter by tag. Detail page with body from markdown.

### Join us / Careers (`/careers`, `/careers/:slug`)
“Find jobs in our ecosystem” + GoTo Financial / GoTo Group cards. “Hard to get into, harder to leave. (A chance to build Southeast Asia)”. Location filter + `@tanstack/react-table` of 25+ roles (Singapore data science, Makassar / Semarang / Lampung / Samarinda zone roles, Jakarta / Bangalore engineering). Job detail + Apply (auth-gated).

### Products (`/products`, `/products/:slug`)
All 20+ products grouped by the six categories with the real one-liners (GoRide “Your two-wheeler taxi, the indigenous Ojek.”, GoCar “Comfort on wheels. Sit back. Sleep. Snore.”, etc.).

### Open source (`/open-source`, `/open-source/:slug`)
Homepage seven plus Weaver, Darkroom, Courier, Draftsman. Language / stars (dummy) filters.

### Login / Signup
Demo mode: **any credentials work** (muted hint). Seeded `demo@gojek.io` / `demo`. Login → `/portal`. Signup persists to localStorage (seed `src/data/users.json`) and auto-logs in.

### Dashboard shell (`/portal`)
Persistent dark nav matching the marketing chrome plus portal links: Overview, Applications, Saved jobs, Open source, Settings. {{NAV_SPEC}} public: About us · Life@Gojek · Blogs & News · Join us. Authenticated: Portal · Settings · Log out.

### Core product screens
Applicant overview with saved jobs + application pipeline. Applications table (status: drafted / submitted / take-home / onsite / offer). Saved jobs. OSS watchlist toggles. Job apply dialog writes JSON.

### Settings
Account, Profile, Team (hiring squad), Integrations (GitHub / Greenhouse / Slack toggles persisted to JSON).

## Data layer
Realistic Super App dummy data (25+ jobs, 20+ products, 12+ posts). Atomic JSON writes from lib modules + localStorage. Markdown content with frontmatter-style exports.

## Env vars (`.env.example`)
```
VITE_APP_NAME=Gojek
VITE_APP_URL=http://localhost:5184
DEMO_AUTH_SECRET=change-me
DEMO_ADMIN_EMAIL=demo@gojek.io
DEMO_ADMIN_PASSWORD=demo
```

## Auth (mock)
Protect `/portal/*`; unauthenticated → `/login?redirect=...`. Encoded localStorage session. Logout clears session. Any email/password pair creates/returns a session (demo mode).

## Code quality
TypeScript strict (avoid `any`), ESLint/build clean, accessible, responsive, comments only for non-obvious logic. Exhaustive `never` defaults on union switches. Imports at top of file. Class joiner is `cn` from `@demo/ui/cn`.

## Tests (minimum)
Vitest + RTL: formatters, auth encode/decode, hero product tabs, nav active state, careers table filter, one data helper. Script: `"test": "vitest run"`.

## Computer-use verification (required before PR)

After lint/build/unit tests pass:

1. Start `pnpm dev:gojek`.
2. Walk: marketing landing + brand logo → Login with demo credentials → Portal → one interaction (filter careers or submit an application).
3. Record the entire walkthrough; stills of landing, login, portal.
4. Confirm no obvious console errors.
5. Attach recording + screenshots in the PR body.

## README
Unofficial demo disclaimer (not affiliated with Gojek / GoTo / PT Gojek Indonesia), setup, demo credentials, structure tour, JSON persistence notes, scripts.

## Implementation order
1. Fetch / write brand assets
2. Install deps
3. Design tokens + global CSS + primitives
4. Types, seed data, content
5. Mock auth + route protection
6. App shell + nav (real logo)
7. Hero product screen (match gojek.io)
8. Remaining product screens
9. Settings
10. Marketing + auth pages
11. API / JSON persistence
12. Unit tests
13. README + lint/build/unit test
14. Computer-use verification + screen recording
15. Open PR with artifacts

## PR requirements
Branch `cursor/gojek-demo-a088`. Title: **feat: Gojek demo — landing, auth, and dashboard**.

PR body must include:
- Summary
- Screenshots + **computer-use verification recording**
- Test plan checklist
- Demo credentials
- Known limitations

## Constraints
- No lorem ipsum — realistic Super App / engineering copy.
- No real secrets in committed files.
- No real AI/integrations — simulate.
- Prefer many small files over monoliths.
- Commit incrementally; if blocked, decide, document, continue.
- Do not merge the PR.

**Success criteria:** app runs; login with demo credentials reaches the portal; UI closely matches https://www.gojek.io/ with official logo/favicon under `public/brand/`; computer-use walkthrough was recorded; PR is open with verification artifacts. Codebase is large enough that exploring it requires reading across multiple directories.
