# Move issue

Move issue changes a work item's status so it appears in another board column and survives a full reload via `updateIssueStatus` writing `localStorage.atlassian-demo-issues`.

This is the demo's target board proof. Drive the column drop. Do not drop the feature.

## Sub-features

- `move-drag` drags a card from one board column to another. `IssueCard` is a draggable link (`draggable`) to `/jira/issues/:key`. The column section accepts the drop and `Board.tsx` calls `updateIssueStatus`.
- `move-status-select` (shipped equivalent) changes Status on `/jira/issues/:key`. Do not report this as `move-drag`.
- `move-persist` stores the new `status` on the issue in `atlassian-demo-issues`.
- `move-reload` still shows the card in the destination column after a full reload.

## How to get to it (user POV)

- On `/jira`, drag a PORTAL card onto another column.
- Or open the card (or `/jira/issues/:key`), change Status, and return to Board. That path is `move-status-select`, not `move-drag`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. `atlassian-demo-issues` reset, then reload `/jira`.
- Canonical subject: PORTAL-170 starts in **To do** (`Campaign ad refresh landing page`).

### move-drag

- **Drag.** On `/jira`, drag the PORTAL-170 card from To do onto the In progress column.
- **Expected.** The card is `<a href="/jira/issues/PORTAL-170" draggable="true">`. The column is a drop target. `Board.tsx` calls `updateIssueStatus` with that key. Trello list moves are not this proof.
- **Storage after action.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status === 'In progress'`.
- **Board.** PORTAL-170 is under In progress, not To do. Screenshot `artifacts/<run-id>/move-after-drag.png`.
- **Reload.** Full reload `/jira`. Same column. Status still `In progress`.

### move-status-select (shipped; not a board-drag proof)

- **Open.** Activate the PORTAL-170 card or go to `/jira/issues/PORTAL-170`.
- **Before.** Status reads `To do`. Screenshot `artifacts/<run-id>/move-before-detail.png`.
- **Change.** On select `Status` (`#issue-status`), choose `In progress`.
- **Storage after action.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status === 'In progress'`. Save JSON to `artifacts/<run-id>/issues-after-move.json`.
- **Board.** Go to `/jira`. PORTAL-170 is under In progress, not To do. Screenshot `artifacts/<run-id>/move-after-board.png`.
- **Reload.** Full reload `/jira`. Same column. Re-read `atlassian-demo-issues`; status still `In progress`. Save `artifacts/<run-id>/issues-after-reload.json`.

## Gotchas

- Passing `move-status-select` does not verify board drag. `move-drag` requires an HTML5 drop on a column and the same storage + reload checks.
- `updateIssueStatus` matches `issue.key` exactly (`PORTAL-170`), not case-insensitive. Drive with the seeded keys.
- The board loads storage when it mounts. A status change on the issue page shows up after navigating back. A column drop updates the board immediately.
- Do not `localStorage.setItem` the new status as the user action. That skips the UI under test.
