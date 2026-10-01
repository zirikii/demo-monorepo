# SEEK login

- **Page:** `apps/seek/app/oauth/login/page.tsx`
- **Form:** `apps/seek/components/auth/LoginForm.tsx`
- **Route:** `/oauth/login`
- **Query params:** `?redirect=` — the page allows only paths that `startsWith("/")`, else `/dashboard`

## Lookup

No config map. The page narrows `redirect` before passing `redirectTo` into the form. The form does not read search params itself.

## When editing

Keep redirect allowlisting. If you add a query-keyed config, resolve it on the page (same as `redirectTo`) before the form renders a field from it. Render-test `/oauth/login` and a `?redirect=` variant.
