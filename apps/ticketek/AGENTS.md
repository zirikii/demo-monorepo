# Ticketek demo — cloud notes

- Dev: `pnpm dev:ticketek` (port **5197**). Tests: `pnpm --filter ticketek test` (Vitest, no Playwright).
- Mock login accepts any credentials; the form is pre-filled for Jordan Mitchell. Session, fan data, Studio config and conversation log all live in `localStorage` (`ticketek-*` keys). `/admin/fan` → **Reset all demo data** restores the seed.
- The flow graph in `src/features/assistant/flows/` is the single source of truth for chat **and** voice. `flows.test.ts` fails on dangling links, unreachable steps, unknown `{placeholders}` or links the router doesn't serve (`src/test/routes.ts`).
- Steps that show an order card or use `{order…}` placeholders are redirected to their topic's picker until an order is chosen (`resolveStepId` in `engine/conversation.ts`). Pass `orderId` to `open()` to skip the picker from a page that already knows the order.
- Grok reuses AGL's proxy: `server/assistantPlugin.ts` imports `apps/agl/server/chatSession.ts` / `voiceSession.ts` and reads `XAI_API_KEY` from `apps/agl/.env.local` (Ticketek's own `.env.local` wins). Never prefix the key with `VITE_`. Without it, chat uses the scripted intent matcher and voice uses browser speech.
- Voice and chat share one prompt builder (`engine/voicePrompt.ts`). Change Ticketek facts, guardrails or personalisation there.
- Routing rule semantics live in `src/features/studio/routing.ts` and are shared by the live assistant, the handoff card trace and `/admin/simulator`. Change them there, not in the UI. Live chat hours are evaluated in `Australia/Sydney` time.
- The attended-events store (`/account/history`) feeds fan tier, recommendations, the welcome view and the Grok prompt (`src/features/fan/recommendations.ts`).
- Brand assets come from Ticketek's public logo pack and image CDN via `pnpm --filter ticketek brand`. Don't hand-edit `public/brand/`.
- Unofficial demo — not affiliated with Ticketek Pty Ltd or TEG.
