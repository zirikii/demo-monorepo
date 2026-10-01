# Move issue

Move issue changes a work item's status so it appears in another board column and survives a full reload via `updateIssueStatus` writing `localStorage.atlassian-demo-issues`.

This is the demo's target board proof. Drive `move-drag` on `/jira`. Issue-detail Status is a second path, not a substitute.

## Sub-features

- `move-drag` (target) drags a card from one board column onto another. Cards are links to `/jira/issues/:key`; the board uses pointer drag (not HTML5 `draggable`) so the card follows the cursor and the receiving column lights up blue (`atl-tint` / `atl-blue`). Drop calls `updateIssueStatus`.
- `move-status-select` changes Status on `/jira/issues/:key`. Do not report this as `move-drag`.
- `move-persist` stores the new `status` on the issue in `atlassian-demo-issues`.
- `move-reload` still shows the card in the destination column after a full reload.

## How to get to it (user POV)

- On `/jira`, drag a PORTAL card onto another column until that column turns blue, then release.
- Equivalent: open the card (or `/jira/issues/:key`), change Status, return to Board.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. `atlassian-demo-issues` reset, then reload `/jira`.
- Canonical subject: PORTAL-170 starts in **To do** (`Campaign ad refresh landing page`).

### move-drag

- **Drag.** On `/jira`, pointer-down on the PORTAL-170 card, move onto the **In progress** column (`region` named `In progress`, `data-board-column="In progress"`). The destination column uses Atlassian blue tokens (`bg-atl-tint-strong`, `ring-atl-blue`) and a dashed drop slot. A lifted card ghost follows the pointer. Trello (`/trello`) is a different product — do not use it as a Jira proof.
- **Drop.** Release over In progress. PORTAL-170 is under In progress, not To do.
- **Storage after action.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status === 'In progress'`. Save JSON to `artifacts/<run-id>/issues-after-move.json`.
- **Proof.** Screenshot `artifacts/<run-id>/move-drag-over.png` while the pointer is over In progress (blue column, ghost card). Screenshot `artifacts/<run-id>/move-after-board.png` after drop.
- **Reload.** Full reload `/jira`. Same column. Re-read `atlassian-demo-issues`; status still `In progress`. Save `artifacts/<run-id>/issues-after-reload.json`.

Playwright: `mouse.down` → `mouse.move` onto the column (several steps) → `mouse.up`. Do not rely on HTML5 `dataTransfer`; `draggable` stays `false` so native link-drag does not steal the gesture.

### move-status-select (not a board-drag proof)

- **Open.** Activate the PORTAL-170 card or go to `/jira/issues/PORTAL-170`.
- **Before.** Status reads `To do`. Screenshot `artifacts/<run-id>/move-before-detail.png`.
- **Change.** On select `Status` (`#issue-status`), choose `In progress`.
- **Board.** Go to `/jira`. PORTAL-170 is under In progress, not To do.

## Gotchas

- Passing `move-status-select` does not verify board drag. Require a pointer drop on a column (or an equivalent board control that does not leave `/jira`) and the same storage + reload checks.
- `updateIssueStatus` matches `issue.key` exactly (`PORTAL-170`), not case-insensitive. Drive with the seeded keys.
- Board state updates on drop; still reload to prove `atlassian-demo-issues`.
- Do not `localStorage.setItem` the new status as the user action. That skips the UI under test.
- Click without moving still opens `/jira/issues/:key`. Do not treat a navigation as a failed drag.
