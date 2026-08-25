#!/usr/bin/env bash
set -euo pipefail

URL="${VERIFY_JSM_URL:-http://localhost:5183}"
URL="${URL%/}/"
LOGIN="${URL}login?portal=jsm"

echo "doctor: GET $URL"
code="$(curl -sS -o /tmp/verify-jsm-doctor.html -w '%{http_code}' "$URL")"
if [[ "$code" != "200" ]]; then
  echo "doctor: fail HTTP $code" >&2
  exit 1
fi
if ! grep -q 'Atlassian (Demo)' /tmp/verify-jsm-doctor.html; then
  echo "doctor: fail — response is not the Atlassian demo (missing 'Atlassian (Demo)')" >&2
  exit 1
fi

echo "doctor: GET $LOGIN"
login_code="$(curl -sS -o /tmp/verify-jsm-login.html -w '%{http_code}' "$LOGIN")"
if [[ "$login_code" != "200" ]]; then
  echo "doctor: fail login HTTP $login_code" >&2
  exit 1
fi
echo "doctor: login shell HTTP $login_code (heading is client-rendered; drive checks it)"

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

echo "doctor: ok — Jira Service Management portal is answering at $URL"
