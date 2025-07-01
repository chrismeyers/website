# website

[![Actions Status](https://github.com/chrismeyers/website/actions/workflows/website.yml/badge.svg)](https://github.com/chrismeyers/website/actions/workflows/website.yml)

This is the codebase for my personal website currently located at [https://chrismeyers.net](https://chrismeyers.net).

## Setup

1. Install Node.js (see [fnm](https://github.com/Schniz/fnm) or [nodejs.org](https://nodejs.org/en/download))
1. Quick Start:
    ```sh
    $ npm install
    $ npm run generate # Needs to be run whenever the resume is updated
    $ cp .env.development .env.development.local # Update values
    $ npm run dev
    ```

## Docker

[Docker Compose](https://docs.docker.com/compose/) is used to run this project in a Docker container accessible at http://localhost:8080.
In general, the only command needed is:

```sh
$ docker compose up
```

Refer to the [Docker Compose CLI docs](https://docs.docker.com/reference/cli/docker/compose/) for more information.

## Deployment

This site is hosted on Vercel and [automatically deploys via GitHub Actions](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel) when pushing or merging to the `main` branch.
Including `[deploy skip]` or `[skip deploy]` in the HEAD commit message will skip the deploy job.
