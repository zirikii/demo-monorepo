# Employment Hero login

- **File:** `apps/employmenthero/src/pages/Login.tsx`
- **Route:** `/login`
- **Nav variants** (on the page itself): `/login`, `/login?portal=employee`, `/login?portal=partner`
- **Also:** `?redirect=` (falls back to `session.landing`)

## Lookup

`PORTALS` is a `Record<DemoPortal, …>`. `resolvePortal(searchParams.get("portal"))` returns `"employee" | "partner" | "employer"`, then `details = PORTALS[portal]`.

This is the pattern to copy. `details.title` is always defined.

## When editing

Keep the resolver. Do not index `PORTALS` with the raw query string. Render-test all three portal links.
