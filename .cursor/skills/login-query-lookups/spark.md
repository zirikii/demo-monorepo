# Spark login

- **File:** `apps/spark/components/auth/login-form.tsx`
- **Route:** used from the MySpark login page
- **Query params:** `?redirect=` only (default `/dashboard`)

## Lookup

No config map. `search.get("redirect")` is a path, not an object key.

## When editing

If you add a query-keyed config (plan, brand, portal), resolve to a known key or default. Render-test the bare login URL and each advertised variant.
