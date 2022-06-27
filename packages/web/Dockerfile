FROM node:16.15.1-slim as builder

WORKDIR /app

RUN npm install --location=global pnpm@7.3.0

COPY pnpm-lock.yaml packages/web/package.json .npmrc ./

RUN pnpm install

COPY packages/web/ ./packages/web/

WORKDIR /app/packages/web

# TODO: The build step is currently unable to find react-scripts
RUN pnpm build

FROM nginx:1.21.6

RUN mkdir /app
COPY --from=builder /app/packages/web/build /app
COPY packages/web/nginx.conf /etc/nginx/nginx.conf
