# Changi login

- **File:** `apps/changi/src/pages/Login.tsx`
- **Route:** `/login`
- **Query params:** `?redirect=` only (default `/account`)

## Lookup

No config map. Heading is the static string `"Sign in to Changi Account"`. `redirect` is passed to `navigate(...)` as a path string, not used as an object key.

## When editing

If you add a branded-service query param, resolve it before indexing. Do not cast `params.get(...)` to `keyof typeof`. Render-test `/login` and any new variants.
