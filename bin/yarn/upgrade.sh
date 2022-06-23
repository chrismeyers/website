#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

(
    cd ../..
    yarn set version latest
    yarn plugin import interactive-tools
    yarn plugin import workspace-tools
)

popd > /dev/null 2>&1
