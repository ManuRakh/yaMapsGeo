FROM node:12

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
