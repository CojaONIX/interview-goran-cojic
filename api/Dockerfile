
# backend

FROM node:16

RUN mkdir -p /srv/api

WORKDIR /srv/api

COPY index.js .
COPY package.json .

RUN npm install

EXPOSE 3001
CMD npm run start



