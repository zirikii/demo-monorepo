# Space

The Northline space lists seeded Confluence pages and can filter them.

## Sub-features

- `space-list` shows Portal 2.0 strategy brief, Safari login banner notes, Partner onboarding playbook, Q3 campaign landing brief.
- `space-search` can empty the list.

## How to get to it (user POV)

- After Confluence login, land on `/confluence`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **List.** Heading `Northline`. Open the strategy-brief link.
- **Search.** Fill `Search pages` with `zzzz`. Status `No pages match that search.`
- **Proof.** Screenshot `space.png`.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
