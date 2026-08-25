# Login

Rovo portal credentials land on Studio, not the Jira board.

## Sub-features

- `login-form` uses `/login?portal=rovo` with `rovo@atlassian.com` / `agents2026`.

## How to get to it (user POV)

- Open `/login?portal=rovo`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Submit.** URL `/rovo`. Heading `Rovo Studio`. Do not treat `/jira/rovo` as this proof.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
