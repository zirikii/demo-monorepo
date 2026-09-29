# AGL demo — cloud notes

- Dev: `pnpm dev:agl` (port **5185**). Tests: `pnpm --filter agl-website-demo test` (Vitest, no Playwright).
- Mock login accepts any credentials; the form is pre-filled for Alex Nguyen. Session lives in `localStorage` (`agl-demo-session`).
- The assistant flow graph in `src/features/assistant/flows/` is the single source of truth for chat **and** Grok voice. Add or change steps there; `flows.test.ts` fails on dangling links, unreachable steps or unknown `{placeholders}`.
- Grok voice needs server-only `XAI_API_KEY` in `apps/agl/.env.local` (never `VITE_`) — the repo-root `.env.local` is not read. Without it, `/api/voice/session` returns 503 and the UI uses the browser-speech demo voice.
- The same key powers chat: `/api/chat` proxies the xAI Responses API (`XAI_CHAT_MODEL`, default `grok-4.7` at `XAI_CHAT_REASONING=low`) with the voice agent's `go_to_step` / `submit_form` tools. Without the key, or if a call fails, chat falls back to the scripted intent matcher.
- Voice and chat share one system prompt builder (`engine/voicePrompt.ts`, xAI's recommended section order). Change AGL facts, guardrails or flow rules there so both channels stay aligned.
- Brand assets are derived from `brand-source/agl-logo-source.png` with `pnpm --filter agl-website-demo brand`. Don't hand-edit `public/brand/`.
- Brand colours are the logo's ray gradient (`#0046bd` → `#00e1ee` → `#42e8f1`) with `#0a2bb5` for AA-safe interactive blue. Don't borrow another app's palette.
- Unofficial demo — not affiliated with AGL Energy Limited.
