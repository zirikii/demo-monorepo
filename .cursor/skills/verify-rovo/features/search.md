# Search

Graph search filters Teamwork Graph hits (work items, pages, requests, PRs, videos).

## Sub-features

- `search-empty` shows seeded hits including PORTAL-161.
- `search-safari` keeps the Safari banner hits.

## How to get to it (user POV)

- After Rovo login, `/rovo`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Search.** Fill `Search the graph` with `Safari`. Safari banner repro, PORTAL-161, and the PR `Fix Safari banner casing (PORTAL-161)` remain.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
