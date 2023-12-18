FROM node:21-alpine3.17 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm i 

COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

EXPOSE 4000
CMD ["npm", "start"]