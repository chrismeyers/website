#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

docker stop chrismeyers-website
docker rm chrismeyers-website
docker run \
    "$@" \
    -p 8080:80 \
    --log-opt max-size=25m \
    --log-opt max-file=2 \
    --name chrismeyers-website \
    --rm \
    chrismeyers-website

popd > /dev/null 2>&1
