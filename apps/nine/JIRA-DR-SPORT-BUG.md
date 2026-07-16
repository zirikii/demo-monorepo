# Jira ticket draft — DR (bug)

> Paste into https://fe-anysphere-demo.atlassian.net/jira/software/projects/DR/boards/877
> Add label: **bug**

## Summary
Sport hub “Latest” sort is inverted and relative timestamps render as “NaN hours ago”

## Type
Bug

## Labels
`bug`

## Description
On the nine.com.au demo (`apps/nine`), the Sport section page at `/sport` has two intentional-but-shipped defects for Bugbot / QA demos that should be fixed:

### Reproduce
1. Run `pnpm dev:nine` and open http://localhost:5177/sport
2. Confirm the **Latest** sort chip is selected
3. Observe story order is **oldest → newest** (opposite of Latest)
4. Observe every card timestamp reads **NaN hours ago**

### Expected
- Latest sorts by `publishedAt` descending (newest first), matching other pillars via `getByPillar("sport")`
- Timestamps use ISO `article.publishedAt` with `formatRelativeTime` (e.g. `3h ago`)

### Actual
- `getSportArticlesBuggyLatest()` sorts ascending
- Sport page passes `toLocaleDateString("en-AU")` into `formatRelativeTime`, which then returns `NaN hours ago`

### Code pointers
- `apps/nine/src/pages/Sport.tsx` — DEMO BUG comments
- `apps/nine/src/data/articles.ts` — `getSportArticlesBuggyLatest()`
- Unit test documents the inverted sort: `apps/nine/src/test/data-auth.test.ts`

### Suggested fix
1. Delete `getSportArticlesBuggyLatest` and use `getByPillar("sport")`
2. Pass `article.publishedAt` (ISO) to `formatRelativeTime` / drop `timeLabel` override
3. Update the Sport page test to assert correct relative times (not NaN)
