# Jira ticket — DR-23

> Live: https://fe-anysphere-demo.atlassian.net/browse/DR-23
> Board: https://fe-anysphere-demo.atlassian.net/jira/software/projects/DR/boards/877
> Column: **To Do**
> Labels: **hub-24**, **agent-risk:low**

## Summary
AdviserHUB Trading pre-trade CGT estimate omits the 50% discount (≈2× too high)

## Type
Task

## Labels
`hub-24`, `agent-risk:low`

## Description
On the HUB24 website demo (`apps/hub24`), AdviserHUB Trading at `/adviserhub/trading` has an intentional-but-shipped defect for agent / Bugbot demos that should be fixed.

### Reproduce
1. Run `pnpm dev:hub24` and open http://localhost:5181/login?portal=adviser
2. Log in with `adviser@hub24.com.au` / `platform2026`
3. Open **Trading** (`/adviserhub/trading`)
4. Leave Instruction as **Switch** and Amount as **50000**
5. Observe **Pre-trade tax estimate** shows **$2,340**
6. Confirm the helper copy still says “Assumes a 12% embedded gain, 50% CGT discount and a 39% marginal rate.”

### Expected
Estimate = amount × 12% × **50%** × 39% → for $50,000 that is **$1,170**.

### Actual
`estimateCgt()` computes `amount * 0.12 * 0.39` and skips the 50% CGT discount → **$2,340**.

### Code pointers
- `apps/hub24/src/pages/adviser/Trading.tsx` — `estimateCgt` with `DEMO BUG (intentional)` comments
- Unit test documents the overstatement: `apps/hub24/src/test/adviser.test.tsx`

### Suggested fix
1. Restore `* 0.5` in `estimateCgt` so the formula matches the UI copy
2. Update the trading Vitest to assert `$1,170` (correct) instead of documenting `$2,340`
