# Move issue

Move issue changes a work item's status so it appears in another board column and survives a full reload via `updateIssueStatus` writing `localStorage.atlassian-demo-issues`.

Board drag is the proof. Issue-detail Status is a separate control and is not `move-drag`.

## Sub-features

- `move-drag` drags a card from one board column to another. The card is a link (`draggable`) to `/jira/issues/:key`. Columns are drop targets (`data-column-status`). Chromium often skips `drop` on a link, so `dragEnd` resolves the column under the pointer.
- `move-status-select` changes Status on `/jira/issues/:key`. Do not report this as `move-drag`.
- `move-persist` stores the new `status` on the issue in `atlassian-demo-issues`.
- `move-reload` still shows the card in the destination column after a full reload.

## How to get to it (user POV)

- On `/jira`, drag a PORTAL card onto another column.
- Or open the card and change Status. That path is `move-status-select`, not `move-drag`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. `atlassian-demo-issues` reset, then reload `/jira`.
- Canonical subject: PORTAL-170 starts in **To do** (`Campaign ad refresh landing page`).

### move-drag

- **Before.** On `/jira`, PORTAL-170 is under To do. Screenshot `artifacts/<run-id>/move-drag-before.png`.
- **Drag.** Drag the PORTAL-170 card from To do onto In progress. Stay on `/jira`.
- **After.** PORTAL-170 is under In progress, not To do. Screenshot `artifacts/<run-id>/move-drag-after.png`.
- **Storage after action.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status === 'In progress'`. Save JSON to `artifacts/<run-id>/issues-after-move.json`.
- **Reload.** Full reload `/jira`. Same column. Re-read `atlassian-demo-issues`; status still `In progress`. Save `artifacts/<run-id>/issues-after-reload.json`.
- **Report.** `move-drag` passed only when the card stays in the destination column after reload. A drag that snaps back fails.

### move-status-select (not a board-drag proof)

- **Open.** Activate the PORTAL-170 card or go to `/jira/issues/PORTAL-170`.
- **Before.** Status reads `To do` (reset storage first if a drag already changed it). Screenshot `artifacts/<run-id>/move-before-detail.png`.
- **Change.** On select `Status` (`#issue-status`), choose `In progress`.
- **Storage after action.** Same `atlassian-demo-issues` check as `move-drag`.
- **Board.** Go to `/jira`. PORTAL-170 is under In progress, not To do. Screenshot `artifacts/<run-id>/move-after-board.png`.
- **Reload.** Full reload `/jira`. Same column.

## Gotchas

- Passing `move-status-select` does not verify board drag.
- `updateIssueStatus` matches `issue.key` exactly (`PORTAL-170`), not case-insensitive. Drive with the seeded keys.
- Releasing the pointer outside every column must leave the card where it started.
- A click on the card still opens `/jira/issues/:key`. Do not treat that navigation as a failed drag.
- Do not `localStorage.setItem` the new status as the user action. That skips the UI under test.
- Trello (`/trello`) list moves are not a Jira proof.
