# Jira workspace verification map

Maintained source for verifying the mock Jira workspace in `apps/atlassian`. Marketing pages are out of scope. Read this index, then the matching feature file.

## Baseline preconditions

- App healthy at `http://localhost:5183` (or `$VERIFY_JIRA_URL`) with `DEMO_BASE` unset. `scripts/doctor.sh` passes.
- Isolated Chromium; do not reuse a tab that might be a customer presentation.
- Seeded board: if `atlassian-demo-issues` exists from an earlier run, remove that key so `readIssues()` reloads seed (`PORTAL-*` in To do / In progress / In review / Done).
- Session: sign in as `demo@atlassian.com` / `teamwork2026`, or reuse `atlassian-demo-session` for that user.
- Never drive an instance this run did not start. Default port 5183; isolated proofs may use 53183.

## Driving conventions

- Start from baseline unless a recipe says otherwise.
- Prefer ARIA roles and accessible names. Board cards are links whose name includes the summary and `PORTAL-NNN` (not story points).
- Board column headings use the status strings `To do`, `In progress`, `In review`, `Done`.
- Reset seed with `localStorage.removeItem('atlassian-demo-issues')` then reload. Do not wipe `atlassian-demo-session` unless the recipe is Login.
- Keep proof artifacts. Do not delete `.cursor/skills/verify-jira/artifacts/`.

## Proof and skip reporting

- UI proof: screenshot with Jira chrome visible (PORTAL / Customer portal) plus the assertion (column, heading, Rovo reply).
- Mutation proof: `atlassian-demo-issues` JSON after the UI action, then again after a full reload.
- Record feature id and entry point on every artifact.
- Board drag (`move-drag`) is the demo target. Drive a pointer drop onto another column on `/jira`. Do not report issue-detail Status as that proof.

## Feature entry contract

Each file: H1, one paragraph, then `Sub-features`, `How to get to it (user POV)`, `Driving it with isolated Chromium`, `Gotchas`.

## Features

- [Login](./login.md) — sign in and reach the Jira board.
- [Board](./board.md) — Sprint board columns and PORTAL issues.
- [Create issue](./create-issue.md) — column Create dialog writes a new PORTAL work item.
- [Move issue](./move-issue.md) — target demo proof: drag a card between columns; persist via `updateIssueStatus` / `atlassian-demo-issues`. Issue-detail Status is a second path and must be labeled as such.
- [Issue detail](./issue-detail.md) — open `/jira/issues/:key`, including comments.
- [Rovo panel](./rovo-panel.md) — optional; mocked reply to a prompt. Embedded at `/jira/rovo`. Standalone Rovo is `verify-rovo`.
