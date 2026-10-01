# Nine login

- **File:** `apps/nine/src/pages/Login.tsx`
- **Route:** `/login`
- **Query params:** none. Signed-in visitors are sent to `/account`.

## Lookup

No config map. Heading is the static string `"Sign in"`.

## When editing

If you add `?service=` / `?portal=` (or any map keyed by a query value), resolve it to a known key or default before reading fields. Add a render test for `/login` and each new variant.
