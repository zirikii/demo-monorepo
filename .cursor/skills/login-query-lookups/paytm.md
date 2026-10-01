# Paytm sign-in

- **File:** `apps/paytm/src/components/shared/SignInModal.tsx`
- **UI:** modal, not a routed `/login` page
- **Query params:** none

## Lookup

No config map and no `searchParams`. Copy is static (`"Sign in to Paytm"`). Flow is mobile → OTP.

## When editing

If the modal starts reading `?service=` (or similar) to pick a title/config, resolve the param first. Do not index a map with the raw value.
