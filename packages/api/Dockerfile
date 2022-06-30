FROM node:16.15.1-slim

WORKDIR /app

RUN npm install --location=global pnpm@7.4.0

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./

RUN mkdir -p packages/api/

COPY packages/api/package.json ./packages/api/

RUN pnpm --filter api install --frozen-lockfile --prod

COPY resume/ ./resume
COPY packages/api/src/ ./packages/api/src/
COPY packages/api/.env ./packages/api/

WORKDIR /app/packages/api

EXPOSE 8888
CMD [ "node", "src/server.js" ]
