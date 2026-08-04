# CommBank demo — cloud notes

- Dev: `pnpm dev:commbank` (port **5179**)
- Package: `commbank-netbank-demo`; Vite + React 19 + TypeScript + Tailwind CSS v4
- No env or network access is required. Auth and all mutable state use `localStorage` only.
- Demo login: client number `12345678`, password `demo`; any non-empty values work.
- Use `src/index.css` for app-owned CommBank tokens and `src/lib/cn.ts` for the shared `@demo/ui`
  class merger. Do not import another app's palette.
- The official source URL and local fallback status are recorded in
  `public/brand/brand-assets.json`; rendered assets must remain self-hosted.
- Run this app's Vitest suite, typecheck, lint and build before completion.
- Unofficial demo only — not affiliated with CommBank, not suitable for real banking, and all
  customers, balances and rates are fictional.
