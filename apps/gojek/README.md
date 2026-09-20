# gojek — Gojek Tech site demo (unofficial)

An **unofficial demo** recreation of the structure and visual language of Gojek's technology
and employer site, plus a mock candidate hub behind a fake login. Built with Vite, React 19,
TypeScript, and Tailwind v4.

> Not affiliated with, endorsed by, or connected to Gojek or GoTo Group. All copy, data,
> people, roles, repositories, and numbers in this app were written for the demo and are
> fictional. Only the logo lockup and the Gojek green value (`#00AA13`, documented publicly by
> the Asphalt design system) come from the brand itself.

## Run it

```bash
pnpm install          # from the repo root
pnpm dev:gojek        # http://localhost:5184
```

Other scripts (run inside `apps/gojek`, or with `pnpm --filter gojek-io-demo <script>`):

| Script           | What it does                                |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Vite dev server on port 5184                |
| `pnpm build`     | `tsc -b` then a production build            |
| `pnpm preview`   | Serve the production build on 5184          |
| `pnpm lint`      | ESLint 9 flat config                        |
| `pnpm typecheck` | `tsc -b --noEmit`                           |
| `pnpm test`      | Vitest (jsdom + Testing Library)            |
| `pnpm brand`     | Re-fetch brand artwork into `public/brand/` |

## Demo credentials

Login is mock and only accepts the two seeded accounts. Sessions are base64 JSON in
`localStorage` — no server, no tokens, no network.

| Email                | Password       | Persona                          |
| -------------------- | -------------- | -------------------------------- |
| `candidate@gojek.io` | `gotroops2026` | Senior Backend Engineer, Jakarta |
| `designer@gojek.io`  | `asphalt2026`  | Product Designer, Singapore      |

The login form arrives pre-filled with the first account.

## Routes

| Route               | What it is                                                                             |
| ------------------- | -------------------------------------------------------------------------------------- |
| `/`                 | Home: hero, stats, the full product portfolio by family, open source, culture, stories |
| `/products`         | Portfolio with a category filter                                                       |
| `/products/:slug`   | Product detail — highlights, engineering notes, scale stats                            |
| `/about-us`         | Impact numbers, company timeline, leadership, offices                                  |
| `/life-at-gojek`    | Culture principles, ways of working, benefits, employee stories                        |
| `/open-source`      | Public repositories and contribution expectations                                      |
| `/blog`             | Searchable, filterable, paginated story index                                          |
| `/blog/:slug`       | Story detail with body sections, tags, and related reading                             |
| `/join-us`          | Role search with team / location / type filters, pagination, interview process         |
| `/join-us/:slug`    | Role detail with an apply form that persists to `localStorage`                         |
| `/login`            | Mock sign-in                                                                           |
| `/hub`              | Candidate hub overview (auth-guarded)                                                  |
| `/hub/applications` | Application pipeline with stage tracker and withdraw                                   |
| `/hub/saved`        | Saved roles                                                                            |
| `/hub/interviews`   | Scheduled interviews in Jakarta time                                                   |
| `/hub/profile`      | Read-only details plus editable, persisted preferences                                 |

`/careers`, `/jobs`, `/about`, `/blogs`, `/life`, and `/home` redirect to their canonical
routes; everything else renders the 404 page.

## Structure

```
src/
  components/
    brand/      BrandLogo, BrandMark (lockup inlined so it inherits text colour)
    layout/     SiteHeader, SiteFooter, PageLayout, PageHero, Section, Breadcrumb, CookieBanner
    marketing/  ProductCard, PostCard, JobCard, StoryCard, OpenSourceCard, AppMockup, CtaBand
    hub/        HubLayout, RequireAuth, StageTracker
    ui/         Button, Badge, Card, Field, Tabs, Accordion, Pagination, EmptyState, StatTile
  data/         products, posts, jobs, culture, opensource, hub, nav, site, types
  hooks/        useAuth, useDocumentTitle
  lib/          auth, applications, jobs, posts, format, storage, cn
  pages/        marketing pages + hub/*
  test/         Vitest suites
```

## Persistence

There is no backend. Everything mutable lives in `localStorage`:

| Key                        | Contents                          |
| -------------------------- | --------------------------------- |
| `gojek-demo-session`       | Encoded demo session              |
| `gojek-demo-applications`  | Submitted and seeded applications |
| `gojek-demo-saved-roles`   | Bookmarked role slugs             |
| `gojek-demo-preferences`   | Candidate hub preferences         |
| `gojek-demo-cookie-choice` | Cookie banner dismissal           |

Clearing site data resets the demo to its seeded state.

## Brand assets

`public/brand/` holds the lockup supplied with the build request plus recolours of it
(`gojek-logo-white.svg`, `gojek-logo-dark.svg`, `mark.svg`, `favicon.svg`) and a
`brand-assets.json` manifest recording provenance. `scripts/fetch-brand-assets.sh` documents
how to refresh them from an unrestricted network. Gojek's proprietary display typeface is not
licensed for this demo; Plus Jakarta Sans stands in.

## Tests

```bash
pnpm --filter gojek-io-demo test
```

82 Vitest cases across formatters, session encode/decode and tamper rejection, job and post
filtering and pagination, application persistence, component rendering and ARIA state, page
rendering and filter interactions, and the auth-guarded candidate hub.
