---
name: tdd-multiagent
description: >-
  Use subagents. Runs TDD with two subagents: test-writer then implementer.
  Requires an IDE Composer chat so Task goes through TaskToolCallHandler and
  the Atlassian unit-test hooks fire. Skip in CLI / agent-exec. Skip when the
  test path is unclear, expensive, or not requested.
disable-model-invocation: true
---

# TDD multiagent

Use subagents. The parent directs the work. The parent does not write tests. The parent does not write production code.

## Runtime

Hooks must fire. This skill is valid only in an **IDE Composer** chat, where Task goes through `TaskToolCallHandler`.

Do not run this skill from CLI or agent-exec. Those hosts spawn subagents and do not request `subagentStart` / `subagentStop`. If you are in that host, stop. Tell the user to open a new Composer chat in the IDE, attach this skill, and run the loop there.

Proof after every writer or implementer Task:

1. last-run `trigger: hook` and `hook_event_name: subagentStop` (start writes the snapshot, stop writes last-run)
2. The IDE hook log has `Hook step requested: subagentStart` (and `subagentStop` after the child finishes)

If last-run is missing, `generated` is older than the Task, or `trigger` is `parent`, the hook did not run. Stop. Do not pipe the scripts to invent evidence. Do not continue the loop.

A Shell pipe of the hook scripts is not a subagent and is not a hook fire. Do not pipe.

## Loop

Spawn each step as a subagent. Writer is `subagent_type: "test-writer"`. Implementer is `subagent_type: "implementer"`. An edit in this chat is not a subagent.

`test-writer` writes the failing test. `implementer` changes production code. Cursor `subagentStop` runs the Atlassian Vitest suite and writes `.cursor/hooks/last-run.md`.

`hooks.json` registers `subagentStart` / `subagentStop` with matcher `implementer|test-writer`. Do not add `preToolUse` / `postToolUse` on `Task`. Those fire for every Task and force duplicate-stop machinery. Scripts no-op unless `subagent_type` is `implementer` or `test-writer`.

Do not wait for a hook follow-up in this chat. `subagentStop` follow-ups go to the subagent and the IDE often discards them. last-run with `trigger: hook` is the evidence.

The stop hook does not trust Cursor `modified_files`.

Do not force a test when the cost is high. If the test needs a large harness, brittle mocks, slow end-to-end work, or production-only state, say that first. Then use the nearest useful check.

## Words

Use these words with one meaning:

| Word | Meaning |
| --- | --- |
| red | The new test failed for the intended reason |
| green | The new test passed after the fix |
| hook | A Cursor-invoked start/stop event (`trigger: hook` on last-run) |
| writer | A subagent with `subagent_type: "test-writer"` |
| implementer | A subagent with `subagent_type: "implementer"` |
| failure | A suite or assertion that did not pass |
| last-run | `.cursor/hooks/last-run.md` |

Do not use "fail" as a noun. The noun is "failure". Do not call a parent pipe a hook.

## Procedure

1. If this chat is CLI or agent-exec, stop. Ask for an IDE Composer chat.
2. Name the intended behavior, the current behavior, the production file path, and the smallest observable case.
3. Start a todo list. Track writer, red, implementer, and green.
4. Confirm the suite is green before you spawn the writer. If last-run is missing or stale, run `apps/atlassian/node_modules/.bin/vitest run` one time (do not assume a global pnpm). If that run failed, stop and report. Do not start the loop.
5. Use a subagent. Spawn the writer with `subagent_type: "test-writer"`. Give the intended behavior and the production file path. Do not give a production patch. Do not write the test in the parent.
6. When that subagent returns, read last-run. Require `trigger: hook` and `reason: writer_red`. The FAIL line must name the writer's test file. If `trigger` is not `hook`, stop and report that hooks did not fire.
7. If `parent_next` is `spawn_writer`, spawn the writer again. Do not spawn the implementer.
8. If `parent_next` is `spawn_implementer`, spawn the implementer with `subagent_type: "implementer"`. Give the test path, the failure, and the intended behavior. Do not write production code in the parent. Do not pipe the start script.
9. When that subagent returns, read last-run. Require `trigger: hook` and `reason: implementer_green`.
10. If the failure is inside the test file (syntax, import, or fixture), spawn the writer with the error. That is not an implementer retry.
11. If `reason` is `implementer_red` or `implementer_changed_tests`, spawn the implementer again. Do not edit the test to hide the failure.
12. Retry each subagent at most two times. Then stop and report.
13. If the change has broader risk, say which nearby check you still need. Do not invent extra coverage.

## If a failing test is not practical

Do not skip in silence. Before a fix, say why a failing test is not worth the cost. Then name the nearest executable check.

Prefer no new test over a bad test. A bad test mostly tests mocks, copies the current code, depends on time or global state, or needs expensive infrastructure for a small fix.

## Guardrails

- Do not change a test so that it matches wrong code.
- Do not weaken an assertion unless the expected behavior changed and the reason is clear.
- Keep the new test on the bug. Do not expand fixtures for coverage.
- If the bug is flaky, make the test deterministic when you can. Name the signal that you lock.
- If the bug shows a class of failures, land the focused test first.
- If last-run says the implementer changed a test file, revert that change. Do not treat the run as green.

## Final reply

Quote `trigger` and `hook_event_name` from both last-run files (writer stop and implementer stop). If either is `trigger: parent`, or last-run is missing, the run has no hook evidence. Say that. Do not continue.

Also report:

- The test path and the red failure.
- The green run after the fix.
- The hook-log line `Hook step requested: subagentStart` if you have it.
- If you have no red-before evidence, say why and name the check that you used.
