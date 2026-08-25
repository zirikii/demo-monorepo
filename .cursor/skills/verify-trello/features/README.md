# Trello workspace verification map

Maintained source for verifying the mock Trello workspace in `apps/atlassian`. Marketing pages and other product apps are out of scope. Read this index, then the matching feature file.

## Baseline preconditions

- App healthy at `http://localhost:5183` (or `$VERIFY_TRELLO_URL`) with `DEMO_BASE` unset. `scripts/doctor.sh` passes.
- Isolated Chromium; do not reuse a tab that might be a customer presentation.
- Session: sign in as `demo@atlassian.com` / `teamwork2026` via `/login?portal=trello`.
- Never drive an instance this run did not start. Default port 5183; isolated proofs may use 53183.
- Jira board cards staying unmovable is owned by `verify-jira`. Do not change that from this map.

## Driving conventions

- Start from baseline unless a recipe says otherwise.
- Prefer ARIA roles and accessible names.
- Reset seed with `localStorage.removeItem('atlassian-demo-trello')` then reload when a recipe needs a clean store.
- Keep proof artifacts. Do not delete `.cursor/skills/verify-trello/artifacts/`.

## Feature entry contract

Each file: H1, one paragraph, then `Sub-features`, `How to get to it (user POV)`, `Driving it with isolated Chromium`, `Gotchas`.

## Features

- [Login](./login.md) — Login signs into Trello and lands on the Northline launch board.
- [Board](./board.md) — Four lists hold seeded cards (press kit, website QA, partner email, logo lockup).
- [Move card](./move-card.md) — Trello cards CAN move between lists. This is the contrast with Jira board cards, which must not.
