# Ideas

The ideas table lists DISC keys with impact, effort, and votes.

## Sub-features

- `ideas-seed` shows DISC-4, DISC-9, DISC-15.
- `ideas-vote` increments votes and writes `atlassian-demo-ideas`.

## How to get to it (user POV)

- After login, `/jpd`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Vote.** Choose `Vote for DISC-9`. Count goes 7 → 8.
- **Reload.** Still 8.
- **Proof.** Screenshot plus JSON.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
