# Move issue

Move issue changes a work item's status so it appears in another board column and survives a full reload via `updateIssueStatus` writing `localStorage.atlassian-demo-issues`.

This is the demo's target board proof. Keep driving it even while drag is unfinished: report `move-drag` blocked, do not drop the feature.

## Sub-features

- `move-drag` (target) drags a card from one board column to another. **Blocked on purpose** — `IssueCard` is a non-draggable link (`draggable={false}`) to `/jira/issues/:key`. Do not implement board drop targets as part of a verification run.
- `move-status-select` (shipped equivalent) changes Status on `/jira/issues/:key`. Do not report this as `move-drag`.
- `move-persist` stores the new `status` on the issue in `atlassian-demo-issues`.
- `move-reload` still shows the card in the destination column after a full reload.

## How to get to it (user POV)

- **Intended (demo):** on `/jira`, drag a PORTAL card onto another column.
- **Shipped today:** open the card (or `/jira/issues/:key`), change Status, return to Board.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. `atlassian-demo-issues` reset, then reload `/jira`.
- Canonical subject: PORTAL-170 starts in **To do** (`Campaign ad refresh landing page`).

### move-drag (blocked — still the demo target)

- **Attempt drag.** On `/jira`, try to drag the PORTAL-170 card from To do onto In progress.
- **Expected until shipped.** Cards are `<a href="/jira/issues/PORTAL-170" draggable="false">`. There are no droppable column targets and `Board.tsx` does not call `updateIssueStatus` on drop. A pointer drag must not move the card. Trello (`/trello`) is the product that allows list moves — do not use it as a Jira proof.
- **Report.** `move-drag` blocked. Screenshot `artifacts/<run-id>/move-drag-blocked.png` of the static board. Do not pass this sub-feature. Do not delete this recipe.

### move-status-select (shipped; not a board-drag proof)

- **Open.** Activate the PORTAL-170 card or go to `/jira/issues/PORTAL-170`.
- **Before.** Status reads `To do`. Screenshot `artifacts/<run-id>/move-before-detail.png`.
- **Change.** On select `Status` (`#issue-status`), choose `In progress`.
- **Storage after action.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status === 'In progress'`. Save JSON to `artifacts/<run-id>/issues-after-move.json`.
- **Board.** Go to `/jira`. PORTAL-170 is under In progress, not To do. Screenshot `artifacts/<run-id>/move-after-board.png`.
- **Reload.** Full reload `/jira`. Same column. Re-read `atlassian-demo-issues`; status still `In progress`. Save `artifacts/<run-id>/issues-after-reload.json`.

## Gotchas

- Passing `move-status-select` does not verify board drag. When drag ships, require HTML5/pointer drop on a column (or an equivalent board control that does not leave `/jira`) and the same storage + reload checks.
- `updateIssueStatus` matches `issue.key` exactly (`PORTAL-170`), not case-insensitive. Drive with the seeded keys.
- Board reads storage on render. After a status change, navigate or reload so the board remounts.
- Do not `localStorage.setItem` the new status as the user action. That skips the UI under test.
