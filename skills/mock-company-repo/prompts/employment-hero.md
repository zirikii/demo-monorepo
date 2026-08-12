# Build Employment Hero Demo — Marketing Site and Employment OS Preview

## Mission

Build a production-quality, unofficial Employment Hero website demo in `apps/employment-hero/`. Match the current 2025–2026 Employment Hero visual identity and information architecture with dummy content only. The supplied black Employment Hero logo is the visual north star; use the current official horizontal SVG from Employment Hero’s CDN as the self-hosted implementation asset.

Deliver one PR against `main` with a lint-clean, test-passing, build-passing Vite + React 19 application, a recorded browser walkthrough, screenshots, demo notes, and an intentionally broken login route backed by a Jira ticket.

## Company profile

- Product: Australia’s AI-powered Employment Operating System for hiring, HR, payroll, employee experience, benefits, and global employment.
- Primary users: Australian small-business owners, people leaders, HR teams, payroll specialists, and employees.
- Core surfaces: marketing home, Employment OS, HR, payroll, hiring, ATS, employee experience, workforce management, pricing, industries, resources, company pages, login, and a dashboard preview.
- Dummy-data theme: a growing Australian technology consultancy called Acme Digital with 84 employees, open roles, leave requests, payroll summaries, onboarding tasks, announcements, and recognition.
- Current brand: black wordmark, warm violet/lilac hero surfaces, coral/pink accents, bright green highlights, large friendly display typography, rounded cards, editorial product compositions.
- Official assets:
  - `https://employmenthero.com/wp-content/themes/employmentherocom2025/assets/images/eh-logo-full.svg`
  - `https://employmenthero.com/wp-content/themes/employmentherocom2025/assets/images/small-logo.svg`
  - `https://employmenthero.com/wp-content/uploads/2025/03/2025-Logo-Black.svg`

## Repo and stack

- Repo: demo-monorepo, package under `apps/employment-hero/`
- Framework: Vite + React 19 + TypeScript
- Styling: Tailwind CSS v4 with app-owned Employment Hero tokens
- Routing: react-router-dom
- Icons: lucide-react with decorative icons hidden from assistive technology
- Forms: semantic controlled React forms
- State and persistence: React hooks + localStorage only
- Shared package: `@demo/ui` for `cn` and `DemoRibbon`
- Tests: Vitest + React Testing Library
- Quality: ESLint, strict TypeScript, Prettier

Do not add a database, real authentication, external APIs, OAuth, payments, or live AI. All data and integrations are simulated.

## Brand assets

Self-host official SVGs in `public/brand/`; include `brand-assets.json` and `scripts/fetch-brand-assets.sh`. Never hotlink assets from rendered UI. Use the supplied black logo treatment in the header and footer. Add an SVG favicon derived from the official compact mark.

## Design system

Declare all visual values in `src/index.css` under Tailwind `@theme`:

- near-black ink and white surfaces
- Employment Hero violet and lilac
- warm blush/coral highlight
- mint and bright green status accents
- soft neutral page background and border
- friendly large display headings; self-host an available open-source sans fallback
- compact body type with high legibility
- 8/16/24/32px radius scale and soft layered shadows

Build reusable `Button`, `Badge`, `Card`, `PageHero`, `SectionHeading`, `SiteHeader`, `SiteFooter`, `ProductMockup`, `ResourceCard`, `MetricCard`, and `DashboardShell` components.

## Pages

Build a navigable route for each:

1. `/` current Employment Hero homepage
2. `/products`
3. `/products/employment-os`
4. `/products/hr-software`
5. `/products/payroll-software`
6. `/products/hiring`
7. `/products/applicant-tracking-system`
8. `/products/employee-experience`
9. `/products/workforce-management`
10. `/products/hero-ai`
11. `/products/heroforce`
12. `/pricing`
13. `/solutions/small-business`
14. `/solutions/medium-business`
15. `/solutions/enterprise`
16. `/industries`
17. `/industries/healthcare`
18. `/industries/hospitality`
19. `/industries/professional-services`
20. `/resources`
21. `/resources/blog`
22. `/resources/guides-and-playbooks`
23. `/resources/webinars`
24. `/resources/templates`
25. `/customers`
26. `/partners`
27. `/about`
28. `/careers`
29. `/contact`
30. `/book-a-demo`
31. `/login`
32. `/platform/dashboard`
33. `/platform/people`
34. `/platform/payroll`
35. `/platform/recruitment`
36. `/platform/leave`

Use purpose-written content and layouts for home, product overview, pricing, resources, login, and dashboard. Use data-driven page templates with unique headings, supporting copy, feature lists, metrics, and calls to action for the remaining marketing routes.

## Intentional login defect

Purposely reproduce the same class of runtime bug used by the CommBank demo. Define login destination metadata with display-cased keys but look it up using lower-case query values via an unsafe TypeScript key assertion. Opening `/login` or selecting any login destination must throw while rendering and show Vite’s blank/error surface. This is deliberate and must be documented as a known limitation, covered by a Jira Task in DR with labels `bug`, `employment-hero`, and `low`, and not fixed during verification.

Do not add a test that fails the suite. Unit-test the surrounding route metadata, navigation, product filtering, formatting, and dashboard interactions; browser verification records the intentional login failure.

## Data and interactions

- Use local TypeScript data modules for navigation, products, industries, resources, testimonials, dashboard people, jobs, leave, payroll, and announcements.
- Include at least 25 employees and 10 candidates where lists matter.
- Add working product and resource filters.
- Add an interactive dashboard period selector.
- Add working mobile navigation, accordions, tab controls, search, and cookie dismissal.
- Dashboard routes are a clearly marked product preview and do not require login.

## Verification

Run:

- `pnpm --filter employment-hero-demo test`
- `pnpm --filter employment-hero-demo lint`
- `pnpm --filter employment-hero-demo typecheck`
- `pnpm --filter employment-hero-demo build`
- root `pnpm lint`

Then start `pnpm dev:employment-hero`, use computer use to verify home → products → pricing/resources → dashboard interaction → intentional login failure. Record the walkthrough and capture representative screenshots. Include the artifacts, credentials note, Jira link, test plan, fidelity notes, and known defect in the draft PR.

## README and constraints

README must state this is an unofficial demo not affiliated with Employment Hero, list all routes, describe dummy data and local persistence, document scripts, and identify the intentional login failure and Jira task. No lorem ipsum, secrets, real integrations, external runtime assets, or fake claims of affiliation.
