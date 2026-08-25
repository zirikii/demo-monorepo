# Create issue

Create issue opens a dialog from a board column (or the header Create button) and writes a new PORTAL work item into `atlassian-demo-issues`.

## Sub-features

- `create-column` opens the dialog from `Create in To do` (and the other columns).
- `create-header` opens the same dialog from the header Create button (To do).
- `create-persist` stores the new key/summary/status so a reload still shows the card.

## How to get to it (user POV)

- On `/jira`, choose Create under a column.
- On `/jira`, choose Create in the header.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. Prefer a seed reset so keys start at PORTAL-*.

- **Open.** On `/jira`, choose `Create in To do`. Heading `Create work item`.
- **Fill.** Summary `Write launch FAQ`. Type can stay Story.
- **Submit.** Choose `Create work item`. The card `Write launch FAQ` is visible under To do.
- **Storage.** `atlassian-demo-issues` contains that summary with `status: "To do"` and a new `PORTAL-*` key.
- **Reload.** Full reload `/jira`. The card is still under To do.
- **Proof.** Screenshot `artifacts/<run-id>/create-todo.png`. Save JSON to `artifacts/<run-id>/issues-after-create.json`.

## Gotchas

- Column buttons are named `Create in {status}`. The dialog submit is `Create work item`. Header Create is labelled `Create`.
- Cards remain non-draggable after create. Do not treat create as a column-move proof.
- `nextIssueKey` increments the highest PORTAL number already stored. A stale `atlassian-demo-issues` changes the new key.
