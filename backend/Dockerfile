FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 3000

ENV DB_HOST=db \
    DB_USER=root \
    DB_PASSWORD=root \
    DB_NAME=yourdatabase

CMD ["npm", "start"]
