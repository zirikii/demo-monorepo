# Library

The library lists seeded videos including unwatched Sprint 24 demo.

## Sub-features

- `library-seed` shows Sprint 24 demo walkthrough, Safari banner repro, Partner onboarding tour.

## How to get to it (user POV)

- After login, `/loom`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Open.** Choose Sprint 24 demo walkthrough.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
