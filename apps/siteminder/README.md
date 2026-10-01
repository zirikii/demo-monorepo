# Ticketek website + Ticketek Support (unofficial demo)

A look-alike of [premier.ticketek.com.au](https://premier.ticketek.com.au/) with a redesigned **Ticketek Support** assistant. It knows the fan's orders and the events they've been to, works by chat or voice, and routes to a person using rules you can edit in a Support Studio.

> **Unofficial demo.** Not affiliated with, endorsed by, or connected to Ticketek Pty Ltd or TEG. The Ticketek name, logo and event artwork belong to their owners and are used here only to illustrate a demo. All events, prices, orders and fan data are made up.

## Run

```bash
pnpm install            # from the repo root
pnpm dev:ticketek       # http://localhost:5197
```

Sign in at `/login` with **any** email and password. The form is pre-filled with `jordan.mitchell@example.com` / `tickets2026`, which signs you in as Jordan Mitchell: a "Legend" tier fan with seven orders and eleven events on record, plus 20 earlier ones. The session is a base64 blob in `localStorage` (`ticketek-demo-session`). Fan data, Studio config and the conversation log are also stored in `localStorage` (`ticketek-fan-v1`, `ticketek-studio-config-v1`, `ticketek-support-log-v1`). **Support Studio → Fan profile → Reset all demo data** restores the seed.

## What's in it

- **Site:** home (hero carousel, a signed-in welcome strip and "New for you" picks, Featured Events, Discover categories, waitlist, Last Minute, and gift-voucher and support promos), What's On with category, genre, region and date filters, search, show pages with performances and pricing, a four-step purchase flow (tickets, seats and delivery, payment, confirmation) with a 10-minute hold, venues, Where's My Ticket, gift vouchers, agencies, groups, accessible ticketing, cart, and the Help Centre with categories, articles and a request form.
- **My Account (mock):** overview with alerts for cancelled or rescheduled events, orders with ticket detail, transfer, Marketplace resale and refunds, **Events I've Been To**, favourites, waitlist, details, notifications, payment methods, password and close account.
- **Ticketek Support:** the floating **Support** launcher, or the voice button beside it.
- **Support Studio (`/admin`):** overview, conversation log with transcripts and routing traces, routing rules and queues, a routing simulator, assistant settings and the fan profile used for personalisation.

## Ticketek Support

The flow graph in `src/features/assistant/flows/` drives both chat and voice. Its topics follow Ticketek's help taxonomy:

| Topic | Entry step | Covers |
| --- | --- | --- |
| Where's my ticket? | `tickets` | Mobile tickets, "no longer active", EzyTicket resend and printing, venue collection, souvenir tickets |
| Refunds & exchanges | `refunds` | Cancelled and rescheduled events, can't attend, refund status |
| Event changes | `changes` | Cancellations, new dates, line-up changes |
| Transfer tickets | `transfer` | Send to a friend (form) and transfer rules |
| Sell on Marketplace | `resale` | Fan to Fan resale, pricing caps, payouts |
| Event-day info | `eventday` | Gate times, getting there, bag rules |
| Accessible bookings | `accessible` | Wheelchair seating, Companion Card |
| Group bookings | `groups` | 10+ tickets, schools, corporate |
| Payments & vouchers | `payments` | Charges, fees, Afterpay, gift vouchers |
| Account & privacy | `account` | Sign-in, details, data, marketing |
| Find something to see | `discover.recs` | Picks based on the events the fan has been to |

Order-specific steps always go through an order picker that shows the fan's own orders as artwork tiles. The next step then depends on the order's delivery method and status. Deep links from an order page or the welcome card skip the picker.

### Personalisation

- The welcome view greets the fan by name and fan tier, shows their next event with quick actions, and flags any cancelled or rescheduled order.
- **Events I've Been To** (`/account/history`) is the fan's attended-events store. Adding or removing an event updates their tier, top genres and "Because you saw…" recommendations, the assistant's picks, and the Grok system prompt.
- The Grok prompt includes the fan's orders, history, accessibility needs and routing rules, so voice and chat answers match what's on screen.

### Routing

Rules in `src/features/studio/` are evaluated in order, both while the conversation is live and at handoff. At handoff the first match picks the queue and the most urgent matched priority wins. The default rules cover safety, fraud, complaints, frustration, misunderstanding, event within 48 hours, cancelled events, accessibility, priority fans, high-value orders and repeat contact. Edit, reorder or switch them off in `/admin/routing`, then try scenarios in `/admin/simulator`. Every handoff card has a **Why this team?** trace.

### Voice and chat with Grok

The assistant reuses AGL's xAI proxy (`apps/agl/server/chatSession.ts` and `voiceSession.ts`):

- `server/assistantPlugin.ts` serves `/api/voice/*` and `/api/chat` from the Vite server and reads `XAI_API_KEY` from `apps/agl/.env.local`. A key in `apps/ticketek/.env.local` takes precedence.
- **Without a key**, chat falls back to the scripted intent matcher and voice uses browser speech ("Browser voice (demo)").

Never prefix the key with `VITE_`.

## Scripts

```bash
pnpm --filter ticketek-website-demo test        # Vitest
pnpm --filter ticketek-website-demo lint
pnpm --filter ticketek-website-demo typecheck
pnpm --filter ticketek-website-demo build
pnpm --filter ticketek-website-demo brand       # re-fetch the official logo pack and event artwork
```
