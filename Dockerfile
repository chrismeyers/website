FROM node:22.11.0-alpine AS builder

RUN apk add --no-cache bash

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

FROM nginx:mainline-alpine-slim

WORKDIR /app

COPY --from=builder /app/build .
COPY config/docker/nginx.conf /etc/nginx/nginx.conf
