#!/usr/bin/env zsh
cd "${0%/*}/.." || exit;
jsdoc . -c ./.jsdoc/conf.json;
for file in ./docs/**/*\&period\;*.html;
do
  mv "$file" "${file//\&period\;/.}";
done;
exit 0;
