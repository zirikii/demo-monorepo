# Page

A page shows title, body, comments, and can persist a new comment.

## Sub-features

- `page-open` loads `/confluence/pages/strategy-brief`.
- `page-comment` writes `atlassian-demo-pages`.
- `page-edit` Save updates the title/body.

## How to get to it (user POV)

- From the space, choose a page title.
- Open `/confluence/pages/strategy-brief` directly.

## Driving it with isolated Chromium

Preconditions:

- Doctor passes. Isolated profile. Seeded credentials.

- **Open.** Heading `Portal 2.0 strategy brief`.
- **Comment.** Fill `Add a comment` with `Ready for the partner review.` Choose Comment. The text is visible.
- **Storage.** `atlassian-demo-pages` for id `strategy-brief` includes that comment body.
- **Reload.** Comment still present.
- **Edit.** Choose Edit. Change Title to `Portal 2.0 strategy brief (edited)`. Choose Save. Heading updates. Reload; title still edited.
- **Proof.** Screenshot `page-comment.png` plus JSON.

## Gotchas

- Anonymous visits redirect to `/login?portal=…&redirect=…`.
- Do not `localStorage.setItem` the new state as the user action.
- Other product apps share this origin; prefer the Switch apps menu only when the recipe says so.
