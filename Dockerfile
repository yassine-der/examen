
# FROM node:12-alpine
# WORKDIR /app
# COPY . .
# RUN yarn install --production
# CMD npm start
FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm start
EXPOSE 8888