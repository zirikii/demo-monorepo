# Employment Hero demo

An unofficial Employment Hero website and Employment OS preview built for demonstration purposes. This project is not affiliated with, endorsed by, or connected to Employment Hero Pty Ltd.

## Run locally

```bash
pnpm install
pnpm dev:employment-hero
```

The app runs at `http://localhost:5180`.

## What is included

- Current-style Employment Hero marketing homepage
- Employment OS, HR, payroll, hiring, ATS, employee experience, workforce management, Hero AI, and HeroForce product pages
- Small, medium, enterprise, and industry solution pages
- Pricing comparison with billing toggle and FAQs
- Resource hub, blog, guides, webinar, and template views with working search and filters
- Customer, partner, about, careers, contact, and book-a-demo pages
- Employment OS previews for overview, people, payroll, recruitment, and leave
- 25 local demo employee records and 10 local candidate records

All company, people, payroll, candidate, customer, and usage data is fictional. Preferences and form submissions use localStorage only. No real authentication, customer account, AI, payroll service, database, analytics, or external API is connected.

## Intentional defect

The `/login` route intentionally reproduces the CommBank demo’s portal-key casing bug. Login destinations use display-cased configuration keys, while the route looks them up with lower-case query values. The unsafe assertion hides the mismatch from TypeScript, then the page throws while reading the missing portal at runtime. This deliberate low-priority defect is tracked in Jira for the bug-fixing demo flow.

The Employment OS preview remains directly available at `/platform/dashboard`, so the rest of the demo can be explored without authentication.

## Scripts

```bash
pnpm dev
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm brand
```

`pnpm brand` attempts to refresh the official Employment Hero SVGs from the company website. The committed assets are self-hosted and based on the supplied official logo reference so the app has no runtime hotlinks.

## Brand assets

Brand files live in `public/brand/`, with provenance in `brand-assets.json`. Employment Hero names, marks, and product language remain the property of their respective owner and are used here only for an unofficial interface demonstration.
