FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:api"]
