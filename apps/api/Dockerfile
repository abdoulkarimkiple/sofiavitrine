FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/api/prisma apps/api/prisma

RUN npm ci
RUN npm run prisma:generate -w @sofia/api

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:api"]
