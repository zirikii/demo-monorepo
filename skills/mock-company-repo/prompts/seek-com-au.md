# Build SEEK Demo - Full Landing, Auth, and Dashboard

## Mission

Refresh the existing `apps/seek` demo into a production-quality, unofficial **seek.com.au UI clone** for demo purposes. It should look and feel like SEEK's Australian jobs marketplace: prominent "What / Where" job search, SEEK blue and pink brand language, job search results with a sticky job details view, company discovery, saved jobs, applications, profile, settings, and career advice. Dummy data, mock auth, local JSON persistence. No real external services.

**Deliverable:** a single PR against `main` in `demo-monorepo` with:

1. A complete, lint-clean, build-passing app
2. A computer-use screen recording of testing the running app, plus key screenshots
3. PR description covering summary, fidelity, verification, test plan, demo credentials, and limitations

## Company profile

- **Product:** SEEK is Australia's employment marketplace for job search, applications, candidate profiles, company research, and career advice.
- **Primary users:** Australian job seekers researching roles, saving jobs, applying quickly, and managing career activity.
- **Core surfaces to clone:** public landing with job search, pricing-free account signup/login, job search results, sticky job detail panel, company profiles, candidate dashboard, saved jobs, saved searches, applied jobs, profile builder, settings.
- **Dummy-data theme:** fictional Australian employers, suburbs, industries, salaries, job ads, applications, saved searches, and career-advice content.

## Repo context

- Repo: `demo-monorepo`
- Existing app: `apps/seek`, package `seek-marketplace-demo`, Next.js 15 App Router + React 19 + TypeScript + Tailwind. Preserve the existing monorepo placement, scripts, mock auth, JSON data, and `@demo/ui/cn` usage.

## Target tech stack

| Layer       | Technology                                              |
| ----------- | ------------------------------------------------------- |
| Framework   | Next.js 15 App Router + React + TypeScript              |
| Styling     | Tailwind v3 with SEEK/Braid-inspired tokens             |
| Components  | shadcn/ui-style primitives with Radix UI                |
| Icons       | lucide-react                                            |
| Forms       | react-hook-form + zod                                   |
| Tables      | @tanstack/react-table                                   |
| State       | React context + hooks                                   |
| Data        | Local JSON seed files + markdown content                |
| Auth        | Mock session via HTTP-only signed cookie + middleware   |
| API         | Route handlers / local modules reading and writing JSON |
| Tests       | Vitest + React Testing Library                          |
| Lint/format | ESLint + Prettier                                       |

Explicitly do not integrate real databases, cloud providers, CMS APIs, OAuth, payment providers, or real SEEK APIs.

## Brand assets - source real files

**Sources to try in order:**

1. SEEK Developer Apply with SEEK brand guidelines: `https://developer.seek.com/use-cases/apply-with-seek/brand-guidelines`
2. SEEK Developer assets page: `https://developer.seek.com/introduction/assets`
3. Existing self-hosted app assets under `apps/seek/public/brand/`
4. If downloads are blocked, keep the recreated SVG assets but document them as approximations in `brand-assets.json` and `README.md`.

**Required files in `public/brand/`:**

- `logo.svg`
- `logo-white.svg`
- `logo-mark.svg`
- `icon.svg`
- `brand-assets.json`

Fetch with `scripts/fetch-brand-assets.sh` where possible. No external hotlinks. Never invent a third-party logo.

## Design system - match seek.com.au

- Use SEEK Pink `#E60278` for primary actions and active states.
- Use official SEEK Blue `#0D3880` for the public hero/search band where fidelity requires it.
- Keep SEEK Navy `#2E3849` for text, panels, and dark UI surfaces.
- Use Braid-like simple rounded cards, restrained borders, high-contrast labels, large search controls, and accessible focus rings.
- Prefer app tokens and Tailwind utilities over inline styles.

Reusable primitives already exist: AppShell, Sidebar/TopNav, PageHeader, DataTable, Badge, Button variants, Dialog/Sheet, EmptyState, LoadingSkeleton, Toast.

## Application structure

Keep the app under `apps/seek/`:

```
app/
  (marketing)/ oauth/ (app)/ api/
components/
  ui/ layout/ marketing/ search/ jobs/ dashboard/ saved/ searches/ applied/ profile/ settings/
lib/
  auth/ constants/ content/ data/ types/ utils/
content/
data/
public/brand/
```

## Pages - detailed requirements

### Marketing landing (`/`)

Hero, CTAs, large "What / Where" job search, quick-search chips, classification grid, account benefits, employer discovery, career advice, footer. Copy lives in `content/landing/*.md`. Responsive.

### Login / Signup

Demo mode: any credentials work. Login -> dashboard. Signup persists to `data/users.json` and auto-logs in.

### Dashboard shell

Persistent nav matching SEEK candidate account areas: Dashboard, Job Search, Saved Jobs, Saved Searches, Applied, Profile, Settings.

### Core product screens

- `/jobs`: searchable/filterable results, active query summary, sort, pagination, split view with sticky job detail panel.
- `/jobs/[jobId]`: standalone job details.
- `/companies`: employer discovery grid.
- `/saved-jobs`: saved jobs with notes.
- `/saved-searches`: alert frequency management.
- `/applied`: application tracker table.
- `/profile`: candidate profile/resume builder.
- `/settings`: account, profile, notification, privacy, and integration toggles.

## Data layer

Use realistic Australian dummy data. JSON files must remain local-only. Route handlers should use atomic JSON writes from `lib/data/store.ts`.

## Env vars (`.env.example`)

```
NEXT_PUBLIC_APP_NAME=SEEK
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEMO_AUTH_SECRET=change-me
DEMO_ADMIN_EMAIL=candidate@example.com
DEMO_ADMIN_PASSWORD=demo
```

## Auth (mock)

Protect app routes; unauthenticated users redirect to `/oauth/login?redirect=...`. Signed HTTP-only cookie. Logout clears session.

## Tests

Vitest + RTL: formatters, filters, auth encode/decode, job card interactions, nav active state, changed search/results UI, and API/data route coverage for any new endpoints.

## Computer-use verification

After lint/build/unit tests pass:

1. Start `pnpm --filter seek-marketplace-demo dev`.
2. Record browser walkthrough:
   - Marketing landing loads and shows SEEK logo/search
   - Login with `candidate@example.com` / `demo`
   - Dashboard loads
   - Navigate to job search
   - Perform a meaningful interaction such as searching/filtering/selecting a job and opening quick apply
3. Save the screen recording and key screenshots under `/opt/cursor/artifacts`.
4. Embed artifacts in the PR body.

## README

Keep unofficial demo disclaimer, setup, demo credentials, structure tour, JSON persistence notes, scripts, and known limitations.

## PR requirements

Branch `cursor/seek-com-au-demo-504a`. Title: **feat: refresh SEEK jobs marketplace demo**.

PR body must include:

- Summary
- Fidelity notes
- Computer-use verification recording/screenshots
- Test plan checklist
- Demo credentials
- Known limitations

## Constraints

- No lorem ipsum.
- No real secrets.
- No real AI/integrations; simulated AI copy is fine if labeled as demo data.
- Prefer many small, readable files over monoliths.
- App runs, login reaches dashboard, search results are interactive, and verification artifacts are attached.
