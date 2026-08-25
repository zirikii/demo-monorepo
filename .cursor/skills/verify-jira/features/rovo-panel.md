# Rovo panel

Rovo accepts a prompt and appends a mocked reply from `replyToRovo` (in-memory; no network).

## Sub-features

- `rovo-page` uses the full panel on `/jira/rovo`.
- `rovo-blocked` prompt matching `/blocked|risk|bug/i` mentions PORTAL-161.
- `rovo-empty` does not send a blank prompt.
- `rovo-board-aside` (**product gap**) — there is no compact Rovo chat aside on `/jira`. Header **Ask Rovo** and the FAB **Chat with Rovo** are links to `/jira/rovo`. Record this blocked; do not implement an aside as part of a verification run.

## How to get to it (user POV)

- Open `/jira/rovo` directly (no sidebar item for Rovo).
- On `/jira`, choose header **Ask Rovo** or the FAB **Chat with Rovo** — both leave the board for `/jira/rovo`.
- Sign in with the Rovo portal (`rovo@atlassian.com`) — lands on `/rovo` (standalone Studio). Prefer the Jira session + `/jira/rovo` for this map.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Jira demo session. Use `/jira/rovo` (not a board aside).

- **Open reliable entry.** Go to `/jira/rovo`. Heading/title Rovo. Textbox `Ask Rovo`, button `Ask`. An initial Rovo message mentions PORTAL Sprint 24.
- **Blocked prompt.** Fill `Ask Rovo` with `what's blocked?` and Ask. A new “you” line shows the prompt. A Rovo line contains `PORTAL-161` and the Safari/`BannerEnabled` risk.
- **Board aside.** Confirm `/jira` has no compact chat panel (no `Ask Rovo` textbox on the board). Header **Ask Rovo** and FAB **Chat with Rovo** must navigate to `/jira/rovo`. Report `rovo-board-aside` blocked.
- **Proof.** Screenshot `artifacts/<run-id>/rovo-blocked.png` with the prompt and PORTAL-161 reply visible.

## Gotchas

- Jira sidebar has Board, Backlog, Project settings only — not Rovo. Direct URL is a first-class entry.
- Chat does not persist. Reload clears messages. That is expected.
- Replies are regex over the prompt (`src/data/jira.ts` `ROVO_REPLIES`), then issue-key scan, then a generic fallback. Use `what's blocked?` or `PORTAL-142` for stable proof, not free-form chat.
- Do not look for `hidden xl:block` compact markup — that UI is not in `Board.tsx`. A wide viewport does not grow an aside.
