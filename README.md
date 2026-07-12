# demo-monorepo

A pnpm workspace that bundles independent demo apps together and gives them
a single shared UI package (`@demo/ui`) to pull from.

## What's inside

```
demo-monorepo/
├── apps/
│   ├── changi/   # Vite + React 19 Changi Airport public website demo
│   ├── kddi/     # Vite + React 19 NOC dashboard (Tailwind v4, JS)
│   ├── nab/      # Static HTML/CSS landing site (template-built)
│   ├── naukri/   # Next.js 14 + React 18 job portal (Tailwind v3, TS)
│   ├── paytm/    # Vite + React 19 consumer payments site (Tailwind v4, TS)
│   ├── seek/     # Next.js 15 + React 19 jobs marketplace (Tailwind v3, TS)
│   └── squiz/    # Vite + React 19 marketing website demo (Tailwind v4, TS)
├── packages/
│   └── ui/       # @demo/ui — shared utilities, tokens, and components
└── .cursor/
    └── skills/
        └── migrate-to-skills/   # Reusable Cursor skill (see below)
```

Each app keeps its own framework, dependencies, tests, and README. pnpm
workspaces isolate their (conflicting) React and Tailwind versions while still
symlinking the shared package, so `@demo/ui` edits are picked up instantly with
no publish step.

## The shared package

Every app depends on `@demo/ui` (`workspace:*`) and pulls something from it:

| App | Pulls from `@demo/ui` |
| --- | --- |
| changi | `cn` class merger (`src/lib/cn.ts` re-exports `@demo/ui/cn`) |
| kddi | `cx` class joiner (`src/lib/cx.js` re-exports `@demo/ui/cx`) |
| naukri | `cn` class merger (`lib/utils/cn.ts` re-exports `@demo/ui/cn`) + `transpilePackages` |
| paytm | `cn` class merger (`src/lib/cn.ts` re-exports `@demo/ui/cn`) + `<DemoRibbon>` in header |
| seek | `cn` class merger (`lib/utils/cn.ts` re-exports `@demo/ui/cn`) + `transpilePackages` |
| nab | `tokens.css` design tokens copied into `css/tokens.css` at build time |

See [`packages/ui/README.md`](packages/ui/README.md) for the full export list.

## Getting started

```bash
# from the repo root
pnpm install

# run one app
pnpm dev:changi    # or dev:kddi / dev:nab / dev:naukri / dev:paytm / dev:seek / dev:squiz

# build one app
pnpm build:changi  # or build:kddi / build:nab / build:naukri / build:paytm / build:seek / build:squiz

# build every app
pnpm build
```

Node 20+ and pnpm 10+ are required (`packageManager` is pinned in the root
`package.json`).

## Cursor skills

The `migrate-to-skills` Cursor skill lives at the repo root in
[`.cursor/skills/migrate-to-skills/SKILL.md`](.cursor/skills/migrate-to-skills/SKILL.md).
Because it sits at the parent level, any Cursor agent (including a freshly spun-up
cloud agent) working in this repo can invoke it — e.g. `/migrate-to-skills` — to
convert existing `.cursor/rules/*.mdc` and `.cursor/commands/*.md` into the Agent
Skills format.
