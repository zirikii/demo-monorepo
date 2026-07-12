# Build Changi Airport Website Demo — Full Public Site Clone

## Mission

Scaffold a production-quality **Changi Airport public website clone** for demo purposes that closely follows `https://www.changiairport.com/au/en.html` and the attached Changi Airport logo. This is a UI/UX fidelity demo, not a production app: dummy data, local JSON/content, no real external services.

**Deliverable:** a single PR against `main` with a complete, lint-clean, build-passing Vite React app under `apps/changi` that runs locally via `pnpm dev:changi`.

## Company profile

- **Product:** Changi Airport's public passenger portal for flights, terminal guidance, shop/dine, attractions, happenings, rewards, app help, and destination inspiration.
- **Primary users:** Travellers arriving, departing, transiting, or visiting Changi Airport from the Australia-localized public site.
- **Core surfaces to clone:** Homepage, Fly, At Changi, Dine & Shop, Experience, Happenings, Rewards, Help, destination detail, and sign-up/account teaser.
- **Dummy-data theme:** Airport passenger journeys, flight rows, terminal services, promotions, destination guides, rewards benefits, and Changi App content.

## Repo context

- Repo: `demo-monorepo`
- pnpm workspace with independent apps under `apps/*` and shared `@demo/ui`. Add Changi as `apps/changi`, wire root scripts, and keep framework conventions aligned with the existing Vite React demo apps. The requested `/monorepo-alignment` skill is not present in this checkout or plugin cache, so use the monorepo standards observable in existing apps.

## Target tech stack

| Layer | Technology |
|-------|------------|
| Framework | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` plus CSS variables |
| Components | Local reusable components plus shared `@demo/ui` helpers |
| Icons | `lucide-react` |
| State | React hooks/context only |
| Data | Local TypeScript seed modules |
| Routing | `react-router-dom` |
| Tests | Vitest + React Testing Library |
| Visual test | Playwright walkthrough with screenshots/video |
| Lint/format | ESLint + Prettier |

Explicitly DO NOT integrate real databases, cloud providers, CMS APIs, OAuth, or payment providers.

## Brand assets — source real files (do this first)

Before writing UI code, fetch and commit official brand assets so the app looks like a Changi-branded site.

**Sources to try (in order):**

1. Live page asset paths from `https://www.changiairport.com/au/en.html`.
2. Official positive logo: `https://www.changiairport.com/content/dam/changiairport/sg/airport/evergreen/homepage/Logo_CAG_Horizontal_RGB_Pos.svg`.
3. Official light header logo: `https://www.changiairport.com/content/dam/changiairport/common/header/logo-light.png`.
4. Favicons/app icons: `https://www.changiairport.com/etc.clientlibs/changiairport/clientlibs/clientlib-site/resources/icon-192x192.png`.
5. Homepage happening imagery:
   - `https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/events-and-campaigns/2025/lcd-miffy-garden-in-changi/outlets-deals/baba-nyonya-outlet-deals-cf.jpg`
   - `https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/promos/2026/fly-with-changi-rewards-and-singapore-airlines/cr-sa-banner.jpg`
   - `https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/events-and-campaigns/2026/peanuts/peanuts-homepage-desktop.jpg`
   - `https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/promos/2026/celebrate-jewel-blooms-with-lego-botanicals/celebrate-jewel-blooms-with-lego-botanicals-wide.jpg`
6. Footer/app/social assets from the same live page if needed.
7. Gallery/brand portal (`https://gallery.changiairport.com/`) only as a source reference; automated fetch can be 403-protected.

**Required files in `apps/changi/public/brand/`:**

- `logo.svg` (positive Changi logo; must match the attached logo in the header)
- `logo-light.png`
- `favicon.png`
- `happening-outlet-deals.jpg`
- `happening-rewards-sia.jpg`
- `happening-peanuts.jpg`
- `happening-lego-botanicals.jpg`
- `brand-assets.json`

**How to fetch (agent must execute, not skip):**

1. Create `apps/changi/public/brand/`.
2. Download each asset with `curl -L -o apps/changi/public/brand/<name> "<url>"`.
3. Write `apps/changi/public/brand/brand-assets.json` listing each file, original source URL, and fetch date.
4. Add `apps/changi/scripts/fetch-brand-assets.sh` that reproduces all downloads.
5. Wire assets in `index.html` and React layout: favicon, header `<img>`, footer logo. **No external hotlinks**.
6. Preserve logo aspect ratio and clear-space; do not recolor, rotate, or distort the logo.

Fallback: if a specific asset is behind a consent gate, document it in README and use the closest asset from the live website header. Never invent a fake logo.

## Design system — match the real UI

- Visual language: warm beige/off-white background, Changi brown typography, white card surfaces, orange/gold/purple accents from the logo, rounded cards, editorial imagery, and spacious content sections.
- Primary brand colors: `#806d5d` Changi brown, `#f15a24` orange, `#d71920` red, `#a51773` purple, `#f5a400` gold, `#f7f3ee` page beige, `#1f1a17` dark brown.
- Header: sticky white header with the attached/official Changi logo on the left, primary nav (`Fly`, `At Changi`, `Dine & Shop`, `Experience`, `Happenings`, `Changi Rewards`, `App & Help`), search/language/account actions, and mobile menu.
- Homepage hero: replicate the live site's "Airport / I AM / ARRIVING" passenger-direction selector with tabs for Arriving, Departing, Transiting, Visiting and a "Useful information for {direction} passengers" service panel.
- Include a cookie preference banner matching the live copy and a dismiss button.
- Build reusable primitives: Header, MobileMenu, Footer, PageHero, DirectionTabs, InfoCard, HappeningCard, DestinationCard, ServiceTile, RewardsCard, Button, Badge, CookieBanner, AppPromo.

## Application structure

Build a large, navigable codebase organized by feature:

```text
apps/changi/
  public/brand/
  scripts/fetch-brand-assets.sh
  src/
    components/brand layout home shared ui
    data/
    hooks/
    lib/
    pages/
    test/
```

## Pages — detailed requirements

### Homepage (`/`)

Use content from `https://www.changiairport.com/au/en.html`:

- Header and nav.
- Passenger-direction hero with "Airport", "I AM", "ARRIVING", the four tabs, and useful information cards.
- "What's Happening" cards:
  - Outlet Deals — "Shop and save: check out the latest deals!"
  - Fly with Changi Rewards x Singapore Airlines — "Land yourself at your dream destination when you spend with Changi Rewards."
  - Ready, Sweat, Go! with Snoopy & his Siblings — "Get active with adorable Peanuts premiums, exciting play activities, photo spots and more!"
  - Celebrate Jewel Blooms with LEGO Botanicals — "Bloom into a floral wonderland with the largest LEGO Botanicals activation at Jewel!"
- "Explore cities we are flying to today" destination grid:
  Kyoto, Rome, Surabaya, Cebu, Phnom Penh, Melbourne, Penang, Haikou, Addis Ababa, Jeonju, Bahrain, Busan, Ipoh, Sibu, London, Tokyo, Amsterdam, Bangkok, Jeju, Hong Kong.
- Footer with app download, follow us, Changi Sites, privacy/by-laws, and copyright.
- Cookie banner with the live copy.

### Fly (`/fly`)

Flight Information, Airline Information, Arrival Guide, Departure Guide, Transiting Guide, Lounges, plus mock flight rows and filters.

### At Changi (`/at-changi`)

Terminal maps/facilities guide with "Explore our terminals", Airport Services, Flight Information, Transport, Facilities, Airport Map, Lost & Found, Free Wifi Access, and "Find your way".

### Dine & Shop (`/dine-and-shop`)

"More dine and shop options" and "Enhance your experience when you dine and shop at Changi" with benefits: Earn rewards points, shopping concierge, Changi Pay e-wallet, order and collect with iShopChangi.

### Experience (`/experience`)

Attractions list: Sunflower Garden, Dreamscape, Enchanted Garden, with "View all" and attraction cards.

### Happenings (`/happenings`)

Events, deals, promotions, and quick links to Shop & Dine, Changi Pay, Facilities, Lost & Found, Wifi Access.

### Changi Rewards (`/rewards`)

Use live copy: "Open the door to a realm of personalised deals, exclusive privileges, and beyond with Changi Rewards." Include benefits/privileges cards (GST-Absorbed Shopping, Parking Privileges, Redeem & Save More, Rewards Catalogue, Online Shopping Perks, Jewel Double Rewards), plus My Rewards, Member's Specials, Member's Exclusive Events, and Rewards Catalogue.

### App & Help (`/help`)

Assistance, Changi App, Contact Information, app download, useful contacts, and support topics.

## Data layer

- Store nav, directions, happenings, destinations, services, flights, facilities, rewards, and footer links in TypeScript data modules.
- Use deterministic mock data only. No runtime persistence or API calls.

## Code quality

TypeScript strict, ESLint clean, build clean, accessible semantic HTML, responsive layout, no console errors on happy paths, comments only for non-obvious logic.

## Tests (minimum)

Vitest + RTL covering:

- Direction tab interaction and heading text.
- Header active nav state.
- Destination grid renders at least 20 city cards.
- Flight filter utility.
- Cookie banner dismiss state.

Add `"video": "playwright test walkthrough.spec.ts"` and generate a visual walkthrough artifact.

## README

Replace default README: overview (unofficial demo, not affiliated with Changi Airport Group), prerequisites, setup (`pnpm install && pnpm dev:changi`), project structure tour, brand asset sources, scripts, test plan, visual testing notes, and known limitations.

## Implementation order

1. Fetch brand assets -> `apps/changi/public/brand/` + `apps/changi/scripts/fetch-brand-assets.sh`
2. Install/wire deps and root scripts
3. Design tokens + global CSS
4. Types, seed data, and route metadata
5. Layout/header/footer
6. Homepage hero and live-page content sections
7. Remaining pages
8. Tests
9. Playwright visual walkthrough
10. README + lint/build/test + PR

## PR requirements

Branch `cursor/changi-airport-demo-dda3` per cloud-agent branch policy. Run lint, build, unit tests, and Playwright visual walkthrough. Open PR titled **feat: add Changi Airport website demo** with Summary, Fidelity notes, Test plan checklist, Demo/preview instructions, Visual testing artifact notes, and Known limitations.

## Constraints

- No lorem ipsum; use realistic airport copy.
- No real secrets.
- No real integrations; simulate all data.
- Prefer many small files over monoliths.
- Commit incrementally; if blocked, make a reasonable decision, document it, and keep going.

**Success criteria:** `pnpm install && pnpm dev:changi`, open the app, see a Changi-like public website with the official/attached logo in the header, content closely matching `https://www.changiairport.com/au/en.html`, unit tests pass, build passes, and a Playwright visual testing artifact is captured.
