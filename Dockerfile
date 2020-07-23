# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY nginx-custom.conf /etc/nginx/nginx.conf
COPY /dist/webin-portal /usr/share/nginx/html
