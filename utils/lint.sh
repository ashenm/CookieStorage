#!/usr/bin/env sh
# Lint CookieStorage Source

set -e

curl --silent \
  --show-error \
  --location \
  --output .eslintrc.json \
  --url https://gist.githubusercontent.com/ashenm/537a91f9c864d6ef6180790d9076047d/raw/eslintrc.json

eslint src test
