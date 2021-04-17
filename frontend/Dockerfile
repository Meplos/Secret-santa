FROM node:15.14.0-alpine3.10

WORKDIR /usr/app/frontend

COPY ./package-*.json .

RUN npm i

COPY . .

RUN npm run serve