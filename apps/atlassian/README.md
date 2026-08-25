# Atlassian website demo

An unofficial, look-alike clone of [atlassian.com](https://www.atlassian.com/) built with
Vite, React 19, TypeScript and Tailwind CSS v4. It covers the marketing site (products,
collections, solutions, resources, customers, company pages) plus mock product workspaces
for **Jira**, **Confluence**, **Jira Service Management**, **Jira Product Discovery**,
**Bitbucket**, **Trello**, **Loom**, **Rovo**, and **Admin**.

Jira board cards cannot be dragged between columns — that limitation is intentional for
demos. Status still changes from the work item page. Trello cards _can_ move between lists.

> **Not affiliated with, endorsed by, or connected to Atlassian Pty Ltd.** Every teammate,
> work item, customer story and figure in this build is invented. Nothing is transmitted
> anywhere — all state lives in your browser.

## Getting started

```bash
pnpm install          # from the monorepo root
pnpm dev:atlassian
```

The dev server runs on <http://localhost:5183>. No environment variables are required.

| Script           | What it does                               |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Vite dev server on port 5183               |
| `pnpm build`     | Typecheck then production build            |
| `pnpm preview`   | Serve the production build on port 5183    |
| `pnpm lint`      | ESLint across the app                      |
| `pnpm typecheck` | `tsc -b --noEmit`                          |
| `pnpm test`      | Vitest unit and component suites           |
| `pnpm brand`     | Re-fetch brand artwork into `public/brand` |

## Demo credentials

The login form is pre-filled and the credentials are also printed on the page.

| Portal                                        | Email                 | Password       | Lands on            |
| --------------------------------------------- | --------------------- | -------------- | ------------------- |
| Jira                                          | `demo@atlassian.com`  | `teamwork2026` | `/jira`             |
| Confluence, JSM, JPD, Bitbucket, Trello, Loom | `demo@atlassian.com`  | `teamwork2026` | that product’s path |
| Admin                                         | `admin@atlassian.com` | `admin2026`    | `/admin`            |
| Rovo                                          | `rovo@atlassian.com`  | `agents2026`   | `/rovo`             |

Any of the three accounts can sign in on any product login. The `portal` query param
chooses the landing app. Sign-up at `/signup` still drops you into Jira.

Use **Switch apps** in product chrome to move between workspaces without signing in again.

## Routes

**Marketing**

`/` · `/software` · `/software/:slug` · `/software/jira/pricing` · `/solutions` ·
`/solutions/:slug` · `/collections/:slug` · `/resources` · `/resources/:slug` ·
`/customers` · `/customers/:slug` · `/marketplace` · `/community` · `/partners` ·
`/company` · `/careers` · `/enterprise` · `/trust` · `/contact` · `/support` · `/try` ·
`/legal/privacy` · `/legal/terms` · `/legal/copyright` · `/login` · `/signup`

**Product workspaces (require a session)**

`/jira` · `/jira/backlog` · `/jira/issues/:key` · `/jira/rovo` · `/jira/settings` ·
`/confluence` · `/confluence/pages/:id` · `/jsm` · `/jsm/requests/:key` · `/jpd` ·
`/jpd/ideas/:key` · `/bitbucket` · `/bitbucket/:repo` ·
`/bitbucket/:repo/pull-requests/:id` · `/trello` · `/loom` · `/loom/:id` · `/rovo` ·
`/admin`

Anonymous visits to those routes redirect to `/login?portal=…&redirect=…`.

Eight product pages are generated from one template: Jira, Confluence, Rovo, Loom,
Jira Service Management, Jira Product Discovery, Bitbucket and Trello.

## Structure

```
src/
  components/
    brand/      BrandLogo — self-hosted mark plus a live-text wordmark
    layout/     SiteHeader with mega-menus, SiteFooter, PageHero, Section, CookieBanner
    marketing/  StatBand, LogoWall, GraphStage, ProductTile, CtaBand
    jira/        JiraLayout, RequireAuth, IssueCard, IssueTypeGlyph, RovoPanel, CreateIssueDialog
    product/    AppSwitcher, ProductLayout
    ui/         Button, Badge, Field
  data/         Seed modules — nav, products, apps, jira, confluence, jsm, jpd, bitbucket, trello, loom, rovo, admin
  hooks/        useAuth (mock session context), useDocumentTitle
  lib/          auth, stores, cn, format, storage, asset
  pages/        Marketing pages plus per-product workspace pages
  test/         Vitest suites
```

## Persistence

There is no database and no API. Product state is written to `localStorage`:

- `atlassian-demo-session` — the base64 mock session
- `atlassian-demo-issues` — Jira board (create, status, comments)
- `atlassian-demo-settings` — the toggles on `/jira/settings`
- `atlassian-demo-pages` — Confluence pages and comments
- `atlassian-demo-requests` — JSM request status
- `atlassian-demo-ideas` — JPD votes and status
- `atlassian-demo-prs` — Bitbucket pull request status
- `atlassian-demo-trello` — Trello card lists
- `atlassian-demo-looms` — Loom watched flags
- `atlassian-demo-agents` — Rovo agent enablement
- `atlassian-demo-admin` — Admin organisation policies
- `atlassian-demo-cookie-consent` — the cookie-banner acknowledgement

Rovo chat is in-memory and resets on reload. Clearing site data resets the demo completely.

## Brand assets

`public/brand/` holds the official two-peak "A" mark (classic `#0052CC → #2684FF`
gradient) in brand and inverse treatments plus `favicon.svg`, a stylised Community
pinwheel hexagon (`community.svg`), and `brand-assets.json`, which records provenance.
Product marks — Jira's stacked pages, Confluence's converging swooshes, the Bitbucket
bucket, and Loom's aperture star — are inlined in `src/components/brand/AppMark.tsx`
using the official geometry, sourced from user-supplied lockup artwork. Products without
supplied artwork use containerless stand-in glyphs in their product colour.

The wordmark is rendered as live text in the app typeface rather than as an outlined SVG so
it stays crisp at any size. Atlassian's brand face is the commercial **Charlie**; this build
approximates it with the open-source **Plus Jakarta Sans**.

## Design tokens

Defined in `src/index.css` with Tailwind v4's CSS-first `@theme`:

| Token                    | Value     | Used for                                      |
| ------------------------ | --------- | --------------------------------------------- |
| `--color-atl-blue`       | `#357DE8` | Interactive blue — links, tabs, pill CTAs     |
| `--color-atl-blue-hover` | `#2369D4` | Hover states                                  |
| `--color-atl-blue-deep`  | `#0C66E4` | In-product Cloud buttons (mock Jira)          |
| `--color-atl-cobalt`     | `#1558BC` | Full-bleed brand-blue section surfaces        |
| `--color-atl-forest`     | `#4C6B1F` | Green resource-card surfaces                  |
| `--color-atl-ember`      | `#C75300` | Orange resource-card surfaces                 |
| `--color-atl-plum`       | `#803FA5` | Purple resource-card surfaces                 |
| `--color-mark-*`         | 4 colours | Illustration/SVG pigments only, never UI      |
| `--color-atl-navy`       | `#172B4D` | Legacy ADS navy for the mock Jira chrome      |
| `--color-ink`            | `#292A2E` | Body text (`--color-ink-strong` is `#101214`) |
