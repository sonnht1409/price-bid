FROM node:10.16.3-alpine
WORKDIR /bid-price
RUN pwd
COPY . .
RUN npm install --production
RUN npm run build
EXPOSE 5000
ENTRYPOINT [ "npm","run","production" ]