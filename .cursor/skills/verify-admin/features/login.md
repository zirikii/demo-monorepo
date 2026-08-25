# Login

Admin credentials land on `/admin`, not Jira settings.

## Sub-features

- `login-form` uses `/login?portal=admin` with `admin@atlassian.com` / `admin2026`.

## How to get to it (user POV)

- Open `/login?portal=admin`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Submit.** URL `/admin`. Heading `Admin`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
