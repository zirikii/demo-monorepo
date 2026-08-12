# AGENTS.md — apps/employment-hero

Unofficial Vite + React 19 clone of employmenthero.com. Port **5180**, package name
`employment-hero-demo`, run with `pnpm dev:employment-hero`.

## Intentional bug — do not "fix" it by accident

`/login` crashes on render. This is deliberate and tracked as Jira **DR-20** (labels `bug`,
`employment-hero`, `low`), mirroring the CommBank log-on crash.

`src/pages/Login.tsx` keys `portalConfig` by `Employer` / `Employee` / `Payroll` but looks
it up with the lower-case `?portal=` value (default `employer`). An `as keyof typeof` cast
hides the mismatch from TypeScript, so lint, typecheck and tests all pass and only the
render throws.

`src/test/login-bug.test.tsx` documents the crash. If a task asks you to fix it, invert
those expectations rather than deleting the file.

Use **`/start-free`** to reach `/platform` — it is a separate, working entry point, and it
is how any walkthrough of the authenticated area should begin.

## Conventions

- Tailwind v4 with `@theme` tokens in `src/index.css`. Tokens are app-local; never share a
  config with a sibling app. Primary brand colour is Purple Heart `#7622D7`.
- Class joiner is `cn`, re-exported from `@demo/ui/cn` via `src/lib/cn.ts`.
- Routing is `BrowserRouter` declared inline in `src/App.tsx`. Adding a nav link without a
  matching route fails `src/test/data.test.ts`.
- No backend. State is `localStorage` under `employment-hero-demo-*` keys.
- Brand artwork in `public/brand/` is a hand-drawn recreation — `employmenthero.com` and
  every logo CDN are blocked by the cloud egress proxy. Do not hotlink external images.
