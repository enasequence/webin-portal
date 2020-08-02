#Building
#FROM node:12.7-alpine AS build
#WORKDIR /usr/src/webin-portal
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build

# Running
#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/webin-portal/dist/webin-portal /usr/share/nginx/html
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend


FROM node:12.7-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

