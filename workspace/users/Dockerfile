FROM  node:12-alpine

WORKDIR /app
COPY . /app

RUN yarn install

EXPOSE 3033

CMD [ "npm", "start" ]
