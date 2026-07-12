# Build Spark NZ Travel and Move Page Demo

## Mission

Scaffold a production-quality **Spark NZ promotional page clone** for demo purposes that closely matches the live Spark page at `https://www.spark.co.nz/online/shop/promotions/travel-and-move` and the supplied Spark NZ logo reference. This is a UI/UX fidelity demo, not a production app: dummy data, mock interactions, local JSON/TypeScript seed data, and no external services.

**Deliverable:** a single PR against `main` with a complete, lint-clean, build-passing monorepo app that runs locally via `pnpm install && pnpm dev:spark`.

## Company profile

- **Product:** Spark New Zealand provides broadband, mobile, prepaid, travel SIM/eSIM, device, entertainment, and support services for consumers and businesses.
- **Primary users:** Travellers arriving in New Zealand, people moving to New Zealand, and existing Spark customers looking for short-term mobile connectivity.
- **Core surface to clone:** The Spark NZ "travel and move" promotional/shop page, with Spark's header/navigation, purple travel-pack hero, plan cards, store purchase guidance, existing-SIM action cards, FAQ accordions, standard-rate table, and footer links.
- **Dummy-data theme:** NZ travel and arrival scenarios: Auckland Airport, Christchurch Airport, Queenstown, free hotspots, local/international minutes, eSIM/physical SIM, top-up, Spark app, and prepaid extras.

## Repo context

- Repo: `demo-monorepo`
- Monorepo app addition. Create `apps/spark/` as a Vite + React 19 + TypeScript SPA, matching the existing `apps/paytm` and `apps/squiz` conventions. Wire it into the root workspace scripts. Do not delete or restart existing apps.

## Target tech stack

| Layer | Technology |
|-------|------------|
| Framework | Vite + React 19 SPA |
| Styling | Tailwind CSS v4 CSS-first tokens in `src/index.css` |
| Components | Local small components + shared `@demo/ui` helpers |
| Icons | lucide-react plus self-hosted SVG/PNG assets |
| Forms | Local controlled React forms where needed |
| Tables | Semantic HTML tables for rates |
| State | React hooks |
| Data | Local TypeScript seed files |
| Auth | None required for this single public promotional page |
| API | None required; simulate actions locally |
| Tests | Vitest + React Testing Library |
| Lint/format | ESLint + Prettier-compatible TypeScript |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, payments, or Spark systems.

## Brand assets - source real files first

Before writing UI code, fetch and commit official/public Spark assets so the app looks like Spark's web property.

**Sources to try, in order:**

1. Official Spark header logo from the Spark site: `https://www.spark.co.nz/content/dam/sparkdigital/images/logo/purple.svg`
2. Spark favicon/apple-touch assets from `https://www.spark.co.nz/`
3. Travel-pack page imagery from Spark's DAM:
   - `https://www.spark.co.nz/content/dam/spark/images/backgrounds/marketing/hero-banners/travel-pack/qtown-590x203.png`
   - `https://www.spark.co.nz/content/dam/spark/images/backgrounds/marketing/hero-banners/travel-pack/beach-590x203.png`
   - `https://www.spark.co.nz/content/dam/spark/images/backgrounds/marketing/hero-banners/travel-pack/mount-590x203.png`
4. Spark plan icons from the page:
   - `https://www.spark.co.nz/content/dam/telecomcms/responsive/images/shop/mobile/plans-pricing/icon-cirlce-black-150x150-sim.svg`
   - `https://www.spark.co.nz/content/dam/telecomcms/responsive/images/shop/mobile/plans-pricing/wifi-icon-150x150.png`

**Required files in `apps/spark/public/brand/`:**

- `logo.svg`
- `favicon.svg` or `favicon.ico`
- `travel-queenstown.png`
- `travel-beach.png`
- `travel-mount.png`
- `sim-icon.svg`
- `wifi-icon.png`
- `brand-assets.json`

**How to fetch:**

1. Download each asset with `curl -L -o apps/spark/public/brand/<name> "<url>"`.
2. If favicon discovery fails, create a small Spark-purple SVG favicon derived from the public logo mark style and document the fallback.
3. Write `apps/spark/public/brand/brand-assets.json` listing filename, original source URL, and fetched date.
4. Add `apps/spark/scripts/fetch-brand-assets.sh` that reproduces the downloads idempotently.
5. Wire assets in `index.html`, header logo, hero imagery, plan cards, and visual sections. Do not hotlink external URLs.

## Design system - match the real UI

- Use Spark purple as the dominant brand color (`#5f259f`) with deep purple (`#3d1475`), bright magenta-purple accents, pale lavender surfaces, white cards, and black/charcoal body text.
- Header: white, wide Spark logo at left, desktop nav with categories similar to Spark (`Shop`, `Deals`, `Mobile`, `Broadband`, `Help & support`), right-side `MySpark`, search icon, cart icon, and a purple mobile-menu affordance.
- Page content: Spark-style blocky campaign design, uppercase hero headline, large purple panels, rounded white cards, bold prices, compact feature rows, and clear CTA buttons.
- Typography: use Inter as the self-hosted sans-serif closest available; emphasize heavy uppercase hero copy.
- Responsive behavior: hero stacks on mobile, plan cards become a single column, nav collapses to a menu, table scrolls horizontally.

Build reusable primitives: Header, Footer, Section, PlanCard, InfoCard, Accordion, StandardRatesTable, Button, HeroImageMosaic, MobileMenu.

## Application structure

Build a navigable but focused codebase:

```
apps/spark/
  public/brand/
  scripts/fetch-brand-assets.sh
  src/
    components/
      layout/ Header Footer MobileMenu
      travel/ Hero TravelPackSection BuyingGuide ExistingSimActions FaqSection
      ui/ Button Accordion Card SectionHeading
    data/ navigation travelPacks faq rates actions
    lib/ cn format
    pages/ TravelAndMovePage NotFoundPage
    test/
  index.html
  package.json
  vite.config.ts
  eslint.config.js
  README.md
```

## Pages - detailed requirements

### Travel and move page (`/` and `/online/shop/promotions/travel-and-move`)

Match the Spark source page as closely as practical:

- Header with official Spark logo in the header, using the provided logo reference and committed official SVG.
- Breadcrumb/back link area.
- Hero:
  - `NZ Travel Packs`
  - `EXPERIENCE NEW ZEALAND ON A LOCAL MOBILE NETWORK`
  - "Stay connected while you explore New Zealand. Our plans have plenty of data, texts and minutes."
  - Queenstown/travel image tile and purple Spark styling.
- Intro:
  - "Get connected with a Spark Travel Pack."
  - "If you're planning to visit New Zealand for up to three months, make your trip that little bit easier with a Spark Travel Pack."
  - "Travel Packs are only available in store."
  - Link/CTA: "Here for longer? See our range of plans and extras"
- Plan cards:
  - $29: 2GB, 200 NZ only minutes, 100 international minutes, 200 NZ only texts, 100 international texts, physical Trio SIM or eSIM, free hotspot.
  - $49: 10GB, 200 NZ only minutes, 200 international minutes, 200 NZ only texts, 200 international texts, SIM/eSIM, free hotspot.
  - $79: 50GB, unlimited NZ only minutes, 200 international minutes, unlimited NZ only texts, 200 international texts, SIM/eSIM, free hotspot.
  - $129: Endless data, speed reduced after 100GB, unlimited NZ only minutes, 300 international minutes, unlimited NZ only texts, 300 international texts, SIM/eSIM, free hotspot.
  - Each card shows "Plan lasts for three months" and a simulated "Click & collect" button that opens a demo-only toast/banner.
- Terms footnote:
  - International minutes/text country list from Spark page.
  - Text exclusions and Endless data speed reduction note.
- Where to buy:
  - Check phone compatibility.
  - Purchase a Travel Pack when you arrive; Spark has stores at Auckland and Christchurch Airports and around New Zealand.
  - Note: "We don't ship Travel Packs overseas."
- Already have this SIM:
  - Quick top up.
  - Download the Spark app.
  - Buy extras.
  - Staying longer CTA.
- FAQ accordions:
  - How do Travel Packs work?
  - What do I do if I run out of data, minutes or texts?
  - What do I do when my three-month Travel Pack expires?
  - What are the standard rates for calls, texts and data?
  - Questions about Endless data.
  - Terms links/other terms and conditions.
- Standard rates table:
  - Additional NZ minutes $0.49/min, NZ texts $0.20/message, MMS $0.50/message, video calling $0.89/min, international SMS $0.30/message, casual data $1/day for 10MB, additional data $0.30/MB, voicemail $0.20/retrieval, video messaging $1/message, international calling $0.91/$1.43.
- Footer with Spark-like support and shop links plus unofficial demo disclaimer.

## Data layer

- Keep page data in TypeScript modules so tests can validate it.
- No network calls at runtime.
- All interactions are simulated and clearly labelled demo-only.

## Code quality

TypeScript strict, ESLint clean, build clean, accessible semantic HTML, responsive, no console errors, comments only for non-obvious logic. Use `@demo/ui/cn` via a local re-export to satisfy monorepo shared-package alignment.

## Tests

Vitest + RTL covering:

- Hero headline and intro content render at both route aliases.
- Plan cards render correct prices/data and simulated Click & collect feedback.
- Accordion expands standard rates/endless data details.
- Header renders official logo alt text and core nav items.
- Formatting helper for prices/data labels.

Add `"test": "vitest run"` and keep `pnpm --filter spark-nz-travel-demo test` passing.

## README

Replace default README with: overview, unofficial/not affiliated disclaimer, prerequisites, setup (`pnpm install && pnpm dev:spark`), route list, project structure, assets/fetch script notes, quality gates, and known limitations.

## Implementation order

1. Fetch brand assets -> `apps/spark/public/brand/` + `apps/spark/scripts/fetch-brand-assets.sh`
2. Install/reuse deps through workspace package metadata
3. Design tokens + global CSS
4. Types, seed data, content
5. App shell + nav with official logo
6. Hero and plan-card surface
7. Buying guide, existing SIM actions, FAQ, rates, footer
8. Tests
9. README + lint/build/test + visual walkthrough recording
10. Commit, push, and PR

## PR requirements

Branch `cursor/spark-nz-travel-page-e6b5`. Run lint, build, test, and capture a Playwright video/screenshot walkthrough. Open PR titled **feat: add Spark NZ travel page demo** with Summary, visual fidelity notes, test plan checklist, demo route, and known limitations.

## Constraints

- No lorem ipsum.
- No real secrets.
- No real Spark integrations or checkout.
- Prefer many small files over a monolith.
- Official logo + favicon committed in `apps/spark/public/brand/`, rendered in header and browser tab.
- README must state this is an unofficial demo, not affiliated with Spark NZ.

**Success criteria:** `pnpm install && pnpm dev:spark`, open `/online/shop/promotions/travel-and-move`, and see a Spark-branded travel pack page matching the real page content and visual hierarchy closely, including the official logo in the header and a recorded visual test artifact.
