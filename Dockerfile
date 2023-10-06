FROM node:18.18.0-alpine3.18

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3004

CMD ["npm", "start"]
