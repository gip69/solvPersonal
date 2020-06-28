FROM nginx:stable-alpine

WORKDIR source/

COPY dist/solvPersonal/ /usr/share/nginx/html

