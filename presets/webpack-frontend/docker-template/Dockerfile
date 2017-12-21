FROM mhart/alpine-node:8

WORKDIR /app
COPY . .

RUN npm i --production

EXPOSE 8080
CMD ["npm", "start"]
