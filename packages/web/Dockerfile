FROM node:16.9.1-slim as build-stage

WORKDIR /app
COPY .yarn/ ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/web/package.json ./packages/web/
RUN yarn workspaces focus web > /dev/null 2>&1
COPY packages/web/ ./packages/web/
RUN yarn workspace web build

FROM nginx:1.21.3 as production-stage

RUN mkdir /app
COPY --from=build-stage /app/packages/web/build /app
COPY packages/web/nginx.conf /etc/nginx/nginx.conf
