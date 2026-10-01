---
name: login-query-lookups
description: Prevent login-page crashes from query-param config lookups that miss and then dereference undefined.
---
# Login query-param lookups

Never index a config map with a raw URL query value and then read a field on the result. Query strings are untyped and often a different case than object keys (`netbank` vs `NetBank`). A `as keyof typeof config` cast hides `undefined` even with `noUncheckedIndexedAccess`, and `{service.name}` throws on `/login`.

## Required

1. Resolve the param through a helper that returns a **known key or a default**. Do not cast `searchParams.get(...)`.
2. If you must index, use a fallback: `config[key] ?? config.default`.
3. Add a render test for the bare login URL **and** every advertised `?service=` / `?portal=` / `?redirect=` variant from nav.

## Examples

```tsx
// ❌ BAD — default and nav use lowercase; keys are PascalCase
const key = (searchParams.get("service") ?? "netbank") as keyof typeof serviceConfig;
const service = serviceConfig[key];
<h1>Log on to {service.name}</h1>

// ✅ GOOD — narrow the param, then index a guaranteed key
function resolveService(value: string | null): keyof typeof serviceConfig {
  const normalised = value?.toLowerCase();
  if (normalised === "commbiz") return "CommBiz";
  if (normalised === "commsec") return "CommSec";
  return "NetBank";
}
const service = serviceConfig[resolveService(searchParams.get("service"))];
```

Employment Hero's `resolvePortal()` in `apps/employmenthero/src/pages/Login.tsx` is the pattern to copy.

## Additional resources

Read only the file for the app you are changing:

- [commbank.md](commbank.md) — crash: `?service=` vs PascalCase keys
- [employmenthero.md](employmenthero.md) — `resolvePortal()` (copy this)
- [nine.md](nine.md)
- [changi.md](changi.md)
- [spark.md](spark.md)
- [paytm.md](paytm.md)
- [seek.md](seek.md)
- [naukri.md](naukri.md)
