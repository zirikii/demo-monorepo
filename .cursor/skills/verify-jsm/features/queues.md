# Queues

Queues list ITSM requests and filter by type.

## Sub-features

- `queue-all` shows ITSM-14, ITSM-22, ITSM-31, ITSM-08.
- `queue-incident` tab keeps incidents only.

## How to get to it (user POV)

- After login, `/jsm`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Tabs.** Choose Incident. ITSM-14 remains. Choose All.
- **Open.** Activate ITSM-14.
- **Proof.** Screenshot `queues.png`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
