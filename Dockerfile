FROM node:18.9.0-slim as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN mkdir -p packages/web/

COPY packages/web/package.json ./packages/web/

RUN npm ci --workspace=web

COPY packages/web/ ./packages/web/

RUN npm run build --workspace=web

FROM nginx:1.23.1

RUN mkdir /app
COPY --from=builder /app/packages/web/build /app
COPY packages/web/nginx.conf /etc/nginx/nginx.conf
