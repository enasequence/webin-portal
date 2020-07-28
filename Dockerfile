#Building
FROM node:12.7-alpine AS build
WORKDIR /usr/src/webin-portal
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Running
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/webin-portal/dist/webin-portal /usr/share/nginx/html


