# Login

Login signs a seeded demo user into the mock Jira workspace and lands on the sprint board.

## Sub-features

- `login-jira-form` submits Email + Password on `/login` (Jira portal) and reaches `/jira`.
- `login-header-entry` reaches the same form from marketing Sign in → Jira.
- `login-guard` sends an anonymous `/jira` visit to `/login?redirect=…`.
- `login-reject` shows an alert for a wrong password and stays on login.

## How to get to it (user POV)

- Open `/login` (Jira portal is the default).
- Open `/login?portal=jira`.
- From the marketing header, choose Sign in → Jira (`/login?portal=jira`).
- Visit `/jira` while signed out (redirect to login with `redirect=`).

## Driving it with isolated Chromium

Preconditions:

- Doctor passes at `$VERIFY_JIRA_URL` (default `http://localhost:5183`).
- Isolated profile. `atlassian-demo-session` absent or you will replace it.
- Viewport wide enough to use desktop Sign in (md+). Cookie banner may appear on marketing pages only — Accept if it blocks the header. Login itself has no cookie banner.

- **Open Jira login.** Go to `$ORIGIN/login`. Heading is `Log in to Jira`. Email is pre-filled `demo@atlassian.com`, password `teamwork2026`.
- **Header entry.** From `$ORIGIN/`, choose Sign in, then the Jira option. Same heading and pre-fill.
- **Submit.** Fill Email `demo@atlassian.com` and Password `teamwork2026` if needed. Choose Continue. URL is `/jira`. Heading `PORTAL Sprint 24`. Document title `Board · PORTAL Sprint 24 | Atlassian (Demo)`. Nav named `Jira` is present.
- **Guard.** In a fresh profile, open `/jira`. URL contains `/login` and `redirect=`. Heading `Log in to Jira`. Board search `Search work items` is absent.
- **Reject.** On `/login`, set Password to `wrong-password` and Continue. An alert appears: `We couldn't verify those details`. URL stays on login.
- **Proof.** Screenshot `artifacts/<run-id>/login-board.png` showing PORTAL chrome and `PORTAL Sprint 24`. Session: `localStorage.atlassian-demo-session` decodes to email `demo@atlassian.com`. Helper: `node .cursor/skills/verify-jira/scripts/drive-login-board.mjs`.

## Gotchas

- Admin (`admin@atlassian.com` / `admin2026`) lands on `/admin`. Rovo (`rovo@atlassian.com` / `agents2026`) lands on `/rovo`. Those are not this proof. Jira-embedded Rovo remains at `/jira/rovo` after a Jira session.
- Unlike naukri/seek, unknown emails and wrong passwords fail.
- Sign-up at `/signup` also creates a session and goes to `/jira`; that is a different account, not the seeded demo user.
- Deployed proofs must use `/atlassian/login`, not `/login` at site root (hub).
