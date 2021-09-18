# website
[![Actions Status](https://github.com/chrismeyers/website/actions/workflows/api.yml/badge.svg)](https://github.com/chrismeyers/website/actions/workflows/api.yml) [![Actions Status](https://github.com/chrismeyers/website/actions/workflows/web.yml/badge.svg)](https://github.com/chrismeyers/website/actions/workflows/web.yml)

This is the codebase for my personal website currently located at [https://chrismeyers.net](https://chrismeyers.net)

## Setup
### Local
1. Install Node.js (see [nvm](https://github.com/nvm-sh/nvm) or [nodejs.org](https://nodejs.org/en/download/current))
1. Install [Yarn](https://yarnpkg.com/) (via npm or Homebrew)
1. Copy [bin/git/hooks/pre-commit](bin/git/hooks/pre-commit) to the local `.git/hooks` directory and ensure the script is executable
1. Run `yarn` from the root of the repository to install dependencies for all packages
1. Follow the instructions in [packages/api/README.md](packages/api/README.md)
1. Follow the instructions in [packages/web/README.md](packages/web/README.md)

### Server
1. Install Git
1. Install Docker
1. Install Nginx or Apache
1. Setup a Git remote by following the instructions in [bin/git/hooks/post-receive](bin/git/hooks/post-receive)
1. Configure a reverse proxy (assuming Debian based server):
    - **Nginx**: Copy files from [config/nginx](config/nginx) to `/etc/nginx/sites-available` and symlink each file to `/etc/nginx/sites-enabled`
    - **Apache**: Copy files from [config/apache](config/apache) to `/etc/apache2/sites-available` and run `a2ensite` for each virtual host (disable virtual host with `a2dissite`)
1. Install and configure LetsEncrypt/Certbot:
    + Add a `deploy-hook` to `/etc/letsencrypt/cli.ini` to reload proxy server after certificate update ([more info](https://blog.arnonerba.com/2019/01/lets-encrypt-how-to-automatically-restart-nginx-with-certbot))
        - **Nginx**: `deploy-hook = systemctl reload nginx`
        - **Apache**: `deploy-hook = systemctl reload apache2`

## Workspaces
This project is a monorepo and uses [Yarn workspaces](https://yarnpkg.com/features/workspaces) to manage multiple packages. The `yarn workspace` (see [here](https://yarnpkg.com/cli/workspace) for usage) and `yarn workspaces` (see starting [here](https://yarnpkg.com/cli/workspaces/focus) for usage) commands are available from the root of the repository.

## Docker
### Build
```sh
# Additional docker build arguments can be passed through such as:
#   --no-cache (do not use cache when building image)
$ bin/docker/<package>/build.sh
```

### Run
```sh
# Additional docker run arguments can be passed through such as:
#   -d (detached - run container in background)
$ bin/docker/<package>/run.sh
```

## Deployment
Create a new Git remote locally that points to the location on the server described in the Setup section above:
```sh
$ git remote add <name> ssh://<username>@<ip>/path/to/repo.git
```
The above command assumes an entry exists in `~/.ssh/config` for `<username>` and `<ip>`

If the newly created Git remote was named `production`, the following command can be run from the root of the repository to deploy:
```sh
$ git push production main
```

## Credit
+ The site uses several open source libraries and frameworks, including:
  + [React](https://reactjs.org) as a frontend JavaScript framework
    - [react-router](https://reactrouter.com) for SPA routing
    - [simple-react-lightbox](https://simple-react-lightbox.dev) to make viewing images a lot more pleasant
    - [react-toastify](https://fkhadra.github.io/react-toastify/introduction) to raise toast notifications
    - [react-switch](https://github.com/markusenglund/react-switch) to toggle themes
    - [react-device-detect](https://github.com/duskload/react-device-detect) to determine browser/device capabilities
    - [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) for loading animations
    - [delayed-scroll-restoration-polyfill](https://github.com/janpaul123/delayed-scroll-restoration-polyfill) to restore scroll location on browser back and forward navigation
  - [hamburgers](https://jonsuh.com/hamburgers/) to animate the hamburger menu icon
  - [Fastify](https://www.fastify.io/) as a backend API framework
