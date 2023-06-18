FROM node:18

WORKDIR /Users/Isadora/api

COPY package*.json ./
RUN npm install


COPY . .

EXPOSE 3000

CMD ["npm","start"] 