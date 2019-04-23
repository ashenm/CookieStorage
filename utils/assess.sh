#!/usr/bin/env sh
# Assess CookieStorage

node test/test.js "src/CookieStorage.js" && \
  node test/test.js "build/CookieStorage.min.js"
