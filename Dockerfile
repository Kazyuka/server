FROM node:carbon

RUN mkdir /app
WORKDIR /app
RUN npm install webpack -g
COPY package.json /app
RUN webpack
RUN npm install
COPY . /app
CMD node app.js

