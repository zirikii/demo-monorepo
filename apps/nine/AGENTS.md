# nine.com.au demo — cloud notes

- Dev: `pnpm dev:nine` (port **5177**)
- No env required; `.env.example` documents optional `VITE_*` vars
- `pnpm test` is Vitest (safe). `pnpm shots` / `pnpm video` need Playwright Chromium
- **Intentional Sport timestamp/sort bug is fixed** — `/sport` uses `getByPillar("sport")` + ISO `publishedAt`
- Unofficial demo — not affiliated with Nine Entertainment
