# SiteMinder website + SiteMinder Support (unofficial demo)

A look-alike of [siteminder.com](https://www.siteminder.com/), a mock of the SiteMinder platform a hotelier logs into, and a redesigned **SiteMinder Support** assistant. Support knows the property's channels, bookings, invoices and the demand events it has traded through. It works by chat or voice, and it routes to a person using rules you can edit in a Support Studio.

> **Unofficial demo.** Not affiliated with, endorsed by, or connected to SiteMinder Limited. The SiteMinder name and logo belong to their owner and are used here only to illustrate a demo. The Harbour Lane Hotel, its bookings, rates, invoices and every event outcome are made up. The past events are real Sydney events, but the occupancy and rate figures against them are invented.

## Run

```bash
pnpm install              # from the repo root
pnpm dev:siteminder       # http://localhost:5198
```

Log in at `/login` with **any** email and password. The form is pre-filled with `sophie.tran@harbourlane.com.au` / `demo-password`, which logs you in as Sophie Tran, Revenue & Distribution Manager at The Harbour Lane Hotel in Sydney (86 rooms, SiteMinder Plus).

All state lives in `localStorage`:

| Key | Holds |
| --- | --- |
| `siteminder-demo-session` | The mock session |
| `siteminder-property-v1` | The property, channels, bookings, invoices, team and events store |
| `siteminder-studio-config-v1` | Support Studio settings and routing rules |
| `siteminder-support-log-v1` | The conversation log |

To restore the seed, use **Support Studio → Property & events → Reset all demo data**.

## What's in it

- **Marketing site:**
  - Home ("We put you in demand"), the platform overview and ten product pages.
  - Pricing, solutions by property type, customers, resources with articles, integrations, about and contact.
  - Demo and free-trial forms.
- **Platform (`/app`, mock):**
  - Dashboard with a "Needs your attention" list, the next demand event and channel performance.
  - Channels with live status.
  - Reservations with filters and search.
  - A 14-day rate grid with event uplifts and click-to-stop-sell.
  - **Demand events**, the events store: upcoming events with forecasts and comparables, past events with outcomes, and lessons drawn from your history.
  - Billing, team and help.
  - Every issue has an **Ask Support** button that opens the assistant on that exact record.
- **SiteMinder Support:**
  - Open it from the floating **Support** launcher or the voice button beside it.
  - The expanded panel adds a "What Support can see" context rail: property, live issues, next event, the lesson from past events, and why a handoff went to its team.
- **Support Studio (`/admin`):** overview, the conversation log with transcripts and routing traces, routing rules and queues, a routing simulator, assistant settings, and the property profile and events store that personalisation reads.

## SiteMinder Support

The flow graph in `src/features/assistant/flows/` drives both chat and voice. Each AGL topic has a SiteMinder counterpart:

| AGL topic | SiteMinder topic | Entry step | Covers |
| --- | --- | --- | --- |
| Internet & mobile | Channels & connectivity | `channels` | Channel picker routed by live status: mapping error (fix for me, or show me how), expired credentials (form), paused, healthy (live sync test). Also platform status, adding a channel, and rooms selling when closed |
| — | Reservations | `reservations` | Booking picker routed by status: missing in the PMS (resend), modified, cancelled and fees, card declined (retry or payment link), overbooked |
| Meters | Rates & availability | `rates` | Bulk rate update (form), rates not updating, restrictions, rate parity |
| — | Events & demand | `events` | Upcoming-event playbook from comparable past events, apply event pricing (form), channel readiness, past-event review, insights from history, add an event (form) |
| Billing & payments | Billing & subscription | `billing` | Pay an invoice (saved card, bank transfer or other), invoice higher than expected (bookings, add-on or unchanged), understanding the invoice, direct debit, credit refund |
| Payment support | Payment support | `arrangements` | 14-day extension, three-month instalments, seasonal pause, financial hardship |
| Account | Account & users | `account` | Invite a user (form), billing details (form), compare or switch plan, login and MFA reset, support code |
| Moving | Property changes | `property` | Add a property (form), switch PMS (form), close a property |
| Emergency | Urgent issues | `urgent` | Overbooking with a guest at the desk, all channels down, phishing and account security, card fraud and chargebacks |
| Solar | Grow revenue | `grow` | Demand Plus, Dynamic Revenue Plus, Website Builder, guest upsells, growth callback (form) |

Steps that need a record (`{channel…}`, `{booking…}`, `{invoice…}`, `{event…}` or `{history…}`) go through a picker first. The picker shows the property's own records as tiles, and the next step depends on that record's status. Pass `recordId` to `open()` to skip the picker from a page that already knows the record. Steps that change the account (fixing a mapping, paying an invoice, applying event pricing, inviting a user and so on) update the property store through pure effects in `src/features/property/effects.ts`. That means the platform screens update as the conversation goes.

### Personalisation from the events store

The events store (`/app/events`) holds upcoming events and past events, each with an outcome: occupancy, ADR, uplift against a normal night, sell-out lead time and minimum stay. `src/features/property/insights.ts` uses it to:

- Pick comparable past events for each upcoming one, matching category first and then crowd size. These drive the suggested uplift and minimum stay, the pace label and the "Last time…" advice.
- Turn the history into lessons. For example: "Holiday events sell out about 64 days out…", and "At Taylor Swift | The Eras Tour rates went up too late…".
- Feed the welcome view and greeting. A typical greeting is "Bledisloe Cup is in 5 days and you're 71% booked, but Expedia, Airbnb and Trip.com aren't receiving rates". The launcher teaser, the context rail and the Grok prompt use the same data.

Adding, editing or removing an event in the platform or in Studio changes all of the above straight away.

### Rules and routing

Rules in `src/features/studio/` are evaluated in order, both live after each hotelier turn and at handoff:

- `handoff` rules interrupt the conversation.
- `route` rules only choose the queue and priority. At handoff, the first match picks the queue and the most urgent matched priority wins.

Rules can match on:

- keywords
- sentiment
- the assistant misunderstanding the hotelier
- repeat contact
- topic
- the event in the chat starting within N days
- the next event being within N days while a channel isn't selling ("event at risk")
- channel status
- booking status
- plan
- property size
- invoice overdue days

Edit, reorder or switch rules off in `/admin/routing`, then try scenarios in `/admin/simulator`. Every handoff card has a **Why this team?** trace.

### Voice and chat with Grok

The assistant reuses AGL's xAI proxy (`apps/agl/server/chatSession.ts` and `voiceSession.ts`):

- `server/assistantPlugin.ts` serves `/api/voice/*` and `/api/chat` from the Vite server. It reads `XAI_API_KEY` from `apps/agl/.env.local`; a key in `apps/siteminder/.env.local` takes precedence.
- **Without a key**, chat falls back to the scripted intent matcher and voice uses browser speech ("Browser voice · demo mode").

`XAI_API_KEY` is server-only. Never prefix it with `VITE_`.

## Scripts

```bash
pnpm --filter siteminder-website-demo test        # Vitest
pnpm --filter siteminder-website-demo lint
pnpm --filter siteminder-website-demo typecheck
pnpm --filter siteminder-website-demo build
pnpm --filter siteminder-website-demo brand       # re-fetch the logo and imagery (see scripts/fetch-brand-assets.sh)
```
