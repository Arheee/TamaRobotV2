## Tamarobot – Mini Jeu Web Inspiré des Tamagotchis
Bienvenue sur Tamarobot, un mini-jeu rétro interactif inspiré des tamagotchis.
Ce projet mêle authentification utilisateur, animations frontend, base de données SQL & NoSQL, et architecture en conteneurs.
Il est conçu pour être à la fois ludique et technique.

## Fonctionnalités
🧑‍💻 Création de compte & Connexion (MySQL)

🤖 Création et gestion de ton Tamarobot personnalisé

🕹️ Interface arcade animée et interactive

🕓 Historique des interactions (stocké par session dans MongoDB)

🔐 En cours: Mode admin pour voir les utilisateurs et leurs robots

🐳 Déploiement complet via Docker Compose

🛤️ Sécurité de reverse proxy via Traefik

## Technologies
1.Frontend
HTML / CSS (style borne arcade)

JavaScript Vanilla (DOM, effets visuels, modales)

2.Backend

Node.js + Express


3.Bases de données

MySQL (utilisateurs, tamarobots)

MongoDB (logs d'interactions, sessions)

4.Outils et DevOps

Docker & Docker Compose

Live Server pour le frontend

Traefik

Sonarcube

5.Tests
Tests manuels avec Postman (CRUD utilisateurs et robots)

Test end to end avec Cypress


Historique affiché par session via modale

Authentification testée avec bcrypt (hashage des mots de passe)

Prévu : ajout de tests automatisés avec Jest

## Lancer le projet
1. Cloner le repo et démarrer les services

docker compose up --build

 2. Faire les entrées DNS sur le fichier host

vous pouvez ensuite lancer l'application sur Tamarobot.localhost

3. Utiliser un compte de test ou créer un compte
Nom d’utilisateur : alice
Mot de passe : azerty123


Arheee 
