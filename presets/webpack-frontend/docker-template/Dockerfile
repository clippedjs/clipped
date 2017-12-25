FROM mhart/alpine-node:8
LABEL maintainer="newman.kcchow@gmail.com"

WORKDIR /app
COPY . .

RUN npm i --production

EXPOSE 8080
CMD ["npm", "start"]
