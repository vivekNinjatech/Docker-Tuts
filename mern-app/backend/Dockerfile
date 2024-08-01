FROM node:lts-alpine3.20

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3003

CMD [ "npm", "start" ]