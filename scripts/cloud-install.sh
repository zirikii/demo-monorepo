#!/usr/bin/env bash
# Locate the pnpm workspace root and install from there.
#
# Cursor Team Environments with multiple repos often run the install command
# from /agent (parent of repos/*). That directory is root-owned, so a bare
# `pnpm install` fails with:
#   EACCES: permission denied, open '/agent/_tmp_...'
# This script cd's into demo-monorepo first, regardless of the starting cwd.
set -euo pipefail

resolve_workspace_root() {
  if [[ -f pnpm-workspace.yaml ]]; then
    pwd
    return
  fi
  if [[ -f repos/demo-monorepo/pnpm-workspace.yaml ]]; then
    cd repos/demo-monorepo
    pwd
    return
  fi
  if [[ -f demo-monorepo/pnpm-workspace.yaml ]]; then
    cd demo-monorepo
    pwd
    return
  fi
  # Walk up from this script when invoked via an absolute/relative path.
  local script_dir
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  local repo_root
  repo_root="$(cd "${script_dir}/.." && pwd)"
  if [[ -f "${repo_root}/pnpm-workspace.yaml" ]]; then
    cd "${repo_root}"
    pwd
    return
  fi
  echo "cloud-install: could not locate demo-monorepo pnpm-workspace.yaml (cwd=$(pwd))" >&2
  exit 1
}

ROOT="$(resolve_workspace_root)"
cd "${ROOT}"
echo "cloud-install: pnpm install in ${ROOT}"
pnpm install
