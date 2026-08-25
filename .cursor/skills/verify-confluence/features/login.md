# Login

Login signs a seeded demo user into Confluence and lands on the Northline space.

## Sub-features

- `login-form` submits Email + Password on `/login?portal=confluence` and reaches `/confluence`.
- `login-guard` sends anonymous `/confluence` to login with `portal=confluence`.

## How to get to it (user POV)

- Open `/login?portal=confluence`.
- Visit `/confluence` while signed out.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Open.** Go to `$ORIGIN/login?portal=confluence`. Heading `Log in to Confluence`.
- **Submit.** Continue with `demo@atlassian.com` / `teamwork2026`. URL `/confluence`. Heading `Northline`.
- **Guard.** Fresh profile, open `/confluence`. URL contains `portal=confluence` and `redirect=`.
- **Proof.** Screenshot `login-space.png`. Session email `demo@atlassian.com`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
