FROM node:12

WORKDIR /usr/app/frontend

COPY package*.json ./

RUN npm i
COPY . .

CMD ["npm", "run", "serve"]
