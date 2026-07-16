# demo-monorepo

A pnpm workspace that bundles four independent demo apps together and gives them
a single shared UI package (`@demo/ui`) to pull from.

## What's inside

```
demo-monorepo/
├── apps/
│   ├── kddi/     # Vite + React 19 NOC dashboard (Tailwind v4, JS)
│   ├── nab/      # Static HTML/CSS landing site (template-built)
│   ├── naukri/   # Next.js 14 + React 18 job portal (Tailwind v3, TS)
│   ├── paytm/    # Vite + React 19 consumer payments site (Tailwind v4, TS)
│   ├── seek/     # Next.js 15 + React 19 jobs marketplace (Tailwind v3, TS)
│   ├── spark/    # Next.js 15 Spark NZ Travel & Move / MySpark demo
│   ├── squiz/    # Vite + React 19 marketing site (Tailwind v4, TS)
│   └── changi/   # Vite + React 19 Changi Airport site (Tailwind v4, TS)
└── packages/
    └── ui/       # @demo/ui — shared utilities, tokens, and components
```

Each app keeps its own framework, dependencies, tests, and README. pnpm
workspaces isolate their (conflicting) React and Tailwind versions while still
symlinking the shared package, so `@demo/ui` edits are picked up instantly with
no publish step.

Agent alignment skills (design tokens, per-app conventions, `mock-company-repo`)
live in the sibling [demo-monorepo-plugin](https://github.com/zirikii/demo-monorepo-plugin)
repository — add that repo when launching cloud agents against this monorepo.

## The shared package

Every app depends on `@demo/ui` (`workspace:*`) and pulls something from it:

| App | Pulls from `@demo/ui` |
| --- | --- |
| kddi | `cx` class joiner (`src/lib/cx.js` re-exports `@demo/ui/cx`) |
| naukri | `cn` class merger (`lib/utils/cn.ts` re-exports `@demo/ui/cn`) + `transpilePackages` |
| paytm | `cn` class merger (`src/lib/cn.ts` re-exports `@demo/ui/cn`) + `<DemoRibbon>` in header |
| seek | `cn` class merger (`lib/utils/cn.ts` re-exports `@demo/ui/cn`) + `transpilePackages` |
| spark | `cn` class merger (`lib/utils/cn.ts` re-exports `@demo/ui/cn`) + `<DemoRibbon>` + `transpilePackages` |
| squiz | `cn` class merger (`src/lib/cn.ts` re-exports `@demo/ui/cn`) + `<DemoRibbon>` in header |
| changi | `cn` class merger (`src/lib/cn.ts` re-exports `@demo/ui/cn`) + `<DemoRibbon>` in header |
| nab | `tokens.css` design tokens copied into `css/tokens.css` at build time |

See [`packages/ui/README.md`](packages/ui/README.md) for the full export list.

## Getting started

```bash
# from the repo root
pnpm install

# run one app
pnpm dev:kddi      # or dev:nab / dev:naukri / dev:paytm / dev:seek / dev:spark / dev:squiz / dev:changi

# build one app
pnpm build:seek    # or build:kddi / build:nab / build:naukri / build:paytm / build:spark / build:squiz / build:changi

# build every app
pnpm build
```

Node 20+ and pnpm 10+ are required (`packageManager` is pinned in the root
`package.json`).

## Cursor skills

Agent skills for this monorepo — including `mock-company-repo` and the
per-app convention skills — live in
[demo-monorepo-plugin](https://github.com/zirikii/demo-monorepo-plugin).
Install that plugin locally or attach the repo when launching a cloud agent.
