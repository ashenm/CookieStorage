#!/usr/bin/env sh
# Configure Build Environment

set -e

sudo apt-get update

sudo apt-get install --assume-yes --no-install-recommends \
  libx11-xcb-dev \
  libxcomposite-dev \
  libxcursor-dev \
  libxdamage-dev \
  libxi-dev \
  libxtst-dev \
  libnss3-dev \
  libcups2-dev \
  libxss-dev \
  libxrandr-dev \
  libasound2-dev \
  libpango1.0-dev \
  libatk1.0-dev \
  libatk-bridge2.0-dev \
  libgtk-3-dev \
  openssl \
  jq

npm install
