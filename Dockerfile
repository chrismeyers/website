FROM node:18.17.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

FROM nginx:1.25.1-alpine-slim

WORKDIR /app

COPY --from=builder /app/build .
COPY config/docker/nginx.conf /etc/nginx/nginx.conf
