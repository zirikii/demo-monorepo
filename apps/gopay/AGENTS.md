# GoPay reKYC demo — cloud notes

- Dev: `pnpm dev:gopay` (port **5184**)
- No env required. `.env.example` documents optional `VITE_*` names.
- `pnpm test` here is Vitest. No Playwright in this app.
- Signed in as the seeded GoPay Plus user. There is no password gate.
- Persistence is `localStorage` (`gopay-rekyc-demo`). Identity rows are append-only.
- Unofficial demo — not affiliated with GoPay, Gojek, or GoTo.
- Brand green is `#00880d` from the reKYC Figma. Do not copy another app’s palette.
