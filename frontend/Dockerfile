
FROM node:14-alpine AS build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build 

FROM nginx:latest AS ngi
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx/nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80