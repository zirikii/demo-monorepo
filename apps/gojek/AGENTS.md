# AGENTS.md — apps/gojek

Unofficial demo recreation of Gojek's technology/employer site plus a mock candidate hub.
Vite + React 19 + TypeScript + Tailwind v4, dev port **5184** (`pnpm dev:gojek`).

## Conventions specific to this app

- Class joiner is `cn` from `@/lib/cn` (re-export of `@demo/ui/cn`). Do not import `clsx`
  directly.
- Design tokens live in the `@theme` block of `src/index.css`. `#00AA13` (Gojek green) is the
  one value taken from the real brand; every other colour is a documented approximation
  because gojek.io is unreachable from the restricted build environment. Add new values to
  `@theme`, never inline a hex in a component.
- Dark surfaces (`bg-night`) carry the header, hero bands, and footer; the rest of the page is
  white or `surface-tint`. Marketing headings use the `display-go` utility.
- The lockup is inlined in `src/components/brand/BrandLogo.tsx` with `fill-current` so it
  inherits text colour on both dark and light surfaces. `public/brand/*.svg` exists for the
  favicon and the asset manifest — keep the two in sync if the artwork changes.
- Icons are `lucide-react` with `aria-hidden="true"` on anything decorative. Spinners are
  `<Loader2 className="h-4 w-4 animate-spin" />`.
- Dates and numbers use native `Intl` with the `en-SG` locale; interview times are rendered in
  `Asia/Jakarta` and suffixed `WIB`. Note `en-SG` abbreviates September as "Sept", which test
  expectations depend on.
- Forms use `react-hook-form` + `zod` via `@hookform/resolvers`, with errors rendered by the
  shared `Field` components.

## Hard boundaries

1. **All copy is original demo copy.** Structure and section order intentionally echo the real
   site; wording does not. Do not paste text from gojek.io into this app.
2. **No backend.** Persistence is `localStorage` only, through `src/lib/storage.ts`. Never add
   a database, API server, or real network call.
3. **Auth stays mock.** `src/lib/auth.ts` accepts only the two seeded accounts and stores a
   base64 JSON session. Do not add real auth, hashing, or token exchange.
4. **Keep the disclaimer.** The footer, README, and login page all state this is an unofficial
   demo. Leave that language in place.
5. Seeded data (`src/data/*`) is fictional. If you add records, keep them plausible and keep
   the totals in sync with the tests that assert them (23 products, 25 roles, 12 stories).

## Testing

```bash
pnpm --filter gojek-io-demo test        # Vitest, jsdom
pnpm --filter gojek-io-demo lint
pnpm --filter gojek-io-demo typecheck
```

Suites live in `src/test/`. When you change behaviour, extend the matching suite:
`format.test.ts`, `auth.test.ts`, `filters.test.ts`, `applications.test.ts`,
`components.test.tsx`, `pages.test.tsx`, `hub.test.tsx`. Component tests assert ARIA state
(`aria-current`, `aria-pressed`, `aria-selected`, `aria-expanded`) rather than class names.
