FROM node:24.3.0-bookworm-slim

WORKDIR /app

# Correction vulnérabilité snyk et nettoyage pour image allégée
RUN apt-get update && apt-get install -y libxml2 libxml2-dev &&\ rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
COPY .env .env

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
