# Board

The sprint board lists PORTAL work items in four columns: To do, In progress, In review, Done.

## Sub-features

- `board-columns` shows all four status headings.
- `board-seed` shows seeded PORTAL keys in the expected columns (after a seed reset).
- `board-search` filters by key or summary and can empty the board.
- `board-open-issue` opens a card onto `/jira/issues/:key`.

## How to get to it (user POV)

- After Jira login, land on `/jira`.
- In the Jira nav, choose Board.
- Choose the Jira mark in the sidebar (`aria-label="Jira"`).

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Session is `demo@atlassian.com`.
- `localStorage.removeItem('atlassian-demo-issues')` then reload `/jira` so seed is used.
- Seed columns (from `src/data/jira.ts`):
  - To do: PORTAL-170, PORTAL-171, PORTAL-133
  - In progress: PORTAL-142, PORTAL-155, PORTAL-118
  - In review: PORTAL-161
  - Done: PORTAL-098, PORTAL-104, PORTAL-088

- **Columns.** Open `/jira`. Headings `PORTAL Sprint 24`, `To do`, `In progress`, `In review`, `Done` are visible.
- **Seed keys.** Each column contains the keys above. PORTAL-142 is visible (In progress).
- **Search miss.** Fill `Search work items` with `zzzz`. Status `No work items match that search.` PORTAL-142 is gone.
- **Search hit.** Clear search (empty the textbox). PORTAL-142 returns.
- **Open card.** Activate the link whose name includes `PORTAL-142`. URL is `/jira/issues/PORTAL-142`. Heading `Add 300k-account onboarding path`.
- **Proof.** Screenshot `artifacts/<run-id>/board-columns.png` with all four column headings and at least one PORTAL key per column.

## Gotchas

- Cards are entire-card links; the accessible name is summary + key + assignee, not the key alone. Match `/PORTAL-142/` on the link role. Story points live on issue detail, not the card.
- There is no compact Rovo chat aside on `/jira`. Header **Ask Rovo** and the FAB **Chat with Rovo** navigate to `/jira/rovo` — prove that on `rovo-panel.md`, not here.
- `readIssues()` hydrates from `atlassian-demo-issues` when that key is a non-empty array. Stale storage looks like a wrong seed — reset the key, not all of localStorage.
- Create in the header opens a dialog (To do). Column Create is `Create in {status}`.
