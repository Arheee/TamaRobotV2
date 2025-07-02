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

## Technologies utilisées
1. Frontend
HTML / CSS avec un style borne d’arcade rétro

JavaScript Vanilla : gestion du DOM, effets visuels dynamiques, modales interactives

2.  Backend
Node.js avec Express pour les routes API, la logique métier et les contrôles de sécurité

3.  Bases de données
MySQL : stockage des utilisateurs et de leur TamaRobot

MongoDB : gestion des logs, sessions, et historique d’interactions

4.  Outils & DevOps
Docker & Docker Compose : conteneurisation du backend, des bases de données et des outils

Traefik : reverse proxy + routage dynamique des conteneurs

SonarQube : analyse de qualité de code (bugs, duplications, couverture de test)

Snyk : détection automatique de vulnérabilités dans les dépendances Node.js

5.  Tests
Jest pour les tests unitaires

Thunder Client (VS Code) pour les tests d’API

GitHub Actions : pipeline CI/CD automatisée avec tests, sécurité, qualité et build Docker

## Lancer le projet
1. Cloner le repo et démarrer les services

docker compose up --build

 2. Faire les entrées DNS sur le fichier host

vous pouvez ensuite lancer l'application sur Tamarobot.localhost

3. Utiliser un compte de test ou créer un compte
Nom d’utilisateur : alice
Mot de passe : azerty123


Arheee 
