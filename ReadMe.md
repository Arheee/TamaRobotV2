 Tamarobot – Mini Jeu Web Inspiré des Tamagotchis
Bienvenue sur Tamarobot, un mini-jeu rétro interactif inspiré des tamagotchis.
Ce projet mêle authentification utilisateur, animations frontend, base de données SQL & NoSQL, et architecture en conteneurs.
Il est conçu pour être à la fois ludique et technique.

🧩 Fonctionnalités
🧑‍💻 Création de compte & Connexion (MySQL)

🤖 Création et gestion de ton Tamarobot personnalisé

🕹️ Interface arcade animée et interactive

🕓 Historique des interactions (stocké par session dans MongoDB)

🔐 En cours: Mode admin pour voir les utilisateurs et leurs robots

🐳 Déploiement complet via Docker Compose

🛠️ Technologies
Frontend
HTML / CSS (style borne arcade)

JavaScript Vanilla (DOM, effets visuels, modales)

Backend
Node.js + Express


Bases de données
MySQL (utilisateurs, tamarobots)

MongoDB (logs d'interactions, sessions)

Outils et DevOps
Docker & Docker Compose

Live Server pour le frontend

Postman pour les tests API

Sonarcube

🧪 Tests
Tests manuels avec Postman (CRUD utilisateurs et robots)

Historique affiché par session via modale

Authentification testée avec bcrypt (hashage des mots de passe)

Prévu : ajout de tests automatisés avec Jest

🚀 Lancer le projet
1. Cloner le repo et démarrer les services

docker compose up --build
vous pouvez ensuite lancer l'application sur port 80

2. Sans docker : Ouvrir le frontend
Clic droit sur index.html → "Open with Live Server"

3. Utiliser un compte de test
Nom d’utilisateur : alice

Mot de passe : azerty123

🔒 En cours: Accès admin
L'admin ne joue pas : il accède à une page dédiée (admin.html)

Cette page liste les utilisateurs, leurs tamarobots et dernières connexions (via MySQL)


Arheee 
