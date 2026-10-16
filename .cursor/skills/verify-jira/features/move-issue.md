# Move issue

Move issue changes a work item's status so it appears in another board column and survives a full reload via `updateIssueStatus` writing `localStorage.atlassian-demo-issues`.

This is the demo's target board proof. Drive the drop on the board. Do not relabel issue-detail Status as board drag.

## Sub-features

- `move-drag` (shipped) drags a card from one board column to another. The card link is `draggable`. The destination column uses `atl-blue` while it is the drop target. Drop calls `updateIssueStatus`.
- `move-status-select` (shipped equivalent) changes Status on `/jira/issues/:key`. Do not report this as `move-drag`.
- `move-persist` stores the new `status` on the issue in `atlassian-demo-issues`.
- `move-reload` still shows the card in the destination column after a full reload.

## How to get to it (user POV)

- **Board drag:** on `/jira`, drag a PORTAL card onto another column.
- **Issue detail:** open the card (or `/jira/issues/:key`), change Status, return to Board. This is `move-status-select`, not `move-drag`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. `atlassian-demo-issues` reset, then reload `/jira`.
- Canonical subject: PORTAL-170 starts in **To do** (`Campaign ad refresh landing page`).

### move-drag

- **Before.** On `/jira`, PORTAL-170 is under **To do**. The card link is `draggable="true"`. Screenshot `artifacts/<run-id>/move-drag-before.png`.
- **Drag.** Drag that card onto the **In progress** column. While the column is the drop target its section class includes `atl-blue`, and the card class includes `opacity-`. Screenshot `artifacts/<run-id>/move-drag-over.png`.
- **Drop.** PORTAL-170 is under In progress, not To do, and the URL is still `/jira`. Screenshot `artifacts/<run-id>/move-drag-after.png`.
- **Storage.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status === 'In progress'`. Save `artifacts/<run-id>/issues-after-drag.json`.
- **Reload.** Full reload `/jira`. Same column. Save `artifacts/<run-id>/issues-after-drag-reload.json` and screenshot `move-drag-reload.png`.
- **Report.** `move-drag` passed only when drop, blue target, storage, and reload all hold. Do not use Trello or the issue-detail Status select as this proof.

### move-status-select (shipped; not a board-drag proof)

- **Open.** Activate the PORTAL-170 card or go to `/jira/issues/PORTAL-170`.
- **Before.** Status reads `To do`. Screenshot `artifacts/<run-id>/move-before-detail.png`.
- **Change.** On select `Status` (`#issue-status`), choose `In progress`.
- **Storage after action.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status === 'In progress'`. Save JSON to `artifacts/<run-id>/issues-after-move.json`.
- **Board.** Go to `/jira`. PORTAL-170 is under In progress, not To do. Screenshot `artifacts/<run-id>/move-after-board.png`.
- **Reload.** Full reload `/jira`. Same column. Re-read `atlassian-demo-issues`; status still `In progress`. Save `artifacts/<run-id>/issues-after-reload.json`.

## Gotchas

- Passing `move-status-select` does not verify board drag. Require an HTML5 drop on a column that does not leave `/jira`, plus the storage and reload checks.
- `updateIssueStatus` matches `issue.key` exactly (`PORTAL-170`), not case-insensitive. Drive with the seeded keys.
- Board reads storage on render. After a status change, navigate or reload so the board remounts.
- Do not `localStorage.setItem` the new status as the user action. That skips the UI under test.
