FROM node:20.12.2-alpine AS builder

RUN apk add --no-cache bash

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

FROM nginx:1.25.5-alpine-slim

WORKDIR /app

COPY --from=builder /app/build .
COPY config/docker/nginx.conf /etc/nginx/nginx.conf
