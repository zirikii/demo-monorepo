# Build AGL Demo — Website, My Account, and a voice-first AGL Assistant

## Mission

Scaffold a production-quality **AGL (agl.com.au) UI clone** for demo purposes that looks and feels
like the real site, and rebuild the **AGL Assistant support chat** as a much nicer, voice-capable
experience. Dummy data, mock auth, localStorage persistence. The only external integration is an
optional **Grok Voice (xAI realtime)** connection that activates when `XAI_API_KEY` is present.

**Deliverable:** a single PR against `main` in demo-monorepo with the app under `apps/agl/`, a
computer-use verification recording, screenshots, test plan, demo credentials and limitations.

## Company profile

- **Product:** Australia's largest integrated energy retailer — electricity, gas, nbn internet,
  mobile SIM plans, solar & batteries, EV plans. Customers self-serve via My Account, the AGL app,
  and the AGL Assistant (AI chat, 24/7, hands off to humans).
- **Primary users:** residential customers in NSW, VIC, QLD, SA and the ACT.
- **Core surfaces:** homepage, compare energy plans, internet, mobile, solar & batteries, EVs,
  moving house, Help & Support hub + articles, Contact us, log in, My Account, **AGL Assistant**.
- **Dummy-data theme:** a Newtown NSW household (Alex Nguyen) with electricity + gas on Value
  Saver, AGL nbn 100 and a Medium 80GB SIM. Ausgrid / Jemena distributors. Real AGL numbers
  (131 245, 1300 659 925 hardship line) and real AGL help content paraphrased.

## Stack (match monorepo Vite peers)

Vite 6 + React 19 + TypeScript strict, Tailwind v4 `@theme` tokens, `lucide-react`, react-router 7,
react-hook-form + zod, Vitest + RTL, `cn` from `@demo/ui/cn`, `<DemoRibbon>` in the header.
Port **5185**, package `agl-website-demo`, root scripts `dev:agl` / `build:agl`.

## Brand assets

`agl.com.au` is unreachable from the build sandbox, so the official lockup was supplied as a
transparent PNG (`brand-source/agl-logo-source.png`). `scripts/derive-brand-assets.mjs` uses sharp
to produce `public/brand/logo.png`, `logo-white.png`, `mark.png`, `favicon.png`,
`apple-touch-icon.png`, and documents provenance in `brand-assets.json`. Never invent a logo.

## Design system

- Logo gradient sampled from the PNG: deep blue `#0046bd` → cyan `#00e1ee` → light cyan `#42e8f1`.
- AA-safe interactive blue `#0a2bb5`, dark `#061d86`, navy `#001033` for voice mode.
- Rounded cards (16–24px), pill buttons, AGL's signature large curve on hero media.
- Humanist sans (Nunito Sans, self-hosted via @fontsource).

## AGL Assistant — the centrepiece

1. **One flow graph** (`src/features/assistant/flows/*`) mirrors AGL's help taxonomy: Billing &
   payments, Internet & mobile, Moving house, Meters & readings, My account & plan, Payment
   support, Outages & emergencies, Solar & batteries, plus "talk to a person". Every node has the
   assistant line (text + spoken), quick-reply options, optional rich card (bill, steps, outage
   status, speed test, forms, handoff), and intent keywords.
2. **Opening turn:** "Hi Alex, what's your query today?" with topic cards and popular suggestions.
3. **Text mode:** deterministic state machine + keyword intent matcher for free text.
4. **Voice mode:** same graph. With `XAI_API_KEY`, the Vite middleware mints an ephemeral token
   (`POST https://api.x.ai/v1/realtime/client_secrets`) and the browser opens
   `wss://api.x.ai/v1/realtime` with the `xai-client-secret.<token>` subprotocol. The session
   instructions are generated from the flow graph and Grok drives the UI through a `go_to_step`
   tool, so the voice bot follows the same train of thinking the chat shows on screen.
   Without a key, a demo voice uses the browser's speech APIs over the same engine.
5. **UI:** floating launcher, polished panel (chat/voice segmented toggle, flow breadcrumb, typing
   indicator, rich cards, chips), full-bleed voice view with an animated AGL-rays visualiser.

## Tests (minimum)

Flow graph integrity, intent matching, conversation reducer, voice-prompt builder, Grok realtime
client (mock WebSocket: session.update, tool call round-trip, transcripts), voice session API
route, format/auth utils, header nav, assistant UI interactions.

## Verification

Lint, typecheck/build and Vitest pass; computer-use walkthrough recorded: landing → assistant
topic flow (internet troubleshooting) → free-text query → voice mode → log in → My Account.
