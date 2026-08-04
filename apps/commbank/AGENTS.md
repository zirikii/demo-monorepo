# CommBank demo — cloud notes

- Dev: `pnpm dev:commbank` (port **5179**)
- No env required; `.env.example` documents optional `VITE_*` vars
- `pnpm test` here is Vitest (safe at root). `pnpm shots` / `pnpm video` need Playwright Chromium
- Demo log on: any client number and password are accepted (form pre-fills `12345678` / `demo`)
- All NetBank state (balances, transactions, card toggles, settings) lives in `localStorage`.
  Reset it from `/netbank/settings`
- `public/brand/` holds **vector reproductions** of the CommBank diamond and wordmark. The cloud
  environment does not allowlist `commbank.com.au`, so `scripts/fetch-brand-assets.sh` could not
  run. Re-run it from an allowlisted network to swap in the official SVG, then update
  `brand-assets.json`
- Unofficial demo — not affiliated with the Commonwealth Bank of Australia
