FROM node:12

WORKDIR /usr/app/back

COPY package*.json ./

RUN npm i
RUN npm i  nodemon

COPY . .

CMD ["npm", "run", "dev"]
