# Naukri login

- **File:** `apps/naukri/components/auth/LoginForm.tsx`
- **Route:** used from the Naukri login page
- **Query params:** `?redirect=` only (default `/dashboard`)

## Lookup

No config map. `searchParams.get("redirect")` is a path, not an object key. Heading is the static string `"Login"`.

## When editing

If you add a query-keyed config, resolve to a known key or default before reading fields. Render-test the bare login URL and each advertised variant.
