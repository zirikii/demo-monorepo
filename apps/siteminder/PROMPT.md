# Build SiteMinder Demo — Marketing Site, Mock Platform, and SiteMinder Support (chat + voice)

## Mission

Scaffold a production-quality **SiteMinder UI clone** (https://www.siteminder.com/) for demo purposes inside demo-monorepo at
`apps/siteminder/`. It must look and feel like the real marketing site, add a believable mock of the SiteMinder platform a
hotelier logs into, and rebuild **SiteMinder Support** — the help assistant — on top of the assistant engine already shipped
for AGL (`apps/agl`) and Ticketek (`apps/ticketek`): chat **and** voice, every AGL flow mapped to a SiteMinder equivalent,
personalisation from an events store, and support-team-controlled rules and routing. Dummy data, mock auth, localStorage.

**Deliverable:** one PR against `main` with a lint-clean, build-passing app, a computer-use screen recording and screenshots,
and a PR body covering summary, fidelity, verification, test plan, demo credentials and limitations.

## Company profile

- **Product:** SiteMinder, "the hotel commerce platform": channel manager (450+ channels), booking engine, website builder,
  metasearch, GDS, payments, revenue management (Dynamic Revenue Plus with IDeaS), insights, guest engagement. Little Hotelier
  for small properties. 53,000+ hotels, 300M+ annual room nights, "most awarded platform" (HotelTechAwards).
- **Primary users:** hoteliers — revenue managers, general managers and front-office teams at independent hotels and groups.
- **Core surfaces:** home ("We put you in demand."), platform/product pages, pricing, solutions by property type, customer
  stories, resources (Hotel Booking Trends, reports, podcast), integrations marketplace, about/contact, login, demo request,
  mock platform (dashboard, channels, reservations, rates & availability, events & demand, billing, team), Support assistant,
  `/admin` Support Studio.
- **Dummy-data theme:** a fictional 86-room Sydney hotel ("The Harbour Lane Hotel") run by revenue manager Sophie Tran, its
  channels, reservations, invoices, team and a store of local demand events (concerts, sport, festivals, conferences) — both
  past events with recorded results and upcoming ones.

## Stack (match monorepo Vite peers)

Vite 6 + React 19 + TypeScript strict, Tailwind v4 `@theme` tokens (own tokens, never shared), lucide-react, react-router 7,
zod, Vitest + RTL. `cn` from `@demo/ui/cn`, `asset()` from `@demo/ui/asset`. Port **5198**. Mock auth (base64 session in
localStorage; any credentials work). Grok chat/voice reuses AGL's server handlers via `server/assistantPlugin.ts`
(`XAI_API_KEY` server-only, read from `apps/agl/.env.local`, the app's own `.env.local` wins; never `VITE_`). Without a key:
scripted intent matcher for chat, browser speech for voice.

## Brand assets (self-hosted, `public/brand/`)

siteminder.com and its CDN are blocked by the sandbox egress policy, so source from SiteMinder's official YouTube channel:
- Wordmark: trace the white-background logo in thumbnail `8OBzeYHS1YM` with ffmpeg + potrace → navy `#00033B` and white
  SVGs, door mark, favicons. Never invent a logo.
- Imagery: official video thumbnails (`https://i.ytimg.com/vi/{id}/maxresdefault.jpg`) → webp, listed in `scripts/media.json`.
- `scripts/fetch-brand-assets.sh` reproduces everything; `brand-assets.json` documents sources and palette.

## Design system

- Palette: Stratos navy `#00033B`, heading ink `#181447`, royal blue `#0168F5` / `#308AFF` gradients, lime `#D1FC72`
  (the "BOOKED" pill), pastel lavender `#ECDEFF`, butter `#E9EAC2`, mint `#D4FAEB`, aqua `#77C1A7`, deep navy `#07114E`.
- Type: grotesk (Untitled Sans) → Inter. Big tight headlines, generous whitespace, rounded 16–28px cards, pill buttons.
- Primitives: SiteHeader with mega-menus (Platform, Solutions, Resources, Partners, Pricing), footer, Button/pill variants,
  stat strip, logo/award bar, product cards, testimonial carousel, CTA band, platform AppShell with sidebar.

## Pages

- `/` hero "We put you in demand." with rotating word (demand / control / sync / action / the lead), product mock with lime
  BOOKED pill, stats strip (53,000+ hotels · 300M+ room nights · Most awarded), three pillars (Distribution, Revenue, Guest
  experience), Revenue Control Centre band (Navigate decisively / Act effortlessly / Operate confidently), integrations,
  testimonials (Southern Cross Motel, La Vie Hotels & Resorts, Quest Apartments, Signature Pattaya), awards, resources, CTA.
- `/platform` + `/platform/:slug` for Channel Manager, Booking Engine, Website Builder, Metasearch, GDS, Payments, Dynamic
  Revenue Plus, Insights, Guest Engagement, Demand Plus.
- `/pricing` SiteMinder / SiteMinder Plus / Groups & Chains with comparison table and FAQ; 14-day free trial.
- `/solutions/:slug` independent hotels, groups & chains, B&Bs and small properties (Little Hotelier), apartments, resorts.
- `/customers` stories; `/resources` hub + `/resources/:slug` articles; `/integrations` marketplace with search/filter.
- `/about`, `/contact`, `/demo` (form), `/login`, `/get-started` (trial signup).

## Mock platform (`/app`, login required)

Dashboard (today, pickup, channel health, next event, insights), Channels (status, mapping errors, reconnect), Reservations
(filter by status/channel), Rates & availability (14-day grid by room type, bulk update), Events & demand (the events store:
past outcomes, upcoming events, add/remove), Billing (invoices, plan, payment method), Team (users), Help (support code).

## SiteMinder Support assistant

Port the Ticketek/AGL engine: one flow graph is the source of truth for chat **and** voice; reducer, scripted intent
matcher (safety → live options → keywords), zod forms, Grok chat (`go_to_step`, `select_record`, `submit_form`) and Grok
realtime voice with browser-speech fallback, one shared prompt builder.

**Every AGL flow gets a SiteMinder counterpart:**

| AGL topic | SiteMinder topic | Flows |
| --- | --- | --- |
| Billing & payments | Billing & subscription | pay invoice (saved card / bank transfer / other), invoice higher than expected (bookings, add-on, unchanged), understand invoice, direct debit, credit refund |
| Internet & mobile | Channels & connectivity | channel picker routed by status: mapping error, credentials expired (form), paused, healthy → live sync test; platform status; add a channel; stop-sell troubleshooting |
| Meters | Rates & availability | bulk rate update (form), rates not updating, restrictions, rate parity |
| Moving | Property changes | add a property (form), switch PMS (form), close a property, fees |
| Account | Account & users | add a user (form), billing details (form), compare/switch plan, login & MFA reset, support code |
| Payment support | Payment support | extension, instalment plan, seasonal pause, financial difficulty |
| Emergency | Urgent issues | overbooking / guest at the desk, all channels down, phishing & account security, card fraud & chargebacks |
| Solar | Grow revenue | Demand Plus, Dynamic Revenue Plus, Website Builder, guest upsells, growth callback (form) |
| — | Reservations | booking picker routed by status: missing in PMS, modified, cancelled, card declined, overbooked |
| — | Events & demand | upcoming-event playbook (forecast + comparable past events), apply event pricing (form), channel readiness, past-event review, insights from history, add an event (form) |

**Personalisation:** the events store (past events with occupancy, ADR, uplift and sell-out lead time; upcoming events with
forecasts) drives the welcome view, greeting, event flows, insights and the Grok prompt; channel/booking/invoice state drives
alerts. Studio toggles control personal greeting, history in the prompt and insights.

**Rules & routing (Support Studio `/admin`):** ordered rules, each a condition + action (`handoff` interrupts, `route`
picks the queue) + queue + P1–P4. Conditions: keywords, sentiment, misunderstood, repeat contact, topic, upcoming event within
N days, event within N days **and** a channel issue, booking status, plan, property size, overdue invoice. Every handoff
shows "Why this team?" with a trace of every rule. Simulator, conversation log, assistant settings (persona, voice, topics,
hours, custom instructions) and property profile/events store with reset.

**Design:** nicer than Ticketek's panel — royal/lime gradients, larger panel with a context rail on wide screens (property
snapshot, next event, channel health), polished voice orb, record tiles for channels/bookings/invoices/events.

## Tests

Flow integrity (no dangling/unreachable steps, unknown placeholders, router links), conversation reducer, intent, forms,
routing, session/handoff, effects on the property store, event insights, voice prompt, assistant UI, app routes/auth,
server env plugin.

## Verification & PR

Lint, typecheck, test, build. Computer-use walkthrough recorded: landing with logo → login → dashboard → open Support → run a
flow → voice mode → Studio routing. Screenshots of landing, platform and assistant. Draft PR with artifacts.
README must say: unofficial demo, not affiliated with SiteMinder.
