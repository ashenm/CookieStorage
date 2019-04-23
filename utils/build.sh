#!/usr/bin/env sh
# Build CookieStorage

set -e

curl --silent \
  --show-error \
  --location \
  --request POST \
  --output /tmp/build.json \
  --data-urlencode "output_format=json" \
  --data-urlencode "output_info=errors" \
  --data-urlencode "output_info=compiled_code" \
  --data-urlencode "compilation_level=SIMPLE_OPTIMIZATIONS" \
  --data-urlencode "js_code@src/CookieStorage.js" \
  --url "https://closure-compiler.appspot.com/compile"

test `jq '.errors' "/tmp/build.json"` != "null" && \
  >&2 "ERROR Failed JavaScript Compilation" && \
  exit 1

mkdir --parent build && \
  cp --force src/CookieStorage.js build/CookieStorage.js

jq --raw-output '.compiledCode' "/tmp/build.json" \
  > build/CookieStorage.min.js
