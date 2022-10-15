# website
[![Actions Status](https://github.com/chrismeyers/website/actions/workflows/website.yml/badge.svg)](https://github.com/chrismeyers/website/actions/workflows/website.yml)

This is the codebase for my personal website currently located at [https://chrismeyers.net](https://chrismeyers.net)

## Setup
1. Install Node.js (see [nvm](https://github.com/nvm-sh/nvm) or [nodejs.org](https://nodejs.org/en/download))
1. Quick Start:
    ```sh
    $ cp bin/git/hooks/pre-commit .git/hooks && chmod 755 .git/hooks/pre-commit
    $ npm install
    $ npm run generate # Needs to be run whenever the resume is updated
    $ npm run dev
    ```
1. The following scripts are available:
    ```sh
    $ npm run dev            # Starts development server
    $ npm run generate       # Generates required code
    $ npm run build          # Builds for production
    $ npm run preview        # Runs production preview (build is a prerequisite)
    $ npm test               # Runs tests and exits
    $ npm run test:watch     # Runs tests in watch mode
    $ npm run test:coverage  # Runs tests, collects coverage, then exits
    $ npm run test:ci        # Runs tests in CI mode
    $ npm run lint           # Reports lint warnings and errors
    $ npm run lint:fix       # Attempts to fix lint warnings and errors
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
This site is hosted on Vercel and automatically deploys when merging to `main` via GitHub Actions

## Credit
The site uses several open source libraries and frameworks. See `package.json` for the full list.
