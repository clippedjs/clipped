FROM mhart/alpine-node:7

WORKDIR /app
COPY . .

RUN npm i --production

EXPOSE 8080
CMD ["node", "index.js"]
