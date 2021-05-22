FROM node:15.14.0-alpine3.10

WORKDIR /usr/app/back

COPY ./package-*.json .

RUN npm i

COPY . .

RUN npm run dev:start