FROM node:16.14.2-slim as builder

WORKDIR /app
COPY .yarn/ ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/web/package.json ./packages/web/
RUN yarn workspaces focus web > /dev/null
COPY packages/web/ ./packages/web/
RUN yarn workspace web build

FROM nginx:1.21.6

RUN mkdir /app
COPY --from=builder /app/packages/web/build /app
COPY packages/web/nginx.conf /etc/nginx/nginx.conf
