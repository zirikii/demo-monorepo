# Optus NOC — Agentic Remediation Demo

Unofficial Optus Network Operations console that showcases where deterministic
automation ends and **Cursor Cloud Agents** take over.

> Not affiliated with Optus. Built for sales / field demos inside the demo-monorepo.

## Story

Current automation path:

**Network event → SNMP alert → backend filtering → RabbitMQ → automated remediation**

That path is excellent until the decision tree runs out. This UI simulates both:

1. **Deterministic** incidents that clear via runbooks
2. **Agentic** incidents that hit the automation limit, then hand off to a Cursor
   Cloud Agent for troubleshooting, reasoning, action selection, and remediation notes

## Quick start

```bash
# from repo root
pnpm install
cp apps/optus/.env.example apps/optus/.env.local
# put CURSOR_API_KEY in apps/optus/.env.local

pnpm dev:optus
# → http://localhost:5178
```

### Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `CURSOR_API_KEY` | for live dispatch | Server-only (no `VITE_` prefix). Proxied by Vite middleware. |
| `CURSOR_REPO_URL` | optional | Defaults to this monorepo |
| `CURSOR_STARTING_REF` | optional | Defaults to `main` |

Without a key, the pipeline simulation and **Simulate reasoning locally** path still work.
**Dispatch Cursor Cloud Agent** needs a valid key.

## Demo walkthrough

1. Select **Cell site backhaul degrade — MEL-RAN-214** (Needs agent)
2. Click **Run pipeline** and watch stages light up
3. When the feed says the deterministic limit was reached, open the agent cockpit
4. Either:
   - **Dispatch Cursor Cloud Agent** — live `POST /v1/agents` via `/api/cursor/*`
   - **Simulate reasoning locally** — UI-only stream for offline demos

Live agents append notes under `data/remediation-log.md`.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Vite dev server on **5178** (+ Cursor API proxy) |
| `pnpm test` | Vitest unit tests |
| `pnpm lint` / `pnpm typecheck` | ESLint / `tsc` |
| `pnpm build` | Production build |
| `pnpm shots` | Playwright CV screenshots into `shots/` |

## Stack

Vite · React 19 · TypeScript · Tailwind v4 · Vitest · Playwright · `@demo/ui`
