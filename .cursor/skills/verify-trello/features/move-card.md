# Move card

Trello cards CAN move between lists. This is the contrast with Jira board cards, which must not.

## Sub-features

- `move-select` uses Move to.
- `move-drag` drops onto another list.
- `move-persist` writes `atlassian-demo-trello`.

## How to get to it (user POV)

- On `/trello`, move Draft press kit from Inbox to Doing.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Select.** `Move Draft press kit` → Doing. Card is under Doing.
- **Storage.** `press-kit` list is Doing.
- **Reload.** Still Doing.
- **Do not** treat this as a Jira `move-drag` proof.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
