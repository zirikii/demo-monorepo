# Pull request

An open PR can be approved; status persists in `atlassian-demo-prs`.

## Sub-features

- `pr-approve` sets status Approved.
- `pr-merge` sets Merged.

## How to get to it (user POV)

- Open `/bitbucket/portal-web/pull-requests/42`.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Approve.** Button Approve. Status reads Approved.
- **Storage.** PR 42 status Approved.
- **Reload.** Still Approved.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
