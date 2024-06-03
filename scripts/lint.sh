#!/usr/bin/env zsh
cd "${0%/*}/.." || exit;
npx eslint . --fix;
npx jshint ./*.js ./*.mjs;
exit 0;
