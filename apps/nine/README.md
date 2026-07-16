# nine.com.au — website demo (unofficial)

A Vite + React 19 + TypeScript clone of Australia's Nine news, sport, lifestyle and
entertainment portal (reference: [nine.com.au](https://www.nine.com.au/), 2026 redesign).
Part of the demo-monorepo; aligned with `apps/changi`, `apps/squiz` and `apps/paytm`.

> **Unofficial demo — not affiliated with Nine Entertainment Co.** All headlines, articles,
> scores and imagery are fictional demo content. Brand marks are referenced only to
> approximate the look and feel of the public site.

## Quick start

```bash
# from the repo root
pnpm install
pnpm dev:nine        # http://localhost:5177
```

Demo sign-in accepts **any** email/password (the form is pre-filled). Sessions and settings are
stored in `localStorage` only — there is no backend.

## Scripts

| Script | Command | Notes |
| --- | --- | --- |
| `pnpm dev:nine` | `vite` | Dev server on port **5177** |
| `pnpm build:nine` | `tsc -b && vite build` | Typecheck + production build |
| `pnpm --filter nine-news-demo test` | `vitest run` | Unit tests (safe at root) |
| `pnpm --filter nine-news-demo lint` | `eslint .` | Flat ESLint 9 config |

## What's inside

Six pillars — **News, Sport, Lifestyle, Travel, Entertainment, Shopping** — plus:

- **Home** portal: top-stories hero, breaking-news ticker, per-pillar rails, video rail,
  most-read and a weather strip.
- **Section pages** for each pillar (Sport adds live scores, Entertainment adds show cards,
  Shopping adds deal cards).
- **Article** detail, **Video/9Now** hub, **Weather**, **Search**, **Login/Signup**,
  **Account**, **Settings**, **Privacy/Terms**, and a **404**.

## Design tokens

Brand colours live in `src/index.css` as Tailwind v4 `@theme` tokens: Nine blue `#3bccff`,
9News deep blue `#0518c5`, plus a per-pillar accent palette. Type is Inter (`@fontsource/inter`).
Class joiner `cn` is re-exported from `@demo/ui/cn`; the header shows the shared `DemoRibbon`.

## Brand assets

`public/brand/` holds the Nine wordmark (`logo.svg` / `logo-white.svg`), a derived
`favicon.svg`, and `brand-assets.json` (sources + disclaimer). `scripts/fetch-brand-assets.sh`
documents the intended live fetch — the cloud build environment has restricted egress, so the
committed wordmark comes from the official SVG supplied in the task brief rather than the CDN.

## Known limitation — intentional demo bug

The **Sport** page (`/sport`) intentionally ships a reproducible runtime bug: the `LiveScores`
widget (`src/components/sport/LiveScores.tsx`) uses a non-null assertion on `match.scores`, which
is `undefined` for upcoming fixtures. Rendering the "Matildas Friendly" upcoming match throws
`TypeError: Cannot read properties of undefined (reading 'map')`. A route-level `ErrorBoundary`
catches it, so the shell stays intact while the Sport content shows an error card. This is
tracked by a `bug`-labelled ticket in the DR Jira project. The fix is to guard for missing
`scores` (render a kick-off time for upcoming matches).
