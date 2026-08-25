# Login

Login signs into Bitbucket and lands on Repositories.

## Sub-features

- `login-form` uses `/login?portal=bitbucket`.

## How to get to it (user POV)

- Open `/login?portal=bitbucket`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Submit.** URL `/bitbucket`. Heading `Repositories`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
