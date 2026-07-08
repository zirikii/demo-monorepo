# AGENTS.md

## Cursor Cloud specific instructions

This is a pnpm workspace (`pnpm-workspace.yaml`) with four independent demo apps under
`apps/*` plus a shared `@demo/ui` package under `packages/*`. Node 20+ and pnpm 10+ are
required. `pnpm install` at the repo root installs every workspace project. Standard
per-app scripts and features are documented in the root `README.md` and each app's
`README.md`; only the non-obvious cloud caveats are captured here.

### Apps, dev commands, and ports

| App | Root dev script | Default port | Notes |
| --- | --- | --- | --- |
| kddi (Vite + React 19) | `pnpm dev:kddi` | 5173 | NOC dashboard; no env needed |
| naukri (Next.js 14) | `pnpm dev:naukri` | 3000 | Job portal |
| seek (Next.js 15) | `pnpm dev:seek` | 3000 | Marketplace |
| nab (static site) | `pnpm dev:nab` | 8080 | Builds then serves generated HTML |

- **Port collision:** naukri and seek both default to port 3000. To run them at the same
  time, start one on another port with the `PORT` env var, e.g.
  `PORT=3001 pnpm --filter seek-marketplace-demo dev`. Do **not** try
  `pnpm dev:seek -- -p 3001` / `pnpm dev:naukri -- -p 3001` — the extra args get
  mis-parsed by `next dev` as a project directory and the server fails to start.
- **nab** is a generated static site (not a live app server): `pnpm dev:nab` runs the
  static build (`scripts/build.js`) and then serves the repo folder on 8080 via
  `scripts/serve.js`. Override the port with `PORT`. See `apps/nab/AGENTS.md` for its
  Adobe Client Data Layer behavior.

### Env files (Next apps)

`apps/naukri` and `apps/seek` read `DEMO_AUTH_SECRET` but fall back to `"change-me"`, so
`.env.local` is **optional** for dev — the apps boot without it. Copy
`.env.example` → `.env.local` if you want to override defaults. Auth is mock: the login
forms accept **any** email/password (they come pre-filled with demo credentials).

### Lint / test / build

- Lint: `pnpm lint` (root) runs across kddi/naukri/seek + `@demo/ui` typecheck; nab has no
  linter.
- Tests: the real unit suites are Vitest in kddi, naukri, and seek (run `pnpm test` inside
  an app, or the root filters). **`pnpm test` at the root fails** because `apps/nab`'s
  `test` script is a Playwright *walkthrough recorder* (not a unit suite) that needs
  browser binaries — install with `pnpm exec playwright install chromium` if you need the
  nab walkthrough / seek `video` recorder. Treat nab's `test` as optional, per
  `apps/nab/AGENTS.md`.
- Build: `pnpm build` builds all four apps.

### Git remotes & pushing (GitHub + Bitbucket)

This repo is mirrored on **both GitHub and Bitbucket**, and a given session's `origin`
may point at either one. The Cursor cloud environment injects credentials into the
*global* git config using GitHub's username convention
(`https://x-access-token:<token>@bitbucket.org/` via `insteadOf`). **Bitbucket rejects the
`x-access-token` username** — it needs `x-token-auth` with the *same* token value — so a
push to a Bitbucket `origin` can fail with `Authentication failed` even though the token is
valid. GitHub pushes are unaffected.

If a push fails against Bitbucket, use the helper instead of pushing directly:

```bash
scripts/git-push.sh -u origin <branch>   # pushes; on failure, fixes Bitbucket auth and retries
scripts/git-push.sh --fix-only           # only repair origin's auth (x-token-auth), no push
```

The helper borrows the already-injected token, swaps in the `x-token-auth` username on the
**local** `origin` URL only (never touches global config, prints no secrets, and is a no-op
for GitHub remotes). Tokens rotate per session, so just re-run it if a later push fails.
