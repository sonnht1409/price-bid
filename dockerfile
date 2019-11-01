FROM node:10.17-alpine as builder
WORKDIR /bid-price
RUN pwd
COPY . .
RUN npm install --production
RUN npm run build
EXPOSE 5000
ENTRYPOINT [ "npm","run","production" ]