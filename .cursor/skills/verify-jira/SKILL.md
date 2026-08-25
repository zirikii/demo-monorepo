---
name: verify-jira
description: Drive the Atlassian demo's mock Jira workspace (apps/atlassian, port 5183) in a real browser — login, board, move issue, issue detail, Rovo. Use when proving Jira-workspace behavior, not the marketing site.
---

# Verify Jira (Atlassian demo)

Project-local skill for the mock Jira workspace in `apps/atlassian`. Marketing routes (`/`, `/software`, …) are out of scope. There is no backend: browser + `localStorage` only.

Do not create or follow a `verify-atlassian` skill. This one is Jira-workspace scoped.

Board drag (`move-drag`) is the demo's target proof even if the board cannot drop cards yet. Keep that feature file. Until drag lands, a verification run proves Login → Board and reports `move-drag` as blocked. Do not relabel issue-detail Status as board drag.

## Launch

From the monorepo root, with `DEMO_BASE` unset:

```bash
pnpm dev:atlassian
```

Package script is `pnpm --filter atlassian dev`.

Ready when:

- the Vite log shows `Local: http://localhost:5183/`
- `GET http://localhost:5183/` returns 200 and the HTML title contains `Atlassian (Demo)`

Record the **PID** of the process this run started.

If 5183 is already taken by a session this run did not start, do **not** drive it and do **not** let Vite hop to another port. Launch an isolated server instead:

```bash
pnpm --filter atlassian exec vite --port 53183 --strictPort --host
export VERIFY_JIRA_URL=http://localhost:53183
```

Ready when that log shows `Local: http://localhost:53183/`. Record that PID. Doctor and drive must use `VERIFY_JIRA_URL`.

Vite is not `strictPort` in `apps/atlassian/vite.config.ts`. A collision on `pnpm dev:atlassian` can bind a different port — abort if the log shows any port other than the one you requested.

Teardown is Cleanup below. Proof artifacts are not teardown.

## Doctor

Run before every drive, and whenever anything looks off. Read-only.

```bash
bash .cursor/skills/verify-jira/scripts/doctor.sh
```

Override the origin with `VERIFY_JIRA_URL` when you launched on an isolated port.

Must pass:

1. **Port.** Something is listening on the origin's TCP port (5183 by default, or the port in `VERIFY_JIRA_URL`). The listener is this run's Vite (or you are explicitly on the deployed URL). If the Vite log printed a different port than you requested, fail.
2. **App identity.** `GET $ORIGIN/` body contains `Atlassian (Demo)` and does not look like another customer demo.
3. **Workspace, not marketing.** After auth, the URL path is `/jira` (local) or `/atlassian/jira` (deployed). Visible chrome: nav `aria-label="Jira"`, project **Customer portal** / key **PORTAL**, document title like `Board · PORTAL Sprint 24 | Atlassian (Demo)`.
4. **Auth.** Either `localStorage.atlassian-demo-session` decodes to a user with `email` (seeded demo is `demo@atlassian.com`, name Maya Chen), or the login form at `/login?portal=jira` still works with `demo@atlassian.com` / `teamwork2026`. This app rejects unknown emails and wrong passwords — it is not the “any password” mock used in some other demos.

If doctor fails, stop. Do not drive a shared tab, hub, or another app on a hopped port.

## Drive

Harness: **isolated Chromium** (the helper below, Cursor computer-use on a window this run opened, or Playwright `chromium.launchPersistentContext` with a throwaway `userDataDir`). Never attach to the presenter's Chrome profile — `localhost:5183` shares `localStorage` with every tab on that origin.

`apps/atlassian` has no Playwright suite. Do not add one as part of a verification run.

Prefer roles, labels, and routes. Do not use coordinates or tab-order hacks.

| Handle | Where |
|---|---|
| heading `Log in to Jira` | `/login` (default portal) |
| textbox `Email`, textbox `Password` | login form, pre-filled |
| button `Continue` | submit login |
| alert (failed credentials) | wrong email/password |
| heading `PORTAL Sprint 24` | board |
| textbox `Search work items` | board filter |
| headings `To do`, `In progress`, `In review`, `Done` | board columns (`BOARD_COLUMNS`) |
| link whose name contains `PORTAL-NNN` | board card → `/jira/issues/:key` |
| combobox/select `Status` (`#issue-status`) | issue detail |
| textbox `Ask Rovo`, button `Ask` | Rovo panel |
| button `Create in To do` (and other columns) | opens create dialog |
| button `Create work item` | submits create dialog |
| textbox `Add a comment`, button `Comment` | issue detail |
| button `Switch apps` | app switcher to Confluence, Trello, … |

Seeded Jira login: `demo@atlassian.com` / `teamwork2026` → `/jira`. Admin (`admin@atlassian.com`) lands on `/admin`. Rovo (`rovo@atlassian.com`) lands on `/rovo`. Do not use those accounts to prove the board.

Board cards are **not** draggable between columns. That is an intentional demo limitation. Keep `features/move-issue.md`. Report `move-drag` blocked. Do not treat Trello list moves or issue-detail Status as that proof.

Read `features/` before driving. A proof that uses one convenient entry point is incomplete when the map lists others. Report a blocked path as blocked; do not relabel a different path as that proof.

The default proof is **Login → Board → Create issue → issue detail / status move → `/jira/rovo`**. Still record `move-drag` blocked (intentional) and `rovo-board-aside` blocked (product gap: no compact board panel). Sibling skills cover the other product apps (`verify-confluence`, `verify-jsm`, `verify-jpd`, `verify-bitbucket`, `verify-trello`, `verify-loom`, `verify-rovo`, `verify-admin`).

## Evidence

Write under `.cursor/skills/verify-jira/artifacts/<run-id>/`. Cleanup must not delete this directory. Git ignores the files; they still belong on disk after teardown.

Standards:

- Exercise the real UI (login form, board, issue page, Rovo form). Do not call `writeSession` / `updateIssueStatus` from the console as the “user action.” Reading `localStorage` afterward is the side-effect check, not the drive.
- Capture the action and the resulting state (before and after screenshots for column moves).
- After a status change, read `localStorage.atlassian-demo-issues`, then full reload, then read it again and confirm the board column.
- Rovo chat is in-memory; do not expect it to survive reload.
- Mocks are the product: `replyToRovo` is local regex matching. That is the real reply path.

## Cleanup

- Stop only the Vite process **this run started** (the recorded PID, or the listener on the isolated port if doctor proved it is ours). Do not `pkill vite`. Do not kill a `pnpm dev:atlassian` on 5183 that you did not start.
- Close only the Chromium/userDataDir this run started.
- Leave `.cursor/skills/verify-jira/artifacts/` in place.
- Do not `localStorage.clear()` unless a feature file says to reset to seed (`removeItem('atlassian-demo-issues')` only).

## Helpers

- `bash .cursor/skills/verify-jira/scripts/doctor.sh` — port + HTML identity. Auth still needs the browser (session lives in `localStorage`).
- `node .cursor/skills/verify-jira/scripts/drive.mjs` — isolated Chromium: login → board → create → status move → issue detail → `/jira/rovo`. Honors `VERIFY_JIRA_URL` and `VERIFY_JIRA_ARTIFACTS`.
- `node .cursor/skills/verify-jira/scripts/drive-login-board.mjs` — isolated Chromium: Jira login → board columns screenshot + session dump. Uses Playwright from `apps/nab` or `apps/changi`. If Chromium is missing: `pnpm --filter nab exec playwright install chromium`.
