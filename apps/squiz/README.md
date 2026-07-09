# Squiz Website Demo (unofficial)

A pure React single-page rebuild of the [squiz.net](https://www.squiz.net) marketing site,
built as a demo app in this monorepo. **Unofficial demo — not affiliated with, endorsed by,
or connected to Squiz.** The layout and visual language mirror the public site's 2026 design;
all body copy is original writing on the same themes, and customer stories are fictionalized.

## Stack

- Vite 6 + React 19 + TypeScript (SPA — no Next.js, per the brief)
- react-router-dom v7
- Tailwind CSS v4 (CSS-first `@theme` tokens in `src/index.css`)
- `@demo/ui` workspace package (`cn` class merger + `<DemoRibbon>` in the header)
- Self-hosted fonts via `@fontsource` (Spline Sans headings, Inter body)
- lucide-react icons
- Vitest + React Testing Library
- Playwright walkthrough recorder (`pnpm video`)

## Getting started

```bash
# from the repo root
pnpm install
pnpm dev:squiz        # http://localhost:5175

# or from apps/squiz
pnpm dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server on port 5175 |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Serve the production build |
| `pnpm lint` | ESLint (flat config) |
| `pnpm test` | Vitest unit suite (17 tests) |
| `pnpm video` | Playwright walkthrough recorder — needs a dev server running and `pnpm exec playwright install chromium` |

## Pages (25+ routes)

- `/` — homepage: hero, difference strip, three product spotlights with customer-story
  callouts, testimonial, dark CTA band, industry marquee, persona tabs, insights carousel
- `/products/digital-experience-platform`, `/products/squiz-funnelback-search`,
  `/products/content-intelligence`
- `/products/capabilities` + 13 data-driven capability detail pages
- `/industries` + 6 industry pages
- `/use-cases` + 6 use-case pages
- `/customer-stories` + 6 fictionalized story pages (filterable by industry)
- `/blog` + 9 original posts (filterable by category)
- `/about`, `/careers`, `/partnerships`, `/roadmap`, `/demos`
- `/contact`, `/book-a-call` (client-side validated forms with success states)
- `/security`, `/legal`, `/legal/privacy-policy`, 404 catch-all

## Structure

```
src/
  components/
    brand/      SquizLogo (user-supplied wordmark SVG, currentColor)
    layout/     AnnouncementBanner, Header, MegaMenu, MobileMenu, Footer, PageLayout
    home/       Hero, DifferenceStrip, ProductSpotlight, TestimonialBand, CtaBand,
                IndustryBadges, PersonaTabs, InsightsCarousel
    shared/     PageHero, Breadcrumbs, CapabilityCard, StoryCard, PostCard,
                CtaSection, FaqSection, ContactForm
    ui/         Button, Badge, SectionHeading, Accordion, Icon
  data/         capabilities, industries, useCases, stories, posts, personas, company, nav
  pages/        one component per route
  lib/          cn (re-export from @demo/ui), tint helpers
  test/         Vitest suites
e2e/            Playwright walkthrough recorder
```

All content lives in typed `src/data/*.ts` modules; detail pages resolve by slug, so adding
a capability/industry/story/post is a data-only change.

## Design tokens

Extracted from the public site's design language: navy ink `#001822`, mint accent
`#96F2A9`, cream surfaces `hsl(40 33% 98%)` / `hsl(45 22% 96%)`, Spline Sans headings +
Inter body, 16px card radius, pill buttons, asymmetric "shape" corners (24–48px).

## Demo limitations

- Forms validate client-side only; nothing is transmitted or stored.
- Demo video players are simulated (no real video assets).
- Search, login, and portal links are illustrative.
