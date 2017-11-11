# On the shoulder of giant
FROM daocloud.io/library/node:latest

MAINTAINER Heartsuit

RUN \
 DEBIAN_FRONTEND=noninteractive apt-get update && \
 DEBIAN_FRONTEND=noninteractive apt-get -y install tesseract-ocr && \

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

RUN npm install --only=production
# If you are building your code for production
# RUN npm install --registry=https://registry.npm.taobao.org

# Bundle app source
COPY . .

# Bind port and start
EXPOSE 8888
CMD [ "npm", "start" ]
