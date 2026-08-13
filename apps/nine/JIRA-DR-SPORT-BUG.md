# Jira ticket draft — DR (bug) — fixed

> Original report for https://fe-anysphere-demo.atlassian.net/jira/software/projects/DR/boards/877
> Label: **bug**

## Summary
Sport hub “Latest” sort is inverted and relative timestamps render as “NaN hours ago”

## Status
Fixed: Sport uses `getByPillar("sport")` (newest first) and ISO `publishedAt` via `StoryCard` / `formatRelativeTime`.

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
- Timestamps use ISO `article.publishedAt` with `formatRelativeTime`

### Actual (pre-fix)
- `getSportArticlesBuggyLatest()` sorted ascending
- Sport page passed `toLocaleDateString("en-AU")` into `formatRelativeTime`, which then returned `NaN hours ago`

### Fix
1. Deleted `getSportArticlesBuggyLatest` and use `getByPillar("sport")`
2. Pass ISO `article.publishedAt` through `StoryCard` (no `timeLabel` override)
3. Tests assert no NaN labels and newest-first order
