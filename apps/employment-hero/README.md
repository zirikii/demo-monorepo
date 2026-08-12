# Employment Hero demo (unofficial)

Vite + React 19 marketing site and mock HR portal inspired by [employmenthero.com](https://employmenthero.com/).

**This is an unofficial demo and is not affiliated with Employment Hero Pty Ltd.**

## Quick start

From the monorepo root:

```bash
pnpm install
pnpm dev:employment-hero
```

App runs at [http://localhost:5180](http://localhost:5180).

## Demo credentials

| Field | Value |
| --- | --- |
| Email | `admin@example.com` |
| Password | `demo` |

Any email/password is accepted by the mock auth layer once the login screen renders. Signup also creates a local session.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (port 5180) |
| `pnpm build` | Typecheck + production build |
| `pnpm test` | Vitest unit tests |
| `pnpm lint` | ESLint |
| `pnpm brand` | Re-print brand asset notes |

## Structure

- `src/pages` — marketing, auth, legal, regional pages
- `src/pages/portal` — mock Employment OS shell (people, leave, payroll, recruitment, settings)
- `src/data` — seed data (people, pay runs, jobs, blog, customers)
- `public/brand` — self-hosted logo, mark, favicon

## Persistence

Sessions and settings use `localStorage` only. No real database, OAuth, or payments.
