# Agents

Agent switches persist in `atlassian-demo-agents`.

## Sub-features

- `agent-enable` turns Onboarding writer on.
- `agent-reload` keeps it enabled.

## How to get to it (user POV)

- On `/rovo`, Agents section.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Toggle.** Switch `Onboarding writer` to on. Reload. Still on.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
