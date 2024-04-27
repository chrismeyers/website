#!/usr/bin/env bash

# Move to the root of the repo
pushd "$(dirname "$0")/.." > /dev/null

printf "Generating resume module..."
node bin/node/resume-parser.js resume/LaTeX/Meyers_Chris/Meyers_Chris_Resume.tex src/assets/generated/resume.ts
printf "done\n"

popd > /dev/null
