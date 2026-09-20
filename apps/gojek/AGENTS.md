# Gojek demo — cloud notes

- Dev: `pnpm dev:gojek` (port **5182**)
- No env required; `.env.example` documents optional `VITE_*` vars
- `pnpm test` here is Vitest (safe at root filter). No Playwright in this app.
- Six colour-coded product clusters; use the `verticalStyles` map in
  `src/data/categories.ts` (literal Tailwind classes) — never build cluster classes
  dynamically from hex.
- Auth is intentionally mock (any email/password); session lives in localStorage.
- Unofficial demo — not affiliated with Gojek / GoTo.
