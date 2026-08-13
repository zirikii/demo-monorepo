# Jira ticket draft — DR (bug)

> Paste into https://fe-anysphere-demo.atlassian.net/jira/software/projects/DR/boards/877
> Add label: **bug**
>
> Status: **fixed** — Sport hub now uses `getByPillar("sport")` and ISO `publishedAt` timestamps.

## Summary
Sport hub “Latest” sort is inverted and relative timestamps render as “NaN hours ago”

## Type
Bug

## Labels
`bug`

## Description
On the nine.com.au demo (`apps/nine`), the Sport section page at `/sport` had two defects:

### Reproduce (pre-fix)
1. Run `pnpm dev:nine` and open http://localhost:5177/sport
2. Confirm the **Latest** sort chip is selected
3. Observe story order is **oldest → newest** (opposite of Latest)
4. Observe every card timestamp reads **NaN hours ago**

### Expected
- Latest sorts by `publishedAt` descending (newest first), matching other pillars via `getByPillar("sport")`
- Timestamps use ISO `article.publishedAt` with `formatRelativeTime` (e.g. `3h ago`)

### Actual (pre-fix)
- `getSportArticlesBuggyLatest()` sorted ascending
- Sport page passed `toLocaleDateString("en-AU")` into `formatRelativeTime`, which then returned `NaN hours ago`

### Fix
1. Deleted `getSportArticlesBuggyLatest` and use `getByPillar("sport")`
2. Pass `article.publishedAt` (ISO) through `StoryCard` / `formatRelativeTime` (no `timeLabel` override)
3. Sport page tests assert relative times (not NaN) and newest-first Latest order
