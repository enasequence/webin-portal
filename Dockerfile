### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG configuration
RUN node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --configuration $configuration --base-href=$context --deploy-url=$contect --build-arg

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/webin-portal /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/webin-portal /usr/share/nginx/html/ena/submit/webin
