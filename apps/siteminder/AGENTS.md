# SiteMinder demo — cloud notes

- Dev: `pnpm dev:siteminder` (port **5198**). Tests: `pnpm --filter siteminder-website-demo test` (Vitest, no Playwright).
- `/login` looks up `?product=` case-insensitively (`siteminder`, `littlehotelier`). Unknown values, including prototype names like `toString`, fall back to SiteMinder. `app.test.tsx` covers that render.
- Mock login accepts any credentials; the form is pre-filled for Sophie Tran at The Harbour Lane Hotel. Session, property data, Studio config and the conversation log all live in `localStorage` (`siteminder-*` keys). `/admin/property` → **Reset all demo data** restores the seed.
- Seed data is dated relative to today (`src/lib/clock.ts`), so there's always an overbooking tonight and the Bledisloe Cup 5 days out. Tests depend on that.
- The flow graph in `src/features/assistant/flows/` is the single source of truth for chat **and** voice. `flows.test.ts` fails on dangling links, unreachable steps, unknown `{placeholders}` or links the router doesn't serve (`src/test/routes.ts`).
- Steps that read a record are redirected to that record's picker until one is chosen (`resolveStepId` in `engine/conversation.ts`). Pass `recordId` to `open()` to skip the picker from a page that already knows the record.
- Step `effect`s change the property through `applyEffect` in `src/features/property/effects.ts` (pure; shared by the assistant, Studio and tests).
- Grok reuses AGL's proxy: `server/assistantPlugin.ts` imports `apps/agl/server/chatSession.ts` / `voiceSession.ts` and reads `XAI_API_KEY` from `apps/agl/.env.local` (SiteMinder's own `.env.local` wins). Never prefix the key with `VITE_`. Without it, chat uses the scripted intent matcher and voice uses browser speech.
- Voice and chat share one prompt builder (`engine/voicePrompt.ts`). Change SiteMinder facts, guardrails or personalisation there.
- Routing rule semantics live in `src/features/studio/routing.ts` and are shared by the live assistant, the handoff card trace and `/admin/simulator`. Change them there, not in the UI. Live chat hours are evaluated in `Australia/Sydney` time.
- The events store feeds forecasts, comparables, insights, the welcome view and the Grok prompt (`src/features/property/insights.ts`).
- Brand assets come from SiteMinder's public YouTube channel via `pnpm --filter siteminder-website-demo brand` (siteminder.com isn't reachable from the sandbox). Don't hand-edit `public/brand/`.
- Unofficial demo — not affiliated with SiteMinder.
