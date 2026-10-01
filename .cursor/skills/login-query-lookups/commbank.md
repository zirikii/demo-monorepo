# CommBank login

- **File:** `apps/commbank/src/pages/Login.tsx`
- **Route:** `/login`
- **Nav variants** (`apps/commbank/src/data/nav.ts` `logOnOptions`): `/login`, `/login?service=commbiz`, `/login?service=commsec`
- **Also:** `?redirect=` (default `/netbank`)

## Lookup

`serviceConfig` keys are PascalCase (`NetBank`, `CommBiz`, `CommSec`). The page casts the raw query (default `"netbank"`) to `keyof typeof serviceConfig` and reads `service.name` / `service.tagline`.

That miss is the original crash: `/login` and the CommBiz/CommSec nav links all fail.

## When editing

Use `resolveService()` (or `config[key] ?? config.NetBank`). Do not add another `as keyof typeof`. Render-test `/login` and both `?service=` links.
