# Optus NOC demo — cloud notes

- Dev: `pnpm dev:optus` (port **5178**)
- Optional env: copy `.env.example` → `.env.local` and set `CURSOR_API_KEY`
  (server-only; used by Vite middleware under `/api/cursor/*`)
- `pnpm test` is Vitest (safe at root). `pnpm shots` needs Playwright Chromium
- Unofficial demo — not affiliated with Optus
- Live agent dispatch writes to `data/remediation-log.md` by design
