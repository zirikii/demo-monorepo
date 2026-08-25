#!/bin/bash
# Snapshot dirty apps/atlassian files when test-writer or implementer starts.
# hooks.json matcher is implementer|test-writer; the script also no-ops otherwise.
set -u
export PATH="/opt/homebrew/bin:/usr/local/bin:${PATH:-}"
command -v node >/dev/null 2>&1 || exit 0
exec node "$(cd "$(dirname "$0")" && pwd)/atlassian-tdd.mjs" start
