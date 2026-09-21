# GoPay reKYC demo — cloud notes

- Dev: `pnpm dev:gopay-rekyc` (port **5184**)
- No env required. The mock reKYC API is Vite middleware under `/api/*` and persists to `server/data/state.json` (gitignored, reseeded on boot).
- `pnpm test` here is Vitest. Safe to include in the root test filter.
- Unofficial demo — not affiliated with GoPay or GoTo.
- UI copy follows the reKYC Figma file. Where the PRD disagrees (two review CTAs, masked occupation / marital status / religion / gender), the Figma frame wins.
- Rupa Sans is substituted with Plus Jakarta Sans.
