FROM node:18.8.0-slim as builder

WORKDIR /app

RUN npm install --location=global pnpm@7.9.5

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./

RUN mkdir -p packages/web/

COPY packages/web/package.json ./packages/web/

RUN pnpm --filter web install --frozen-lockfile

COPY packages/web/ ./packages/web/

RUN pnpm --filter web build

FROM nginx:1.23.1

RUN mkdir /app
COPY --from=builder /app/packages/web/build /app
COPY packages/web/nginx.conf /etc/nginx/nginx.conf
