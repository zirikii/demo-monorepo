# Issue detail

Issue detail shows a PORTAL work item at `/jira/issues/:key` with summary, description, and Status.

## Sub-features

- `issue-from-board` opens a card from the board.
- `issue-from-backlog` opens a key link from `/jira/backlog`.
- `issue-direct` loads `/jira/issues/:key` when a session exists.
- `issue-missing` shows Work item not found for an unknown key.
- `issue-comment` appends to `comments` on the stored issue via the Add a comment form.

## How to get to it (user POV)

- Choose a card on `/jira`.
- On `/jira/backlog`, choose the key link (accessible name is the key, e.g. `PORTAL-161`) or the summary link.
- Header Create opens the create-work-item dialog (lands in To do). Direct URL `/jira/issues/PORTAL-142` is still valid.
- Open `/jira/issues/PORTAL-142` directly.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Seeded session. Prefer a seed reset so PORTAL-142 is In progress.

- **Direct.** Open `/jira/issues/PORTAL-142`. Title includes `PORTAL-142`. Heading `Add 300k-account onboarding path`. Status `In progress`.
- **Board entry.** From `/jira`, activate the PORTAL-142 card. Same page.
- **Backlog entry.** Open `/jira/backlog`. Choose link `PORTAL-161`. URL `/jira/issues/PORTAL-161`. Heading `Login banner renders twice on Safari 18`.
- **Missing.** Open `/jira/issues/PORTAL-999`. Heading `Work item not found`. Choose Back to board → `/jira`.
- **Comment.** On `/jira/issues/PORTAL-142`, fill `Add a comment` with `Ready for launch review.` Choose Comment. The text is visible. `atlassian-demo-issues` for PORTAL-142 includes that body. Reload; comment still present.
- **Proof.** Screenshot `artifacts/<run-id>/issue-PORTAL-142.png` with key, summary, and Status.

## Gotchas

- Backlog key links use `name={issue.key}`; board cards do not. Use `/PORTAL-NNN/` on the board and the exact key on the backlog.
- Anonymous `/jira/issues/:key` redirects to login with `redirect=`.
- Status changes are this page's mutation; column membership is proven on the board after navigation/reload (see Move issue).
- Submit the comment form with `name: "Comment"` exact — Jira chrome also has an icon button named `Comments`.
