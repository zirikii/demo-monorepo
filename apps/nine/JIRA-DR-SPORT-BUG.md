# Jira ticket draft — DR (bug) — resolved

> Originally tracked on https://fe-anysphere-demo.atlassian.net/jira/software/projects/DR/boards/877
> Label: **bug**

## Summary
Sport hub “Latest” sort is inverted and relative timestamps render as “NaN hours ago”

## Fix applied

- Sport Latest uses `getByPillar("sport")` (newest first). `getSportArticlesBuggyLatest` was removed.
- Story cards pass ISO `article.publishedAt` through `formatRelativeTime` (no locale-string override).
- Unit tests assert valid relative timestamps and newest-first sport order.
