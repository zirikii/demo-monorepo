# Build Gojek Demo — gojek.io look-alike marketing site plus a mock GoTroops careers hub

## Mission

Scaffold a production-quality **gojek.io look-alike** for demo purposes under `apps/gojek/` in
demo-monorepo. Dummy data, mock auth, `localStorage` persistence. No real external services.

gojek.io is Gojek's *technology and employer* site (distinct from the consumer super-app site
gojek.com): a dark, bold, single-column marketing site that presents the product portfolio,
engineering culture, open-source work, a blog, and careers.

**Deliverable:** one PR against `main` with a complete, lint-clean, build-passing app, a
computer-use screen recording of the running app, and a PR description covering summary,
fidelity notes, verification, test plan, demo credentials, and limitations.

## Company profile

- **Product:** Southeast Asian on-demand super-app — rides, deliveries, payments, merchant tools.
- **Site persona:** engineers, designers, and product people considering joining or following
  Gojek's tech org.
- **Core surfaces to clone:** home (hero → stats → product portfolio by category → open source →
  culture → stories → CTA band), products index + detail, Life@Gojek, About us, Blogs & News
  index + post, Join us (roles index + role detail + apply), plus a signed-in candidate hub.
- **Dummy-data theme:** Indonesian/Southeast Asian on-demand platform engineering — service
  names, Jakarta/Bengaluru/Singapore offices, realistic role titles and blog subjects.

## Repo context

- Repo: `demo-monorepo` (pnpm workspace, `apps/*` + `packages/ui`).
- New app at `apps/gojek`, package name `gojek-io-demo`, dev port **5184**.
- Wire `dev:gojek` / `build:gojek` into the root `package.json`, and add rows to the root
  `README.md` and `AGENTS.md` tables.

## Target tech stack (match neighbouring Vite apps)

| Layer | Technology |
| --- | --- |
| Framework | Vite 6 + React 19 + TypeScript (strict) |
| Routing | react-router-dom 7 |
| Styling | Tailwind v4 via `@tailwindcss/vite`, tokens in `@theme` |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Data | Typed modules under `src/data`, `localStorage` for mutations |
| Auth | Mock session encoded into `localStorage` (no real auth) |
| Tests | Vitest + React Testing Library (jsdom) |
| Lint | ESLint 9 flat config, Prettier |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payments.

## Brand assets

The Gojek lockup SVG is supplied in the task. Save it under `public/brand/` as the white
(inverse) logo, derive a dark-ink variant and a favicon from the same geometry, and record
provenance in `public/brand/brand-assets.json`. Add `scripts/fetch-brand-assets.sh` documenting
how to refresh from an unrestricted network. No external hotlinks; never invent a fake logo.

## Design system

- Gojek green `#00AA13` (Asphalt design-system brand colour) as primary; deep near-black
  surfaces for the hero and footer; white body surfaces between.
- Oversized, tightly tracked display headings; generous section padding; rounded cards.
- Build primitives: Button, Badge, Card, Field, Tabs, Accordion, Pagination, EmptyState,
  LoadingSkeleton, SectionHeading, StatTile.

## Application structure

```
apps/gojek/src/
  components/{brand,layout,marketing,hub,ui}/
  data/            products, posts, jobs, culture, open source, offices, nav, site
  hooks/           useAuth, useDocumentTitle
  lib/             auth, cn, format, storage, jobs, posts, applications
  pages/           Home, Products, ProductDetail, About, LifeAtGojek, OpenSource,
                   Blog, BlogPost, Careers, JobDetail, Login, NotFound, hub/*
  test/
```

## Content rules

All copy is **original demo copy written for this build** — do not paste text from the live
site. Match structure, tone, and density, not wording. Every page carries the unofficial-demo
disclaimer pattern already used by the other apps in this monorepo.

## Pages

- **Home** — dark hero with stat counters, product portfolio grouped by the six real categories
  (Transport & Logistics, Food & Shopping, Payments, Daily Needs, Business, News & Entertainment),
  open-source band, culture teaser, latest stories, CTA band.
- **Products** — category filter over the full portfolio; detail page per product with highlights,
  scale stats, and engineering notes.
- **Life@Gojek** — culture principles, ways of working, benefits, offices, employee stories.
- **About us** — timeline, leadership, impact numbers.
- **Blogs & News** — searchable/filterable index with pagination; post detail with body sections,
  author, tags, and related posts.
- **Join us** — role search with team/location/type filters and pagination; role detail with
  responsibilities, requirements, and an apply form that persists to `localStorage`.
- **Login** — demo credentials pre-filled; any listed demo account works.
- **Candidate hub** (`/hub`, auth-guarded) — application pipeline, saved roles, interview
  schedule, and profile/notification settings, all persisted to `localStorage`.

## Tests (minimum)

Vitest + RTL covering: formatters, auth encode/decode + tamper rejection, job/post filtering and
pagination, header nav `aria-current`, a marketing component render, home page render, careers
filter interaction, and the auth-guarded hub (redirect when signed out, pipeline when signed in).

## Definition of done

1. `pnpm --filter gojek-io-demo test` passes.
2. `pnpm --filter gojek-io-demo lint` and `typecheck` pass; root `pnpm lint` still passes.
3. `pnpm --filter gojek-io-demo build` passes.
4. Computer-use walkthrough recorded: home → products → careers filter → login → hub →
   apply/track interaction.
5. PR open with artifacts, test plan, demo credentials, and known limitations.
