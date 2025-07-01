FROM node:24.3.0-bookworm-slim

# définit le répertoire
WORKDIR /app

# Correction vulnérabilité snyk et nettoyage pour image allégée
RUN apt-get update && apt-get install -y libxml2 libxml2-dev && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

# Copie le .env dans le conteneur pour fournir les variable d'env à mon back 
COPY .env .env

COPY . .

EXPOSE 3000

# lancement du conteneur , demarre l'app node en lancant le fichier server.js
CMD ["node", "src/server.js"]
