# Login

Login signs into Jira Product Discovery and lands on Ideas.

## Sub-features

- `login-form` uses `/login?portal=jpd`.
- `login-guard` sends anonymous `/jpd` to that portal.

## How to get to it (user POV)

- Open `/login?portal=jpd` or visit `/jpd` signed out.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Submit.** URL `/jpd`. Heading `Ideas`.
- **Proof.** Screenshot `login-ideas.png`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
