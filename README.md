# website
[![Actions Status](https://github.com/chrismeyers/website/actions/workflows/website.yml/badge.svg)](https://github.com/chrismeyers/website/actions/workflows/website.yml)

This is the codebase for my personal website currently located at [https://chrismeyers.net](https://chrismeyers.net)

## Setup
1. Install Node.js (see [nvm](https://github.com/nvm-sh/nvm) or [nodejs.org](https://nodejs.org/en/download))
1. Quick Start:
    ```sh
    $ npm install
    $ npm run generate # Needs to be run whenever the resume is updated
    $ npm run dev
    ```

## Docker
### Build
```sh
# Additional docker build arguments can be passed through such as:
#   --no-cache (do not use cache when building image)
$ bin/docker/build.sh
```

### Run
```sh
# Additional docker run arguments can be passed through such as:
#   -d (detached - run container in background)
$ bin/docker/run.sh
```

## Deployment
This site is hosted on Vercel and [automatically deploys via GitHub Actions](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel) when pushing or merging to the `main` branch. Including `[deploy skip]` or `[skip deploy]` in the HEAD commit message will skip the deploy job.

## Credit
The site uses several open source libraries and frameworks. See `package.json` for the full list.
