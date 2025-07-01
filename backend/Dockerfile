FROM node:24.3.0

WORKDIR /app

# Mise à jour de libxml2 pour corriger la faille Snyk
RUN apt-get update && apt-get install -y libxml2 libxml2-dev

COPY package*.json ./
RUN npm install
COPY .env .env

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
