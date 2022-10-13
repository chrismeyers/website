# website
[![Actions Status](https://github.com/chrismeyers/website/actions/workflows/website.yml/badge.svg)](https://github.com/chrismeyers/website/actions/workflows/website.yml)

This is the codebase for my personal website currently located at [https://chrismeyers.net](https://chrismeyers.net)

## Setup
### Local
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
    $ npm run dev            # Run development server
    $ npm run generate       # Generate required code
    $ npm run build          # Build for production
    $ npm run preview        # Run production preview (build is a prerequisite)
    $ npm test               # Run tests and exit
    $ npm run test:watch     # Run tests in watch mode
    $ npm run test:coverage  # Run tests, collect coverage, then exit
    $ npm run test:ci        # Run tests in CI mode
    $ npm run lint           # Report lint warnings and errors
    $ npm run lint:fix       # Attempt to fix lint warnings and errors
    ```

### Server
1. Install Git
1. Install Docker
1. Install Nginx or Apache
1. Setup a Git remote by following the instructions in [bin/git/hooks/post-receive](bin/git/hooks/post-receive)
1. Configure a reverse proxy (assuming Debian based server):
    - **Nginx**: Copy files from [config/reverseproxy/nginx](config/reverseproxy/nginx) to `/etc/nginx/sites-available` and symlink each file to `/etc/nginx/sites-enabled`
    - **Apache**: Copy files from [config/reverseproxy/apache](config/reverseproxy/apache) to `/etc/apache2/sites-available` and run `a2ensite` for each virtual host (disable virtual host with `a2dissite`)
1. Install and configure LetsEncrypt/Certbot:
    + Add a `deploy-hook` to `/etc/letsencrypt/cli.ini` to reload proxy server after certificate update ([more info](https://blog.arnonerba.com/2019/01/lets-encrypt-how-to-automatically-restart-nginx-with-certbot))
        - **Nginx**: `deploy-hook = systemctl reload nginx`
        - **Apache**: `deploy-hook = systemctl reload apache2`

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
The site uses several open source libraries and frameworks. See `package.json` for the full list.
