### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /mnt/c/users/dgupta/05_ENA_WEBIN_PORTAL/webin-portal
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /mnt/c/users/dgupta/05_ENA_WEBIN_PORTAL/webin-portal/dist/webin-portal /usr/share/nginx/html
