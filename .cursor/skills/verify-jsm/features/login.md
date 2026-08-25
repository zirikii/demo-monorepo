# Login

Login signs into Jira Service Management and lands on Queues.

## Sub-features

- `login-form` uses `/login?portal=jsm`.
- `login-guard` sends anonymous `/jsm` to that portal.

## How to get to it (user POV)

- Open `/login?portal=jsm` or visit `/jsm` signed out.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Submit.** Continue. URL `/jsm`. Heading `Queues`.
- **Proof.** Screenshot `login-queues.png`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
