#!/usr/bin/env bash
# Run the unit suite under several timezones.
#
# Transactions, articles and customer records are date-only `YYYY-MM-DD` values, and a
# UTC-only run cannot see the bugs that class of value attracts: mixing UTC and local
# handling is correct exactly at UTC+0 and wrong either side of it. The extremes are
# included because Kiritimati is UTC+14 and Midway is UTC-11.
set -euo pipefail

cd "$(dirname "$0")/.."

for tz in UTC Australia/Sydney America/Los_Angeles Asia/Kolkata Pacific/Kiritimati Pacific/Midway; do
  echo "── TZ=$tz"
  TZ="$tz" pnpm exec vitest run --reporter dot
done

echo "All timezones passed."
