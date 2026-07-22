# Optus Business Hub Demo

Unofficial Optus Enterprise and Business UI demo. This project is not affiliated with Optus, Singtel Optus Pty Limited, or any Optus product team. It uses public brand cues, the user-provided Optus SVG logo, local JSON data, and mock authentication for visual demo purposes only.

## What it includes

- Marketing homepage and pricing page styled with Optus teal and yellow.
- Mock login/signup with signed HTTP-only demo cookies.
- Protected Business Hub routes for Overview, Fleet Manager, Insight Plus, Billing, Services, Reports, and Settings.
- Local JSON persistence for fleet status, report subscriptions, integrations, users, and team settings.
- Self-hosted brand assets in `public/brand/` plus a reproducible `scripts/fetch-brand-assets.sh` helper.

## Run locally

`pnpm install && pnpm dev:optus`

Then open `http://localhost:3000`.

## Demo credentials

Any email and password work. Suggested: `admin@example.com` / `demo`.

## Scripts

- `pnpm dev` - start the app.
- `pnpm build` - production build.
- `pnpm lint` - Next lint.
- `pnpm test` - Vitest suite.
- `pnpm fetch-brand` - attempt official Optus asset downloads and regenerate SVG fallbacks.

## Data model

The app reads and writes JSON files in `data/`. API routes use atomic temp-file writes so demo changes survive page refreshes during local testing. No real database, API key, OAuth provider, Optus backend, or paid service is used.

## Brand asset note

The official Optus media-centre logo page is listed in `public/brand/brand-assets.json`. The committed logo uses the SVG supplied in the `/mock-company-repo` request, filled with Optus teal for fidelity. The white logo and favicon are local derivatives for UI completeness.
