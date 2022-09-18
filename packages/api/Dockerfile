FROM node:18.9.0-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN mkdir -p packages/api/

COPY packages/api/package.json ./packages/api/

RUN npm ci --production --workspace=api

COPY resume/ ./resume
COPY packages/api/src/ ./packages/api/src/
COPY packages/api/.env ./packages/api/

WORKDIR /app/packages/api

EXPOSE 8888
CMD [ "node", "src/server.js" ]
