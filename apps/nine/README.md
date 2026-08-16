# nine.com.au demo (unofficial)

Vite + React 19 look-alike of [nine.com.au](https://www.nine.com.au/?rf=true) for demos and
codebase exploration. **Not affiliated with Nine Entertainment Co.**

## Quick start

```bash
# from monorepo root
pnpm install
pnpm dev:nine    # http://localhost:5177
```

Demo credentials (any work): `reader@example.com` / `demo`

## Sport hub

The **Sport** page (`/sport`) uses `getByPillar("sport")` so Latest is newest-first, and
story cards format ISO `publishedAt` via `formatRelativeTime` (same as other pillars).

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Vite on 5177 |
| `pnpm build` | typecheck + production build |
| `pnpm test` | Vitest unit suite |
| `pnpm lint` / `pnpm typecheck` | ESLint / `tsc` |
| `pnpm shots` | Playwright full-page screenshots (dev server must be up) |
| `pnpm video` | Playwright walkthrough recording |

## Brand

Official wordmark SVG supplied in the task brief → `public/brand/logo.svg` + `NineLogo` component.
Colours from Nine for Brands: cyan `#00BEFF`, ink `#070720`, corporate blue `#008FE2`.

## Structure

```
src/
  components/  brand, layout, article, home, ui
  data/        articles, nav, shows, deals, horoscopes
  pages/       Home, Sport, sections, auth, …
  lib/         cn, auth, format
```
