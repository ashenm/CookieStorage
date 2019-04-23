#!/usr/bin/env sh
# Generate SHA-384 Digests

openssl dgst -binary -sha384 build/CookieStorage.js \
  | openssl base64 > build/CookieStorage.js.sha384

openssl dgst -binary -sha384 build/CookieStorage.min.js \
  | openssl base64 > build/CookieStorage.min.js.sha384
