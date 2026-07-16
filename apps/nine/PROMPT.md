# Build nine.com.au Demo — Full News & Entertainment Hub

## Mission

Scaffold a production-quality **nine.com.au** website clone for demo purposes that looks and feels like the real AU digital destination at https://www.nine.com.au/?rf=true (2026 six-pillar relaunch: News, Sport, Lifestyle, Travel, Entertainment, Shopping + TV). This is a UI/UX fidelity demo, not a production app: dummy data, mock auth, local JSON/TS content. No real external services.

**Deliverable:** a single PR against `main` with a complete, lint-clean, build-passing codebase under `apps/nine/` in this pnpm monorepo. Run via `pnpm install && pnpm dev:nine`.

**Monorepo alignment (required):** Follow the same conventions as `apps/squiz` and `apps/changi`:
- Vite + React 19 + TypeScript + Tailwind v4 (CSS-first `@theme`)
- Depend on `@demo/ui` via `workspace:*`; re-export `cn` from `@demo/ui/cn`; show `<DemoRibbon />` in the header
- Scripts: `dev`, `build`, `lint`, `typecheck`, `test` (Vitest), `video` + `shots` (Playwright)
- Wire root `package.json` with `dev:nine` / `build:nine`; update root `README.md` and `AGENTS.md`
- Default port **5177** (avoid colliding with kddi 5173 / paytm 5174 / squiz 5175 / changi 5176)
- Package name: `nine-com-au-demo`

## Company profile

- **Product:** nine.com.au — Australia’s mass-market digital home for trusted news, sport, lifestyle, travel, entertainment, shopping, and Nine Network TV.
- **Primary users:** Australians 25–54 catching breaking news, sport scores, lifestyle reads, and TV companion content.
- **Core surfaces to clone:** Homepage story stack, section hubs (News / Sport / Lifestyle / Travel / Entertainment / Shopping / TV), article detail, Live, Search, Newsletter, Login/Account, Horoscopes, legal.
- **Dummy-data theme:** Realistic Australian headlines (politics, NRL/AFL/cricket, 9Honey-style lifestyle, domestic travel, TV/shows, shopping deals) — never lorem ipsum.

## Intentional demo bug (required)

Make **one page deliberately buggy** for demo / Bugbot purposes:

- **Page:** `/sport` (Sport hub)
- **Bug:** The “Latest” sort comparator is inverted — articles render **oldest-first** while the UI chip says **Latest**. Relative timestamps on this page also miscompute (“NaN hours ago”) because `formatRelativeTime` is passed a pre-formatted string instead of an ISO date on Sport only.
- Document the bug in a code comment `// DEMO BUG (intentional): …` and create a **Jira ticket** in project **DR** on https://fe-anysphere-demo.atlassian.net/jira/software/projects/DR/boards/877 with the **bug** label describing how to reproduce and the expected fix.

## Repo context

- Repo: `demo-monorepo` (pnpm workspace)
- New app under `apps/nine/` — do not dump at repo root. Evolve alongside existing apps; do not delete other apps.

## Target tech stack

| Layer | Technology |
|-------|------------|
| Framework | Vite 6 + React 19 + React Router 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + CSS variables |
| Components | Custom primitives + lucide-react icons |
| Shared | `@demo/ui` (`cn`, `DemoRibbon`) |
| Fonts | `@fontsource/barlow` (UI) + `@fontsource/barlow-condensed` (display headlines) |
| State | React context + hooks |
| Data | Local TypeScript data modules |
| Auth | Mock session via `localStorage` + route guards |
| Tests | Vitest + React Testing Library |
| Video / shots | Playwright walkthrough + vision screenshots |
| Lint/format | ESLint + Prettier |

## Brand assets

- **Header logo:** user-supplied official nine.com.au wordmark SVG — commit as React component `NineLogo` and as `public/brand/logo.svg` (fill `#070720` on light / white on dark).
- **Favicon:** derive from the nine-dots mark on the left of the wordmark.
- **Colours (Nine for Brands):**
  - nine.com.au primary cyan: `#00BEFF`
  - Nine corporate blue: `#008FE2`
  - Secondary ink: `#070720`
  - Surfaces: `#FFFFFF`, `#F5F7FA`, `#E8EEF4`
  - Accent red for live/breaking: `#E10600`
- `public/brand/brand-assets.json` + `scripts/fetch-brand-assets.sh` (logo already provided; script documents provenance).

## Design system

Mirror a modern Australian news homepage:
- Sticky white header with Nine logo, primary nav (News, Sport, Lifestyle, Travel, Entertainment, Shopping, TV), search, Sign in
- Thin cyan top bar / breaking ticker
- Homepage: large lead story + secondary grid + section rails
- Section hubs: filter chips + story cards
- Article: byline, publish time, body, related stories
- Footer: pillar links, legal, © Nine
- Motion: fade-up on story cards, ticker scroll, subtle hover lift (2–3 intentional motions)

## Pages (build as many as possible)

1. `/` — homepage lead + rails for each pillar
2. `/news`, `/news/:slug`
3. `/sport` (**buggy**), `/sport/:slug`
4. `/lifestyle`, `/lifestyle/:slug`
5. `/travel`, `/travel/:slug`
6. `/entertainment`, `/entertainment/:slug`
7. `/shopping`
8. `/tv`, `/tv/:showSlug`
9. `/live`
10. `/search?q=`
11. `/horoscopes`
12. `/newsletter`
13. `/login`, `/signup`
14. `/account`, `/settings`
15. `/about`
16. `/privacy`, `/terms`
17. 404

## Data layer

Typed modules: `articles`, `shows`, `nav`, `horoscopes`, `deals`, `users` seed — 40+ articles across pillars, 6+ TV shows, deals list.

## Env vars (`.env.example`)

```
VITE_APP_NAME=nine.com.au
VITE_APP_URL=http://localhost:5177
DEMO_AUTH_SECRET=change-me
DEMO_ADMIN_EMAIL=reader@example.com
DEMO_ADMIN_PASSWORD=demo
```

## Tests

Vitest + RTL: Header logo+nav, Home lead story, Sport intentional sort bug assertion (documents demo bug), article lookup by slug, auth session, search filter.

## Computer-vision / visual QA

After `pnpm dev:nine` is up:
- Playwright `shots` → full-page screenshots of `/`, `/news`, `/sport` (bug page), `/entertainment`, `/login` under `apps/nine/shots/` and `/opt/cursor/artifacts/screenshots/`
- Playwright `video` walkthrough with cursor overlay → `.webm`/`.mp4` attached to PR

## README

Unofficial demo disclaimer, setup, demo credentials, intentional bug + Jira link, structure, scripts.

## Implementation order

1. Prompt file (this doc) 2. Scaffold + workspace wiring 3. Brand assets/tokens/fonts 4. Data modules 5. Layout shell 6. Homepage 7. Section + article pages (Sport buggy) 8. Auth/account 9. Jira bug ticket 10. Tests + shots + video 11. README + lint/build/test + PR

## PR requirements

Branch `cursor/nine-com-au-demo-1d4e`. Title: **feat: nine.com.au demo — news hub with intentional Sport bug**. Include Summary, fidelity notes, Test plan, Demo credentials, Jira ticket link, Known limitations, embedded screenshots + walkthrough video.

## Constraints

- No lorem ipsum — Australian media copy only (original, not scraped verbatim)
- No real secrets / live Nine APIs
- Prefer many small files; commit incrementally
- Success: `pnpm dev:nine` shows official logo + multi-pillar homepage; Sport “Latest” is wrong; Jira bug ticket exists; PR has CV artifacts
