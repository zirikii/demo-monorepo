# AGL website + AGL Assistant (unofficial demo)

A look-alike of [agl.com.au](https://www.agl.com.au/) with a redesigned **AGL Assistant** that works by chat or by voice. The voice mode is built for **Grok Voice** (xAI realtime API) and falls back to a browser-speech demo voice until an API key is added.

> **Unofficial demo.** Not affiliated with, endorsed by, or connected to AGL Energy Limited. The AGL name and logo belong to their owner and are used here only to illustrate a demo. All prices, accounts and customer data are made up.

## Run

```bash
pnpm install          # from the repo root
pnpm dev:agl          # http://localhost:5185
```

Log in at `/login` with **any** email and password. The form is pre-filled with `alex.nguyen@example.com` / `demo1234` and signs you in as Alex Nguyen (customer 7004 218 663, 12 Banksia St, Newtown NSW). The session is a base64 blob in `localStorage` (`agl-demo-session`).

## What's in it

- **Marketing site:** home (bill-credit hero with plan finder, product tiles, bundle offers, app promo, help teaser), energy plans with a state and household estimator, nbn®, mobile, solar and batteries, EVs, moving house, business, about, contact.
- **Help & Support:** search, six categories and their articles, mirroring AGL's help taxonomy. Articles with an equivalent assistant flow have an **Ask AGL Assistant** / **Talk instead** card that opens the chat on that step.
- **My Account (mock):** overview with amount due, bills table with a service filter, usage charts, services and profile. Actions such as **Pay now** or **Update** open the assistant on the matching flow.
- **AGL Assistant:** the floating **Chat with us** launcher, or the **Talk** button beside it.

## AGL Assistant

The assistant is driven by one flow graph in `src/features/assistant/flows/`, based on AGL's help topics:

| Topic | Entry step | Covers |
| --- | --- | --- |
| Billing & payments | `billing` | Pay (card, BPAY, other), high bill explanation, understanding charges, direct debit, refunds |
| Internet & mobile | `netmob` | nbn® down (restart, line test, hotspot), slow speeds, outages, upgrades, no signal, mobile data, roaming, usage |
| Moving house | `moving` | Move energy (form), move nbn®, disconnect, fees |
| Meters & readings | `meters` | Submit a gas read (form), estimated reads, smart meters, meter access |
| My account & plan | `account` | Mailing address (form), concessions (form), plan review, login help |
| Payment support | `support` | Extensions, instalment plans, rebates, Staying Connected hardship |
| Outages & emergencies | `emergency` | Power outages, gas leaks, life support, hot water |
| Solar & batteries | `solar` | Feed-in tariffs, inverter faults, batteries/VPP, quotes |

The conversation opens with **"What's your query today?"** plus the topic grid and popular questions. Customers can tap chips, fill inline forms, or type in their own words. Free text is matched to a step by `engine/intent.ts`. Safety phrases (gas, sparks, fire) always go to the emergency flow first.

### Voice mode

**Voice** in the header toggle, or the **Talk** button, opens a full-panel voice view with animated AGL rays, live captions, the current step's card and "You can say" suggestions. There are also mute, type-instead and end-call controls.

- **Grok voice (live):** the browser asks `POST /api/voice/session` for a short-lived client secret. It then connects to `wss://api.x.ai/v1/realtime`, streaming 24 kHz PCM both ways.
  - Grok receives instructions built from the same flow graph (`engine/voicePrompt.ts`), plus two tools. `go_to_step` moves the on-screen flow before Grok speaks about a step. `submit_form` submits a form Grok filled in by voice.
  - Chip taps and typed text are forwarded to Grok as notes, so voice and screen stay in step.
  - Switching to voice mid-chat resumes from the current step.
- **Demo voice (no key):** the same engine speaks each step with `speechSynthesis` and listens with `SpeechRecognition` where the browser supports it. Where it doesn't, the suggestions and text input still drive the flow.

### Enabling Grok voice

```bash
cp apps/agl/.env.example apps/agl/.env.local
# set XAI_API_KEY=xai-...
pnpm dev:agl
```

| Variable | Default | Notes |
| --- | --- | --- |
| `XAI_API_KEY` | — | **Server-only.** Read by the Vite middleware; never prefix with `VITE_`. |
| `XAI_VOICE_MODEL` | `grok-voice-latest` | Realtime model |
| `XAI_VOICE` | `eve` | `eve`, `ara`, `rex`, `sal` or `leo` |
| `XAI_VOICE_TOKEN_TTL` | `300` | Ephemeral token lifetime in seconds (max 3600) |

`GET /api/voice/status` reports whether a key is configured. The header badge then reads "Grok voice · Live" or "Demo voice · Grok key pending". The middleware runs in `vite dev` and `vite preview` only; a static deploy needs an equivalent server route (`server/voiceSession.ts` is framework-agnostic).

## Structure

```
server/                  voiceSession.ts (xAI token route) + voicePlugin.ts (Vite middleware)
scripts/                 derive-brand-assets.mjs (logo → favicon, mark, white logo)
brand-source/            original AGL logo supplied for the demo
public/brand/            generated logo, mark, favicon + brand-assets.json
src/
  components/            brand/ ui/ layout/ marketing/ help/ account/
  data/                  account, plans, help articles, navigation
  features/assistant/
    flows/               the support flow graph (one file per topic)
    engine/              conversation reducer, intent matching, forms, Grok prompt + tools
    voice/               Grok realtime client, mic/player audio, PCM helpers, demo voice
    components/          panel, launcher, welcome, thread, voice view, cards/
  pages/                 marketing, help/, account/
  test/                  Vitest + Testing Library suites
```

## Scripts

```bash
pnpm --filter agl-website-demo test       # Vitest
pnpm --filter agl-website-demo lint
pnpm --filter agl-website-demo build
pnpm --filter agl-website-demo brand      # regenerate public/brand from brand-source/
```
