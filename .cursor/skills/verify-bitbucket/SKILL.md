---
name: verify-bitbucket
description: Drive the Atlassian demo's mock Bitbucket workspace (apps/atlassian, port 5183) — login, repos, pull request approve/merge. Use when proving Bitbucket, not Jira.
---

# Verify Bitbucket (Atlassian demo)

Project-local skill for the mock **Bitbucket** workspace in `apps/atlassian`. Marketing routes and other product apps are out of scope. There is no backend: browser + `localStorage` only.

Do not create or follow a `verify-atlassian` skill. This one is Bitbucket-workspace scoped.

Jira board cards cannot move between columns — that is an intentional demo limitation owned by `verify-jira`. Do not “fix” it from this skill.

## Launch

From the monorepo root, with `DEMO_BASE` unset:

```bash
pnpm dev:atlassian
```

Ready when:

- the Vite log shows `Local: http://localhost:5183/`
- `GET http://localhost:5183/` returns 200 and the HTML title contains `Atlassian (Demo)`

Record the **PID** of the process this run started.

If 5183 is already taken by a session this run did not start, do **not** drive it and do **not** let Vite hop to another port. Launch an isolated server instead:

```bash
pnpm --filter atlassian exec vite --port 53183 --strictPort --host
export VERIFY_BITBUCKET_URL=http://localhost:53183
```

Ready when that log shows `Local: http://localhost:53183/`. Record that PID. Doctor and drive must use `VERIFY_BITBUCKET_URL`.

Vite is not `strictPort` in `apps/atlassian/vite.config.ts`. A collision on `pnpm dev:atlassian` can bind a different port — abort if the log shows any port other than the one you requested.

Teardown is Cleanup below. Proof artifacts are not teardown.

## Doctor

Run before every drive, and whenever anything looks off. Read-only.

```bash
bash .cursor/skills/verify-bitbucket/scripts/doctor.sh
```

Override the origin with `VERIFY_BITBUCKET_URL` when you launched on an isolated port.

Must pass:

1. **Port.** Something is listening on the origin's TCP port (5183 by default, or the port in `VERIFY_BITBUCKET_URL`). The listener is this run's Vite. If the Vite log printed a different port than you requested, fail.
2. **App identity.** `GET $ORIGIN/` body contains `Atlassian (Demo)` and does not look like another customer demo.
3. **Portal.** `GET $ORIGIN/login?portal=bitbucket` returns 200. The heading `Log in to Bitbucket` is client-rendered — prove it in the drive, not curl.
4. **Workspace, not marketing.** After auth, the URL path is `/bitbucket` (local) or `/atlassian/bitbucket` (deployed). Visible chrome: nav `aria-label="Bitbucket"`, heading `Repositories`.
5. **Auth.** Seeded credentials `demo@atlassian.com` / `teamwork2026`. This app rejects unknown emails and wrong passwords.

If doctor fails, stop. Do not drive a shared tab, hub, or another app on a hopped port.

## Drive

Harness: **isolated Chromium** (the helper below, Cursor computer-use on a window this run opened, or Playwright `chromium.launchPersistentContext` with a throwaway `userDataDir`). Never attach to the presenter's Chrome profile — `localhost:5183` shares `localStorage` with every tab on that origin.

`apps/atlassian` has no Playwright suite. Do not add one as part of a verification run.

Prefer roles, labels, and routes. Do not use coordinates or tab-order hacks.

| Handle | Where |
|---|---|
| heading `Log in to Bitbucket` | `/login?portal=bitbucket` |
| textbox `Email`, textbox `Password` | login form, pre-filled |
| button `Continue` | submit login |
| button `Switch apps` | product switcher |
| heading `Repositories` | `/bitbucket` |
| link `portal-web` | repo |
| link `#42` | PR detail |
| button `Approve`, button `Merge` | PR detail |

Seeded login: `demo@atlassian.com` / `teamwork2026` → `/bitbucket`.

Read `features/` before driving. A proof that uses one convenient entry point is incomplete when the map lists others. Report a blocked path as blocked; do not relabel a different path as that proof.

## Evidence

Write under `.cursor/skills/verify-bitbucket/artifacts/<run-id>/`. Cleanup must not delete this directory. Git ignores the files; they still belong on disk after teardown.

Standards:

- Exercise the real UI. Do not call storage writers from the console as the “user action.” Reading `localStorage` afterward is the side-effect check, not the drive.
- Capture the action and the resulting state.
- After a mutation, read `atlassian-demo-prs`, then full reload, then read it again.

## Cleanup

- Stop only the Vite process **this run started** (the recorded PID, or the listener on the isolated port if doctor proved it is ours). Do not `pkill vite`. Do not kill a `pnpm dev:atlassian` on 5183 that you did not start.
- Close only the Chromium/userDataDir this run started.
- Leave `.cursor/skills/verify-bitbucket/artifacts/` in place.
- Do not `localStorage.clear()` unless a feature file says to reset seed (`removeItem('atlassian-demo-prs')` only).

## Helpers

- `bash .cursor/skills/verify-bitbucket/scripts/doctor.sh` — port + HTML identity + Bitbucket login portal.
- `node .cursor/skills/verify-bitbucket/scripts/drive.mjs` — isolated Chromium default proof. Honors `VERIFY_BITBUCKET_URL` and `VERIFY_BITBUCKET_ARTIFACTS`. If Chromium is missing: `pnpm --filter nab exec playwright install chromium`.
