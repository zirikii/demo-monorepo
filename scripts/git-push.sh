#!/usr/bin/env bash
#
# git-push.sh — push with an automatic Bitbucket auth fallback.
#
# Why this exists
# ---------------
# This repository is hosted on BOTH GitHub and Bitbucket. The Cursor cloud
# environment injects credentials into the *global* git config using GitHub's
# username convention:
#
#     [url "https://x-access-token:<token>@bitbucket.org/"]
#         insteadOf = https://bitbucket.org/
#         ...
#
# Bitbucket does not accept the "x-access-token" username — it requires
# "x-token-auth" (with the *same* token value). So a bare-URL push to a
# Bitbucket remote fails auth, even though the injected token is valid.
#
# What this does
# --------------
# 1. Runs `git push <args>` normally (works as-is for GitHub remotes).
# 2. If that fails AND `origin` points at bitbucket.org, it rewrites the local
#    `origin` URL to use `x-token-auth:<token>` — borrowing the token the
#    environment already injected — and retries the push.
#
# It is idempotent, prints no secrets, and is a no-op for non-Bitbucket remotes.
# Re-run it any time a push fails with "Authentication failed" against Bitbucket;
# it re-derives the current session's token each run (tokens rotate per session).
#
# Usage:
#   scripts/git-push.sh                       # e.g. push current branch
#   scripts/git-push.sh -u origin my-branch
#   scripts/git-push.sh --fix-only            # just repair the remote, don't push

set -euo pipefail

remote="origin"

fix_bitbucket_remote() {
  local url path token
  url="$(git remote get-url "$remote" 2>/dev/null || true)"

  case "$url" in
    *bitbucket.org*) ;;
    *)
      echo "[git-push] '$remote' is not a bitbucket.org remote; nothing to fix."
      return 1
      ;;
  esac

  # Borrow the environment-injected Bitbucket token from the global
  # x-access-token insteadOf rule (kept out of stdout).
  token="$(git config --get-regexp 'url\..*insteadof' 2>/dev/null \
    | grep 'x-access-token' | grep 'bitbucket.org' | head -1 \
    | sed -E 's#.*x-access-token:([^@]+)@.*#\1#')"

  if [ -z "${token:-}" ]; then
    echo "[git-push] No injected Bitbucket token found in global git config; cannot auto-fix."
    return 1
  fi

  # Strip any existing credentials/scheme, keep host + path.
  path="$(printf '%s' "$url" | sed -E 's#^https://[^@]*@#https://#; s#^https://##; s#^git@bitbucket.org:#bitbucket.org/#')"
  git remote set-url "$remote" "https://x-token-auth:${token}@${path}"
  echo "[git-push] Rewrote '$remote' to use Bitbucket's x-token-auth username."
  return 0
}

if [ "${1:-}" = "--fix-only" ]; then
  fix_bitbucket_remote
  exit $?
fi

if git push "$@"; then
  exit 0
fi

echo "[git-push] Push failed — attempting Bitbucket auth fallback..."
if fix_bitbucket_remote; then
  git push "$@"
else
  exit 1
fi
