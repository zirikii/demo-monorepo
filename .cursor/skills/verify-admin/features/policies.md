# Policies

Organisation policy switches persist in `atlassian-demo-admin`.

## Sub-features

- `policy-twostep` toggles Two-step verification.
- `policy-signup` toggles Public signup.
- `policy-reload` keeps the values.

## How to get to it (user POV)

- On `/admin`, Organisation policies.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Toggle.** Two-step verification off. Storage `twoStepLogin: false`. Reload. Still off.
- **Signup.** Public signup on. Storage `publicSignup: true`. Reload. Still on.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
