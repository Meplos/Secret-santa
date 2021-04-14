FROM node:12

WORKDIR /usr/app/back

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]
