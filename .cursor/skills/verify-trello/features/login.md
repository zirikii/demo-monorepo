# Login

Login signs into Trello and lands on the Northline launch board.

## Sub-features

- `login-form` uses `/login?portal=trello`.

## How to get to it (user POV)

- Open `/login?portal=trello`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Submit.** URL `/trello`. Heading `Northline launch`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
