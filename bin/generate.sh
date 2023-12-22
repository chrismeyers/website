#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

(
  cd ..

  printf "Generating resume module..."
  node bin/node/resume-parser.mjs resume/LaTeX/Meyers_Chris/Meyers_Chris_Resume.tex src/assets/generated/resume.js
  printf "done\n"
)

popd > /dev/null 2>&1
