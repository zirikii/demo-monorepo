# Changi Airport Website Demo

Unofficial Changi Airport public website demo for visual fidelity and monorepo testing. This project is not affiliated with, endorsed by, or sponsored by Changi Airport Group; public assets are self-hosted from publicly reachable Changi Airport pages for demo fidelity only.

## What is included

- Vite + React 19 + TypeScript app under `apps/changi`.
- Homepage matching `https://www.changiairport.com/au/en.html` as closely as possible from public content: passenger direction tabs, What's Happening, destination grid, footer, and cookie banner.
- Additional public routes: Fly, At Changi, Dine & Shop, Experience, Happenings, Changi Rewards, App & Help, and destination details.
- Official Changi logo, favicon, and campaign imagery committed under `public/brand`.
- Unit tests plus Playwright visual walkthrough that writes screenshots/video to `/opt/cursor/artifacts`.

## Getting started

```bash
pnpm install
pnpm dev:changi
```

Open http://localhost:5176.

## Scripts

```bash
pnpm --filter changi-airport-demo lint
pnpm --filter changi-airport-demo test
pnpm --filter changi-airport-demo build
pnpm --filter changi-airport-demo video
```

## Project structure

- `src/data` stores navigation, passenger-direction, destination, rewards, services, and flight seed data.
- `src/components/layout` contains the sticky header, footer, page shell, mobile menu, and cookie banner.
- `src/components/home` contains the Changi homepage sections.
- `src/pages` contains route-level pages.
- `public/brand/brand-assets.json` records asset source URLs and fetch date.

## Brand assets

Assets were fetched from public Changi Airport URLs discovered from the live page source. Re-run:

```bash
apps/changi/scripts/fetch-brand-assets.sh
```

The header uses `/brand/logo.svg`, matching the supplied Changi Airport logo orientation and color treatment.

## Known limitations

- This is a static, mocked frontend. It does not call Changi systems, real flight APIs, auth, commerce, or rewards services.
- Some live Changi imagery/menus are consent-, script-, or CDN-dependent; the demo uses public assets and text visible from the live page fetch.
- The design aims for close visual fidelity, not an exact byte-for-byte clone.
