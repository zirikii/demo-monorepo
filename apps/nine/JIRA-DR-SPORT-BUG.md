# Jira ticket draft — DR (bug)

> Paste into https://fe-anysphere-demo.atlassian.net/jira/software/projects/DR/boards/877
> Add label: **bug**

## Summary
Sport hub “Latest” sort is inverted and relative timestamps render as “NaN hours ago”

## Type
Bug

## Labels
`bug`

## Status
**Resolved** — Sport now uses `getByPillar("sport")` (newest first) and ISO `publishedAt` via `StoryCard`.

## Description
On the nine.com.au demo (`apps/nine`), the Sport section page at `/sport` had two defects:

### Reproduce (historical)
1. Run `pnpm dev:nine` and open http://localhost:5177/sport
2. Confirm the **Latest** sort chip is selected
3. Observe story order is **oldest → newest** (opposite of Latest)
4. Observe every card timestamp reads **NaN hours ago**

### Expected
- Latest sorts by `publishedAt` descending (newest first), matching other pillars via `getByPillar("sport")`
- Timestamps use ISO `article.publishedAt` with `formatRelativeTime`

### Actual (pre-fix)
- `getSportArticlesBuggyLatest()` sorted ascending
- Sport page passed `toLocaleDateString("en-AU")` into `formatRelativeTime`, which then returned `NaN hours ago`

### Fix applied
1. Deleted `getSportArticlesBuggyLatest`; Sport uses `getByPillar("sport")`
2. Dropped the `timeLabel` override so cards format ISO `publishedAt`
3. Updated Sport page tests to assert valid relative times (not NaN) and newest-first order
