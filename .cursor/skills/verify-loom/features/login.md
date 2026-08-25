# Login

Login signs into Loom and lands on the library.

## Sub-features

- `login-form` uses `/login?portal=loom`.

## How to get to it (user POV)

- Open `/login?portal=loom`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Submit.** URL `/loom`. Heading `Library`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
