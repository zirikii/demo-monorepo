# Chat

Ask Rovo still uses `replyToRovo` regex replies (in-memory).

## Sub-features

- `chat-blocked` prompt `what's blocked?` mentions PORTAL-161.

## How to get to it (user POV)

- On `/rovo`, use Ask Rovo.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Ask.** `what's blocked?` Reply contains PORTAL-161.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
