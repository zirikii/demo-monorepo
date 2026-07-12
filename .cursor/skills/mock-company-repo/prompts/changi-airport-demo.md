# Build Changi Airport Demo — Full Passenger-Facing Website

## Mission

Scaffold a production-quality **Changi Airport (changiairport.com) UI clone** for demo
purposes that looks and feels like the real passenger website at
`https://www.changiairport.com/au/en.html`. This is a UI/UX fidelity demo, not a
production app: dummy data, mock interactions, local JSON/TS data, no real external
services or live flight feeds.

**Deliverable:** a single PR against `main` adding a new `apps/changi` app to the
existing pnpm monorepo, lint-clean, build-passing, tests-passing, runnable via
`pnpm dev:changi`, plus a recorded Playwright walkthrough video ("computer vision" of
the app being exercised).

## Company profile

- **Product:** Changi Airport's passenger-facing website — flight info, terminal guides,
  dining & shopping directory, attractions/experiences (Jewel, Canopy Park, Rain Vortex),
  events & promotions ("Happenings"), and the Changi Rewards loyalty programme.
- **Primary users:** Departing/arriving/transiting passengers and Singapore visitors.
- **Core surfaces to clone:** Home (passenger-mode hero, "What's Happening", destination
  explorer, section entry points), Fly (flight search + guides), At Changi (terminals &
  getting around), Dine & Shop (directory), Experience (attractions), Happenings
  (events/promotions), Changi Rewards, Help.
- **Dummy-data theme:** Real-world airline/flight/terminal/retail/attraction names styled
  like Changi's directory — no lorem ipsum. All copy is original, written in Changi's
  warm, welcoming brand voice ("Exceptional People, Connecting Lives").

## Repo context

- Monorepo: `demo-monorepo` (pnpm workspace, `apps/*` + `packages/ui`).
- New app lives at `apps/changi`, wired into `pnpm-workspace.yaml` (already globbed) and
  root `package.json` scripts (`dev:changi`, `build:changi`).
- Mirror the conventions of the newest app, `apps/squiz`: pure React SPA, Vite + React 19
  + TypeScript + Tailwind v4 (CSS-first `@theme`), `react-router-dom`, Vitest + RTL,
  Playwright walkthrough recorder, `@demo/ui` for the `cn` helper + `<DemoRibbon>`.

## Target tech stack (matches monorepo standard)

| Layer | Technology |
|-------|------------|
| Framework | Vite 6 + React 19 (SPA) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` in `src/index.css`) |
| Routing | react-router-dom v7 |
| Icons | lucide-react |
| Fonts | @fontsource (self-hosted, no external hotlinks) |
| Shared | `@demo/ui` (`cn` class merger, `<DemoRibbon>`) |
| Tests | Vitest + React Testing Library |
| Video | Playwright recorded walkthrough (`pnpm video`) |
| Lint/format | ESLint (flat config) + Prettier |

Explicitly DO NOT integrate real databases, cloud providers, live flight APIs, OAuth, or
payment providers. Simulate everything with local TS data + timers.

## Brand assets — official files (already sourced)

Real assets were downloaded from `changiairport.com` and are committed under
`apps/changi/public/brand/`:

- `changi-globe.svg` — the official multi-colour globe emblem (gradients
  `#e1d200`→`#ee3424`→`#6c217f` and taupe `#dcd3cd`→`#7d6a55`).
- `favicon.svg` — globe mark as the browser tab icon.
- Social icons (facebook, instagram, linkedin, youtube, telegram) for the footer.
- `scripts/fetch-brand-assets.sh` reproduces the downloads idempotently, and
  `brand-assets.json` records source URLs + fetch date.

The header renders the attached **"CHANGI airport singapore"** lockup: the official globe
emblem beside a `CHANGI` wordmark (taupe `#6f6154`) with `airport singapore` beneath, via
a `ChangiLogo` component. No external hotlinks — only `/brand/...` paths.

## Design system — match the real UI

- **Palette:** Changi purple/magenta `#6c217f` primary; vibrant accent gradient
  yellow `#e1d200` → red `#ee3424` → purple `#6c217f`; taupe ink `#6f6154`; soft neutral
  surfaces (`#f6f4f1`, white cards); deep plum `#3f0f4c` for dark bands.
- **Type:** friendly geometric sans (Inter/Figtree via @fontsource); large rounded hero
  headings; generous spacing.
- **Shape language:** large border-radii (rounded-2xl/3xl cards), pill buttons, gradient
  swoosh accents echoing the globe, image-forward cards.
- Reusable primitives: `PageLayout`, `Header` (with mega menu + passenger-mode switch),
  `Footer`, `Button`, `Badge`, `SectionHeading`, `Card`, `Accordion`, `Breadcrumbs`,
  `PromoCard`, `DestinationCard`, `FlightBoard`, `DirectoryCard`.

## Application structure (~90–120 files across directories)

```
apps/changi/
  index.html
  src/
    main.tsx  App.tsx  index.css  vite-env.d.ts
    lib/            cn.ts, format.ts, flights.ts (mock helpers)
    data/           nav, promos, destinations, flights, airlines, terminals,
                    dine, shop, experiences, happenings, rewards, faqs, company
    components/
      brand/        ChangiLogo, GlobeMark
      layout/       Header, MegaMenu, MobileMenu, Footer, PassengerModeBar,
                    PageLayout, ScrollToTop, TopUtilityBar
      ui/           Button, Badge, SectionHeading, Card, Accordion, Icon
      home/         Hero, WhatsHappening, DestinationExplorer, SectionGrid,
                    RewardsTeaser, AppPromo
      shared/       PageHero, PromoCard, DestinationCard, DirectoryGrid,
                    FlightBoard, FaqSection, Breadcrumbs, CtaBand, NewsletterSignup
    pages/          Home, Fly, FlightResults, AtChangi, TerminalDetail,
                    DineAndShop, DiningDetail, Experience, ExperienceDetail,
                    Happenings, HappeningDetail, Rewards, Help, NotFound
    test/           unit tests + setup
  e2e/              walkthrough.spec.ts, helpers.ts
  public/brand/     official assets
  scripts/          fetch-brand-assets.sh
  README.md  package.json  tsconfig.json  vite.config.ts  eslint.config.js
  playwright.config.ts
```

## Pages — detailed requirements

### Home (`/`)
- Top utility bar (language/region AU · EN, Changi Rewards login, search).
- Sticky header with globe logo lockup + mega menu (Fly, At Changi, Dine & Shop,
  Experience, Happenings, Changi Rewards, Help).
- **Passenger-mode hero**: "I am ARRIVING / DEPARTING / TRANSITING / VISITING" selector
  that swaps the hero's useful-info quick links; gradient/imagery backdrop.
- **What's Happening**: promo card carousel (outlet deals, rewards campaigns, Jewel
  activations).
- **Destination explorer**: "Explore cities we are flying to today" grid of destination
  cards with a tagline each.
- **Section grid**: entry cards to Fly / At Changi / Dine & Shop / Experience.
- Rewards teaser band + Changi App promo + newsletter signup, then footer.

### Fly (`/fly`) + Flight results (`/fly/flights`)
Flight search (arrivals/departures toggle, query field) rendering a mock `FlightBoard`
with 25+ rows (flight no., airline, city, terminal, scheduled time, status badge). Guide
cards for Arrival/Departure/Transit/Lounges.

### At Changi (`/at-changi`) + Terminal detail (`/at-changi/:terminal`)
Terminal overview (T1–T4 + Jewel), getting-around (MRT, Skytrain, taxi), maps teaser.
Terminal detail: facilities, transport, highlights.

### Dine & Shop (`/dine-and-shop`) + detail (`/dine-and-shop/:slug`)
Filterable directory (category chips: Dine / Shop, cuisine/brand), 24+ outlets, detail
page with hours/location/terminal.

### Experience (`/experience`) + detail (`/experience/:slug`)
Attractions grid (Jewel Rain Vortex, Canopy Park, Shiseido Forest Valley, Changi
Experience Studio, etc.) with ticket/free badges; detail page.

### Happenings (`/happenings`) + detail (`/happenings/:slug`)
Events + Promotions tabs, cards, detail page.

### Changi Rewards (`/rewards`)
Membership tiers, benefits grid, catalogue teaser, sign-up CTA (client-side toast).

### Help (`/help`)
Assistance topics, Changi App download, contact info, FAQ accordion.

### NotFound (`*`)
Branded 404.

## Data layer
Realistic dummy data as typed TS modules in `src/data`. Flights generated with a small
deterministic helper (seeded) so the board always has 25+ believable rows. No network.

## Auth
No real auth. "Login"/"Sign Up" are visual + client-side toasts only.

## Code quality
TypeScript strict (no `any`), ESLint clean, Prettier formatted, accessible (semantic
landmarks, aria labels, keyboard-operable menus/tabs/accordions), responsive, no console
errors on happy paths. Comments only for non-obvious logic.

## Tests (Vitest + RTL, minimum)
- `format`/`flights` helpers (time formatting, status derivation).
- `Header` renders logo + nav; passenger-mode bar switches content.
- `FlightBoard` renders rows + status badges.
- Data integrity (unique slugs, non-empty collections).
- One interactive: Dine & Shop category filter narrows results.

## Playwright walkthrough (`pnpm video`)
Recorded 1280×800 video with an injected fake cursor + click ripples (mirror
`apps/squiz/e2e/helpers.ts`). Steps: home hero + passenger-mode switch → What's Happening
→ destination explorer → mega menu → Fly + flight search → At Changi terminal → Dine &
Shop filter → Experience detail → Happenings → Rewards → mobile menu peek → back home.

## README
Overview (unofficial demo, not affiliated with Changi Airport Group), setup
(`pnpm install`, `pnpm dev:changi`), structure tour, how the mock data works, brand-asset
provenance note, scripts (dev/build/lint/typecheck/test/video).

## Implementation order
1. Fetch/commit brand assets → `public/brand` + `scripts/fetch-brand-assets.sh`.
2. Scaffold app config (package.json, vite, tsconfig, eslint, index.html), wire workspace.
3. Design tokens + global CSS + `cn`.
4. Types, data modules, format/flight helpers.
5. Brand + UI primitives.
6. Layout (header/mega menu/passenger-mode/footer) with real logo.
7. Home page.
8. Section pages + detail pages + routing.
9. Tests.
10. Playwright walkthrough.
11. README, lint/build/test, record video, PR.

## PR requirements
Branch `cursor/changi-airport-demo-60f4`. Lint, build, test all pass. PR titled
**feat: Changi Airport demo — passenger website clone** with Summary, fidelity notes,
test plan, demo notes, walkthrough video, and known limitations.

## Constraints
- No lorem ipsum — realistic, original Changi-style copy (do not copy site text verbatim).
- No real secrets, no live APIs, simulate everything.
- Prefer many small files over monoliths.
- Commit incrementally; if blocked, make a reasonable decision, document it, keep going.

**Success criteria:** `pnpm dev:changi` boots the site on its own port; the homepage
closely resembles changiairport.com with the official globe logo lockup in the header and
favicon; every nav destination routes to a real page; the walkthrough video plays through
the full site.
