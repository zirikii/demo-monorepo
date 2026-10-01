# Build Ticketek Demo — Website, Purchase Flow, My Account, and a personalised voice-capable Ticketek Support

## Mission

Scaffold a production-quality **Ticketek (premier.ticketek.com.au) UI clone** for demo purposes that
looks and feels like the real site, and **redesign the Ticketek support chat** around the fan: a
personalised assistant that knows the events they've been to and the tickets they hold, with a
**Chat / Voice** toggle powered by the same Grok (xAI) key the AGL demo uses. Dummy data, mock auth,
localStorage persistence. The only live integration is the optional Grok chat + voice proxy.

**Deliverable:** a single PR against `main` in demo-monorepo with the app under `apps/ticketek/`, a
computer-use verification recording, screenshots, test plan, demo credentials and limitations.

## Company profile

- **Product:** Australia's largest ticketing company (TEG). Fans buy tickets to concerts, sport,
  theatre & arts, comedy and family events; tickets are delivered as App/Mobile tickets, EzyTicket
  (print at home), venue collection or souvenir tickets. Fans can transfer tickets and resell via
  **Marketplace (Fan to Fan)**. Support is today a help centre + Zendesk forms + a "fanx" chatbot, and
  public reviews complain there's no usable live help — this demo's redesign target.
- **Primary users:** Australian fans (national, NSW/ACT, QLD/NT, SA, VIC/TAS, WA regions).
- **Core surfaces:** homepage (hero carousel, Discover, New for you, featured, waitlist), category
  mega-nav, What's On with date shortcuts, search, show page, 5-step purchase flow with a 10-minute
  session timer, venues, login / sign up, My Account (order history, mobile tickets, transfer,
  resell, favourites, waitlist, notifications, payment, password, cancel account), Where's My
  Ticket, Gift Vouchers, Agencies, Groups, Accessible Ticketing, Help centre + Submit a request.
- **Dummy-data theme:** real current Ticketek events (names and artwork from the Ticketek CDN —
  ICEHOUSE, Eric Church, Laneway '27, Bathurst 1000, Mrs Doubtfire, Swan Lake, NBL27, …) with
  illustrative prices, venues and times. Seeded fan **Jordan Mitchell** (Sydney, NSW), member since
  2013, 31 events attended, upcoming orders across every support scenario (event tomorrow,
  cancelled, rescheduled, Ticket Protect, transferable, resale-listed).

## Stack (match monorepo Vite peers)

Vite 6 + React 19 + TypeScript strict, Tailwind v4 `@theme` tokens, `lucide-react`, react-router 7
(`basename={import.meta.env.BASE_URL}`), zod, Vitest + RTL, `cn` from `@demo/ui/cn`, `asset()` for
every public file. Port **5197**, package `ticketek-website-demo`, root scripts `dev:ticketek` / `build:ticketek`.

## Brand assets (self-hosted in `public/brand/`)

- Official logo pack: `https://d35kvm5iuwjt9t.cloudfront.net/brand/Ticketek_Logo_Pack.zip`
  (`TKT-Logo-{White,Midnight,Black}-RGB.svg`, star + wordmark).
- Favicon: `https://d35kvm5iuwjt9t.cloudfront.net/static-pages/branding/favicon.ico`.
- Event artwork: `https://d35kvm5iuwjt9t.cloudfront.net/dbimages/sfx{id}.jpg` — 1050×520 tiles and
  2340×765 banners, ids in `scripts/event-images.json`, resized to WebP by
  `scripts/optimize-event-images.mjs`. `scripts/fetch-brand-assets.sh` refreshes everything;
  `brand-assets.json` records provenance. premier.ticketek.com.au itself is not reachable from the
  sandbox, so structure comes from the live `brand.css` and public research.

## Design system (from brand cheat sheet + live brand.css)

- Midnight `#001828` header + category nav; body `#f3f3f3`; text `#171717`; borders `#d7d7d7`.
- Brand accents: Pink `#FC6EEB`, Jacaranda `#9B6EEA`, gradient 90° jacaranda → pink.
- Interactive blue `#00497a` (hover `#1a6394`); green "Get Tickets" `#428226`; session timer
  yellow `#ffc300`; error `#972323`.
- Inter, 16px base; h1 34px/700. Radius 5px. `.main-content-box`: white, radius 5,
  `0 12px 44px rgba(0,0,0,.1)`, 40px padding.
- Header: logo left (70px desktop / 40px mobile), centred 728px search, cart + menu icon right;
  menu opens a white dropdown with sign-in, region selector and account links.
- Category nav: centred white links (Featured, Sports, Concerts, Theatre & Arts, Family, Comedy,
  Premium Tickets, Last Minute) with white dropdowns + date shortcuts.
- Hero carousel 31.48% aspect, bottom-left caption with 34px title + green Get Tickets, dots.
- Purchase header: yellow pill session timer + numbered progress (1–5).

## Ticketek Support (the redesign)

- Floating launcher (gradient star) on every public page; panel with personalised welcome ("Hi
  Jordan — ICEHOUSE is tomorrow night"), Chat/Voice toggle, topic tiles, flow breadcrumb, rich cards.
- Flow graph (adapted from the AGL Assistant engine: nodes with `say` templates, cards, options,
  keywords) covering **every Ticketek help flow**: Where's my ticket (per delivery method), refunds &
  exchanges (policy-routed by event status: cancelled → automatic refund, rescheduled → keep or
  refund within window, standard → Ticket Protect claim or Marketplace resale), event changes,
  transfer tickets, resell (Fan to Fan), accessible bookings (Companion Card, wheelchair), group
  bookings, payment enquiries, gift vouchers, account / login / privacy (data erasure), marketing
  unsubscribe, venue & event-day info, and handoff with a reference number.
- **Order picker** steps list the fan's own orders; choosing one records facts and routes by policy.
- **Grok chat** via `/api/chat` (Responses API + `go_to_step` / `submit_form` tools) and **Grok
  voice** via `/api/voice/session` (xAI realtime), reusing AGL's server handlers; scripted intent
  matching + browser speech as fallbacks when no key.
- **Routing rules** evaluated after every customer turn and at handoff: event within N hours →
  Event Day desk (P1); cancelled event → Refunds (auto); accessibility → Accessibility team;
  lifetime events ≥ N → Priority Fan queue; order value ≥ $X → High-value; distress / scam /
  complaint keywords → human; misunderstood twice → human; outside phone hours → callback.
- **Support Studio** at `/admin`: rule editor (toggle, reorder, thresholds, queues), simulator with
  per-rule trace, assistant settings (persona, voice, topics, personalisation), fan profile store
  (attended events, preferences), and a conversation / handoff log. All localStorage.

## Personalisation

Fan store (localStorage) with attended events, upcoming orders, favourites, waitlist, home region,
genre affinity. Drives: "Because you saw …" recommendations on the homepage, "New for you",
region-filtered listings, the assistant greeting and CUSTOMER prompt section, order pickers, and
routing signals (fan tier, event proximity, order value).

## Tests

Vitest + RTL: routes render, header menu + region selector, category nav, search + filters,
purchase flow (timer, delivery, payment → order appears in account), flow graph integrity (no
dangling `next`, every node reachable), intent matching, routing rules + trace, policy routing for
refunds, personalisation recommendations, Grok chat fallback, voice prompt builder, server env merge.

## Computer-use verification

Start `pnpm dev:ticketek`, record: homepage → category nav → show page → buy tickets (timer,
delivery, payment) → sign in → My Account order → open Ticketek Support → refund flow on the
cancelled order → voice toggle → Support Studio rule change + simulator. Screenshots of home, show,
purchase, account, support panel, studio.
