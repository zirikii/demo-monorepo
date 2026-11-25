# Move issue

Move issue changes a work item's status so it appears in another board column and survives a full reload via `updateIssueStatus` writing `localStorage.atlassian-demo-issues`.

This is the demo's board proof. Board drag (`move-drag`) is the primary path; issue-detail Status is a second entry point, not a substitute.

## Sub-features

- `move-drag` drags a card from one board column to another with an HTML5 pointer drag. While hovering, the target column is the only `section[data-drop-target="true"]`, has a blue tint + `ring-atl-blue`, and shows a dashed blue drop slot. The dragged card has `data-dragging="true"` and renders as a faded, dashed placeholder in its original column.
- `move-status-select` changes Status on `/jira/issues/:key`. Do not report this as `move-drag`.
- `move-persist` stores the new `status` on the issue in `atlassian-demo-issues`.
- `move-reload` still shows the card in the destination column after a full reload.

## How to get to it (user POV)

- **Board:** on `/jira`, drag a PORTAL card onto another column.
- **Issue detail:** open the card (or `/jira/issues/:key`), change Status, return to Board.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. `atlassian-demo-issues` reset, then reload `/jira`.
- Canonical subject: PORTAL-170 starts in **To do** (`Campaign ad refresh landing page`).
- Columns are named regions: `getByRole('region', { name: 'In progress', exact: true })`.

### move-drag

- **Before.** PORTAL-170 is inside the To do region and has `draggable="true"`. Screenshot `artifacts/<run-id>/move-drag-before.png`.
- **Drag.** `page.mouse.move` to the card centre, `mouse.down()`, then `mouse.move` onto the In progress region in several steps. Playwright's locator `dragTo` also works; synthetic `dispatchEvent` drags do not prove the UI.
- **Hover state.** Wait for `section[data-drop-target="true"]`, then wait until exactly one column is highlighted and its background has finished transitioning. The target region is `In progress`, its className contains `atl-blue`, its computed background is the atl-tint blue (`rgb(233, 242, 255)`), and PORTAL-170's link has `data-dragging="true"`. Save `artifacts/<run-id>/drag-hover-state.json` and screenshot `move-drag-hover.png`.
- **Drop.** `mouse.up()`. PORTAL-170 is inside In progress and not in To do; no column still has `data-drop-target="true"`. Storage status is `In progress`. Save `artifacts/<run-id>/issues-after-drag.json` and screenshot `move-drag-after.png`.
- **Reload.** Full reload `/jira`. PORTAL-170 is still inside In progress and storage still reads `In progress`. Save `issues-after-drag-reload.json` and screenshot `move-drag-reload.png`.
- Trello (`/trello`) list moves are a different product. Do not use them as a Jira proof.

### move-status-select (issue detail; not a board-drag proof)

- **Open.** Activate the PORTAL-170 card or go to `/jira/issues/PORTAL-170`.
- **Before.** Screenshot `artifacts/<run-id>/move-before-detail.png`.
- **Change.** On select `Status` (`#issue-status`), choose a column the card is not in (after `move-drag`, `In review`).
- **Storage after action.** `JSON.parse(localStorage.getItem('atlassian-demo-issues')).find(i => i.key === 'PORTAL-170').status` equals the chosen status. Save JSON to `artifacts/<run-id>/issues-after-move.json`.
- **Board.** Go to `/jira`. PORTAL-170 is under the chosen column. Screenshot `artifacts/<run-id>/move-after-board.png`.
- **Reload.** Full reload `/jira`. Same column. Re-read `atlassian-demo-issues`. Save `artifacts/<run-id>/issues-after-reload.json`.

## Gotchas

- Passing `move-status-select` does not verify board drag, and vice versa. Report each sub-feature on its own.
- The hovered column must differ from the card's own column; hovering its own column never highlights.
- Headless screenshots do not include the OS drag image, only the in-page placeholder and drop target.
- `updateIssueStatus` matches `issue.key` exactly (`PORTAL-170`), not case-insensitive. Drive with the seeded keys.
- Do not `localStorage.setItem` the new status as the user action. That skips the UI under test.
