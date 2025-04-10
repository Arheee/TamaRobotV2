# Utilise Node.js officiel
FROM node:18

# Crée le dossier de travail
WORKDIR /app

# Copie les fichiers
COPY package*.json ./
RUN npm install

# Puis le reste du code
COPY . .

# Port exposé
EXPOSE 3000

# Commande de lancement
CMD ["node", "server.js"]
