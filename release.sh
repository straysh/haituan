#!/usr/bin/env bash

git pull && \
yarn install && \
yarn build --release && \
cd build && \
cp ../ecosystem.config.js . && \
pm2 reload 0