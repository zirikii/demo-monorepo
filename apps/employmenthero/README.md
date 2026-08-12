# Employment Hero website demo

An unofficial, look-alike clone of [employmenthero.com](https://employmenthero.com/) built with
Vite, React 19, TypeScript and Tailwind CSS v4. It covers the marketing site (Employment OS,
products, pricing, solutions, resources, jobs, company pages) plus a mock **Employment OS**
dashboard behind a simulated login.

> **Not affiliated with, endorsed by, or connected to Employment Hero Pty Ltd.** Every employee,
> candidate, pay run, customer story and figure in this build is invented. Nothing is transmitted
> anywhere — all state lives in your browser.

## Getting started

```bash
pnpm install          # from the monorepo root
pnpm dev:employmenthero
```

The dev server runs on <http://localhost:5180>. No environment variables are required.

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `pnpm dev`        | Vite dev server on port 5180              |
| `pnpm build`      | Typecheck then production build           |
| `pnpm preview`    | Serve the production build on port 5180   |
| `pnpm lint`       | ESLint across the app                     |
| `pnpm typecheck`  | `tsc -b --noEmit`                         |
| `pnpm test`       | Vitest unit and component suites          |
| `pnpm brand`      | Re-fetch brand artwork into `public/brand` |

## Demo credentials

The login form is pre-filled and the credentials are also printed on the page.

| Portal   | Email                             | Password      |
| -------- | --------------------------------- | ------------- |
| Employer | `demo@employmenthero.com`         | `heroes2026`  |
| Employee | `employee@employmenthero.com`     | `teamhero`    |
| Partner  | `partner@employmenthero.com`      | `partner2026` |

Sign-up at `/signup` also works and drops you straight into the dashboard — it is pre-filled too.

## Routes

**Marketing**

`/` · `/products` · `/products/:slug` · `/pricing` · `/pricing/global-teams` · `/solutions` ·
`/industry/:slug` · `/business-size/:slug` · `/integrations` · `/quick-demos` · `/resources` ·
`/blog` · `/blog/:slug` · `/case-studies` · `/case-studies/:slug` · `/about-us` · `/careers` ·
`/jobs` · `/jobs/:id` · `/partner-network` · `/responsible-ai` · `/request-a-demo` · `/contact` ·
`/support` · `/legals/privacy-policy` · `/legals/terms` · `/login` · `/signup`

**Employment OS (requires a session)**

`/platform` · `/platform/people` · `/platform/people/:id` · `/platform/hiring` ·
`/platform/payroll` · `/platform/leave` · `/platform/performance` · `/platform/learning` ·
`/platform/benefits` · `/platform/reports` · `/platform/settings`

Anonymous visits to a `/platform/*` route redirect to `/login?redirect=…`.

Twelve product pages are generated from one template: Employment OS, HR software, payroll software,
hiring, the AI Recruitment Agent, the ATS, SmartMatch candidate search, HeroForce, Employer of
Record, Employment Hero Work, Earned Wage Access and learning management.

## Structure

```
src/
  components/
    brand/      BrandLogo — self-hosted mark plus a live-text wordmark
    layout/     SiteHeader with mega-menus, SiteFooter, PageHero, Section, CookieBanner
    marketing/  StatBand, LogoWall, AgentShowcase, AppMockup, CtaBand, TestimonialCard, CheckList
    platform/   PlatformLayout, RequireAuth, StatTile, PanelCard, AgentFeed, HeadcountChart
    ui/         Button, Card, Badge, Field, Tabs, Accordion, DataTable, Avatar, ProgressBar, Toggle
  data/         Seed modules — nav, products, pricing, case studies, blog, jobs, platform records
  hooks/        useAuth (mock session context), useDocumentTitle
  lib/          auth, cn, format, storage
  pages/        Marketing pages plus pages/platform/* for the dashboard
  test/         Vitest suites (format, auth, data integrity, components, pages, platform)
```

## Persistence

There is no database and no API. Three things are written to `localStorage`:

- `employmenthero-demo-session` — the base64 mock session
- `employmenthero-demo-settings` — the toggles on `/platform/settings`
- `employmenthero-demo-cookie-consent` — the cookie-banner acknowledgement

Everything else (leave approvals, hiring pipeline selection, form submissions) is in-memory and
resets on reload. Clearing site data resets the demo completely.

## Brand assets

`public/brand/` holds the circular mark in four treatments plus `brand-assets.json`, which records
provenance. `employmenthero.com` and every public logo mirror are blocked from the environment this
was authored in, so the mark was hand-authored to match the reference lockup. Run
`pnpm brand` from an unrestricted network to replace it with the official artwork.

The wordmark is rendered as live text in the app typeface rather than as an outlined SVG so it stays
crisp at any size. Employment Hero's brand face is the commercial **Saiga**; this build approximates
it with the open-source **Figtree**.

## Design tokens

Defined in `src/index.css` with Tailwind v4's CSS-first `@theme`:

| Token                    | Value     | Used for                            |
| ------------------------ | --------- | ----------------------------------- |
| `--color-eh-purple`      | `#7622d7` | Primary brand accent and CTAs       |
| `--color-eh-purple-dark` | `#5a17ad` | Hover states                        |
| `--color-eh-purple-deep` | `#2b0a52` | Full-bleed hero bands               |
| `--color-eh-purple-night`| `#1a0635` | Footer                              |
| `--color-eh-violet`      | `#a06bf0` | Secondary violet                    |
| `--color-eh-tint`        | `#f4ecfe` | Soft surfaces and badges            |
| `--color-ink`            | `#212529` | Body text                           |
