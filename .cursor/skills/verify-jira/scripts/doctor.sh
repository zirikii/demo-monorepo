#!/usr/bin/env bash
set -euo pipefail

URL="${VERIFY_JIRA_URL:-http://localhost:5183}"
URL="${URL%/}/"

echo "doctor: GET $URL"
code="$(curl -sS -o /tmp/verify-jira-doctor.html -w '%{http_code}' "$URL")"
if [[ "$code" != "200" ]]; then
  echo "doctor: fail HTTP $code" >&2
  exit 1
fi
if ! grep -q 'Atlassian (Demo)' /tmp/verify-jira-doctor.html; then
  echo "doctor: fail — response is not the Atlassian demo (missing 'Atlassian (Demo)')" >&2
  exit 1
fi

hostport="$(printf '%s' "$URL" | sed -E 's#^[a-zA-Z][a-zA-Z0-9+.-]*://([^/]+).*#\1#')"
host="${hostport%%:*}"
port="${hostport##*:}"
if [[ "$host" == "$port" ]]; then
  port="80"
fi

if [[ "$host" == "localhost" || "$host" == "127.0.0.1" ]]; then
  if ! lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "doctor: fail — nothing listening on $port" >&2
    exit 1
  fi
fi

echo "doctor: ok — Atlassian demo is answering at $URL"
