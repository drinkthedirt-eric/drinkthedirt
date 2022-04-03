# syntax=docker/dockerfile:1

FROM node:12.18.1

RUN npm install --global nodemon

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .

RUN npm run generate

CMD ["npm", "start"]
