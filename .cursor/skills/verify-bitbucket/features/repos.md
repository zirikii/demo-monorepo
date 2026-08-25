# Repositories

Repository list includes portal-web and account-service.

## Sub-features

- `repo-list` shows both seeds.
- `repo-open` opens portal-web pull requests.

## How to get to it (user POV)

- After login, `/bitbucket`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Open.** Choose portal-web. Heading `portal-web`. Link `#42` is visible.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
