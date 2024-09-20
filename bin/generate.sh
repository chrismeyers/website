#!/usr/bin/env bash

# Move to the root of the repo
pushd "$(dirname "$0")/.." > /dev/null

rm -rf src/assets/generated
mkdir -p src/assets/generated

printf "Generating resume module..."
node bin/node/resume-parser.js resume/LaTeX/Meyers_Chris/Meyers_Chris_Resume.tex src/assets/generated/resume.ts
printf "done\n"

printf "Generating pruned data module..."
node bin/node/prune-data.js src/assets/data.ts src/assets/generated/data.ts
printf "done\n"

popd > /dev/null
