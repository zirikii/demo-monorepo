# nine.com.au demo — cloud notes

- Dev: `pnpm dev:nine` (port **5177**)
- No env required; `.env.example` documents optional `VITE_*` vars
- `pnpm --filter nine-news-demo test` is Vitest (safe at root)
- Unofficial demo — not affiliated with Nine Entertainment Co.
- **Intentional bug:** `/sport` crashes via `src/components/sport/LiveScores.tsx`
  (`match.scores!` on an upcoming fixture). It is caught by the route-level `ErrorBoundary`
  and tracked by a `bug`-labelled DR Jira ticket. Do not "fix" it unless the task asks you to.
