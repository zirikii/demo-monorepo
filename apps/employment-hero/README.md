# Employment Hero website demo

An unofficial Vite + React 19 clone of [employmenthero.com](https://employmenthero.com/) —
a marketing site for the "Employment Operating System" plus a mock authenticated platform
covering people, hiring, payroll, leave and performance.

> **Not affiliated with Employment Hero.** This is a demonstration build. It is not
> operated by, endorsed by, or connected to Employment Hero Pty Ltd. Every company name,
> testimonial, case study, salary figure and job listing is fabricated. The brand artwork in
> `public/brand/` is a recreation, not the official mark.

## Quick start

```bash
pnpm install          # from the repo root
pnpm dev:employment-hero
```

The dev server runs on <http://localhost:5180>.

| Script                                         | What it does                     |
| ---------------------------------------------- | -------------------------------- |
| `pnpm dev:employment-hero`                     | Vite dev server on 5180          |
| `pnpm build:employment-hero`                   | Typecheck then production build  |
| `pnpm --filter employment-hero-demo test`      | Vitest unit and component suites |
| `pnpm --filter employment-hero-demo lint`      | ESLint flat config               |
| `pnpm --filter employment-hero-demo typecheck` | `tsc -b --noEmit`                |
| `pnpm --filter employment-hero-demo brand`     | Re-fetch official brand artwork  |

## Demo credentials

The `/start-free` form is pre-filled and creates a session immediately:

- **Name** Ava Thompson
- **Email** `ava.thompson@brightpath.com.au`
- **Company** Brightpath Group

Any values work — authentication is mock, matching the convention across every app in this
monorepo. Do not enter a real password anywhere.

## Known defect: `/login` crashes on purpose

**This is deliberate.** Tracked in Jira as **DR-20** (labels `bug`, `employment-hero`,
`low`), it mirrors the CommBank demo's log-on crash so the repo has a realistic,
non-obvious bug to demonstrate a fixing workflow.

**Reproduce:** run `pnpm dev:employment-hero`, open <http://localhost:5180>, click **Log
in** in the header and choose **Employer** (or open `/login` directly). The page renders
blank and the console shows:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'name')
    at LoginPage
```

**Root cause:** `src/pages/Login.tsx` builds `portalConfig` keyed by display-cased names
(`Employer`, `Employee`, `Payroll`) but looks the entry up with the lower-case `?portal=`
query value, defaulting to `employer`. The `as keyof typeof portalConfig` cast hides the
mismatch, so `pnpm lint`, `pnpm typecheck` and `pnpm test` all pass — the failure only
appears at render time when `portalConfig[portalKey]` is `undefined` and `portal.name` is
read.

**Fix:** key `portalConfig` by the lower-case query values, or normalise the key and fall
back to a known portal instead of asserting with `as keyof typeof`.

`src/test/login-bug.test.tsx` **documents** the crash rather than guarding against it. If
you fix the bug, invert those expectations.

**Getting into the platform meanwhile:** `/start-free` is a separate, working entry point.
It creates a session and lands on `/platform`, so the authenticated area stays fully
demonstrable while `/login` is broken.

## Routes

### Marketing

| Route                                                                  | Page                                                                        |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `/`                                                                    | Homepage                                                                    |
| `/products`                                                            | Product index                                                               |
| `/products/:slug`                                                      | Hiring, HR, Payroll, Employee Experience, HeroForce, SmartMatch, Swag Spend |
| `/products/employment-os`                                              | Employment OS overview                                                      |
| `/products/swag-spend-account/earned-wage-access`                      | Earned wage access                                                          |
| `/solutions`, `/solutions/:slug`                                       | Solution index and detail                                                   |
| `/industry`, `/industry/:slug`                                         | Industry index and detail                                                   |
| `/pricing`                                                             | Plans, add-ons and feature matrix                                           |
| `/integrations`                                                        | Integration directory                                                       |
| `/ai`                                                                  | AI commitment (`/responsible-ai` redirects here)                            |
| `/work`                                                                | Employment Hero Work, for employees                                         |
| `/jobs`, `/jobs/:slug`                                                 | Job board and job detail                                                    |
| `/jobs/salary-benchmarking`                                            | Salary benchmarks                                                           |
| `/resources`, `/resources/:audience`                                   | Resource hub and the four audience hubs                                     |
| `/blog`, `/blog/:slug`                                                 | Blog index and article                                                      |
| `/compliance-corner`                                                   | Compliance articles                                                         |
| `/news`, `/webinars`                                                   | Newsroom and webinars                                                       |
| `/case-studies`, `/case-studies/:slug`                                 | Customer stories                                                            |
| `/partner-network` + `/referral-partner-program`, `/certified-partner` | Partner programs                                                            |
| `/partner-directory`                                                   | Partner directory                                                           |
| `/about-us`, `/careers`, `/hero-foundation`, `/media-centre`           | Company pages                                                               |
| `/contact`, `/request-a-demo`, `/support`, `/implementation-hub`       | Contact and support                                                         |
| `/legals/privacy`, `/legals/terms`, `/accessibility`                   | Legal                                                                       |
| `/search`                                                              | Site search                                                                 |
| `/login`, `/start-free`                                                | Auth (see the known defect above)                                           |

### Platform (requires a session)

`/platform`, `/platform/people`, `/platform/people/:employeeId`, `/platform/hiring`,
`/platform/payroll`, `/platform/leave`, `/platform/performance`, `/platform/reports`,
`/platform/settings`.

## Structure

```
src/
  components/
    brand/      Logo lockup
    layout/     SiteHeader (audience mega-menus), SiteFooter, PageHero, ScrollToTop
    marketing/  Hero, marquee, feature rows, tabs, cards, CTA band
    platform/   PlatformLayout shell and RequireAuth guard
    ui/         Button, Card, Badge, Field, Tabs, Accordion, Stat, Avatar, EmptyState
  data/         Seed content — nav, products, pricing, industries, articles,
                case studies, jobs, company, platform fixtures
  hooks/        useAuth, useWorkspace, useDocumentTitle
  lib/          auth, storage, format, search, cn
  pages/        Marketing pages (flat) + platform/ subfolder
  test/         Vitest suites and setup
```

## Persistence

There is no backend. State lives in `localStorage`:

| Key                               | Holds                                |
| --------------------------------- | ------------------------------------ |
| `employment-hero-demo-session`    | Base64 JSON demo session             |
| `employment-hero-demo-leave`      | Leave approval decisions             |
| `employment-hero-demo-payruns`    | Pay run approvals                    |
| `employment-hero-demo-candidates` | Candidate pipeline stages            |
| `employment-hero-demo-settings`   | Notification and integration toggles |

**Settings → Reset demo data** in the platform restores the seed fixtures.

## Design tokens

Tokens live in `src/index.css` under Tailwind v4's `@theme`. This app owns them — nothing
is shared with sibling apps.

- **Purple Heart `#7622D7`** is the primary brand colour, with `#5B15AA` and `#8E4BE0`
  either side of it and `#F3EBFD` / `#FAF6FF` as washes.
- **Near-black `#212529`** carries the footer, the platform sidebar and body copy.
- Accents: lime `#C6F24E`, amber `#FFB43D`, sky `#2AA7FF`.
- **Poppins** for display type (a free stand-in for Employment Hero's Saiga wordmark
  typeface) and **Inter** for body copy (standing in for Untitled Sans).

## Brand assets

`public/brand/` holds `logo.svg`, `logo-white.svg`, `symbol.svg`, `symbol-purple.svg`,
`symbol-white.svg`, `favicon.svg` and `og-image.svg`, with provenance in
`brand-assets.json`.

These are **recreations**. `employmenthero.com` and every logo CDN are unreachable from the
cloud build environment — the egress proxy resets the connection — so the artwork was
redrawn from the logo supplied with the build task.
`scripts/fetch-brand-assets.sh` records the canonical upstream URLs and replaces the
recreations when run from an unrestricted network.

## Tests

`pnpm --filter employment-hero-demo test` runs 122 Vitest specs across six files:
formatters, mock auth, seed-data and navigation integrity, site search, header and pricing
components, the platform workflows (leave, payroll, hiring, people), and the documented
login crash.

`src/test/data.test.ts` asserts that every header and footer link resolves to a route
declared in `App.tsx`, so a nav entry added without a matching route fails CI instead of
404ing in the browser.

The original build spec is in [`PROMPT.md`](./PROMPT.md).
