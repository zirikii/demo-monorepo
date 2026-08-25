#!/bin/bash
# Run the Atlassian Vitest suite when test-writer or implementer stops.
# last-run.md is parent evidence. stdout is followup_message for the subagent.
set -u
export PATH="/opt/homebrew/bin:/usr/local/bin:${PATH:-}"
if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' '{"followup_message":"The Atlassian unit-test hook did not run. node is not on PATH."}'
  exit 0
fi
exec node "$(cd "$(dirname "$0")" && pwd)/atlassian-tdd.mjs" stop
