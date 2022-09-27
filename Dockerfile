FROM node:18.9.0-slim as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

FROM nginx:1.23.1

RUN mkdir /app
COPY --from=builder /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
