# Idea detail

Idea detail can change status (Parking lot / Researching / Committed).

## Sub-features

- `idea-status` persists on DISC-15.

## How to get to it (user POV)

- Open `/jpd/ideas/DISC-15`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Change.** Status `Researching`.
- **Storage.** DISC-15 status is Researching in `atlassian-demo-ideas`.
- **Reload.** Still Researching.
- **Proof.** Screenshot plus JSON.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
