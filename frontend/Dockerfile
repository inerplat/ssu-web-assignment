# multistage build react with nginx
FROM node:16 as builder
WORKDIR /work

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21
WORKDIR /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /work/build .

CMD ["nginx", "-g", "daemon off;"]