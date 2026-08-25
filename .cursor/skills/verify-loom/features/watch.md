# Watch

Watch marks a video watched and persists `atlassian-demo-looms`.

## Sub-features

- `watch-mark` sets watched true.
- `watch-reload` keeps Watched.

## How to get to it (user POV)

- Open `/loom/sprint-24-demo`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Mark.** Choose Mark as watched. Button reads Watched.
- **Reload.** Still Watched.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
