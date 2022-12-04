FROM node:16.16.0-alpine3.16 
WORKDIR /opt/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN yarn global add serve
COPY . .
RUN yarn run build
CMD serve -s build -p 3500