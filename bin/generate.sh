#!/usr/bin/env bash

# Move to the root of the repo
pushd "$(dirname "$0")/.." > /dev/null

rm -rf src/assets/generated
mkdir -p src/assets/generated

printf "Generating resume module..."
node bin/resume-parser.ts resume/LaTeX/Meyers_Chris/Meyers_Chris_Resume.tex src/assets/generated/resume.ts
printf "done\n"

popd > /dev/null
