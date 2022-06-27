FROM node:16.15.1-slim

WORKDIR /app

RUN npm install --location=global pnpm@7.3.0

COPY pnpm-lock.yaml packages/api/package.json ./

RUN pnpm install --prod

COPY resume/ ./resume
COPY packages/api/ ./packages/api/

WORKDIR /app/packages/api

EXPOSE 8888
CMD [ "node", "src/server.js" ]
