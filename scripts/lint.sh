#!/usr/bin/env zsh
cd "${0%/*}/.." || exit;
npx eslint;
exit 0;
