FROM node:22-slim AS build

COPY . /myapp

WORKDIR /myapp
RUN npm install --force
RUN npm run build 

FROM nginx:latest AS run
EXPOSE 80
COPY --from=build /myapp/dist/cicdapp /usr/share/nginx/html