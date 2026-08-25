# Request

Request detail can change Status and persist it.

## Sub-features

- `request-status` writes `atlassian-demo-requests`.
- `request-reload` keeps the new status.

## How to get to it (user POV)

- From queues, open ITSM-14.
- Open `/jsm/requests/ITSM-14`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Change.** Status `Resolved`.
- **Storage.** ITSM-14 status is Resolved.
- **Reload.** Still Resolved.
- **Proof.** Screenshot plus JSON.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
