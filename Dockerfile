### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG configuration
ARG basePath
RUN node --max_old_space_size=15360 node_modules/@angular/cli/bin/ng build --configuration $configuration --base-href=$basePath

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/webin-portal /usr/share/nginx/html
ARG basePath
COPY --from=build /usr/src/app/dist/webin-portal /usr/share/nginx/html${basePath}