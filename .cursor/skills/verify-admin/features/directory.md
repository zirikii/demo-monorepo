# Directory

Directory lists Maya, Jordan, Priya, Sam, Nadia.

## Sub-features

- `directory-seed` shows those names and emails.

## How to get to it (user POV)

- After admin login, `/admin`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Proof.** Screenshot with Maya Chen and demo@atlassian.com.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
