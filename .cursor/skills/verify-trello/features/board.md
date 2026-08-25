# Board

Four lists hold seeded cards (press kit, website QA, partner email, logo lockup).

## Sub-features

- `board-lists` shows Inbox, Doing, Review, Done.
- `board-seed` shows Draft press kit in Inbox.

## How to get to it (user POV)

- After login, `/trello`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Proof.** Screenshot with all four list headings.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
