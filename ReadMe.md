# 🧠 Tamarobot - Mini jeu interactif

Bienvenue sur **Tamarobot**, un petit projet que j'ai réalisé pour moi et mon amour pour les tamagotchis

> But du jeu : interagir avec ton propre Tamarobot virtuel via une interface rétro stylée ✨

---

## 🔧 Technologies utilisées

- Frontend : HTML / CSS (style arcade) + JavaScript
- Backend : Node.js (Express)
- Bases de données :
  - 📦 **MongoDB** pour enregistrer les interactions du robot
  - 🗃️ **MySQL** pour gérer les utilisateurs et leurs robots
- Docker : pour lancer MongoDB, MySQL et le backend facilement

---

## 🚀 Fonctionnalités

- ✅ Effet d'écriture à l'écran (style borne d'arcade)
- ✅ Formulaire de **création de compte** avec nom utilisateur + robot
- ✅ Formulaire de **connexion**
- ✅ Lancement du jeu personnalisé : "Bienvenue Alice, ton Tamarobot est TamaZen"
- ✅ Boutons pour interagir : Bonjour / Manger / Boire / Chanter
- ✅ Les actions sont enregistrées dans MongoDB (affichables)
- ✅ Interface responsive et rétro grâce à la police `Press Start 2P`

---

## 📂 Structure du projet

```
TAMAROBOTV2/
├── backend/                ← Backend Node.js (Express)
│   ├── server.js
│   ├── routes/
│   │   ├── register.js
│   │   ├── login.js
│   │   └── interactions.js
│   └── mysql.js
├── mysql/
│   └── init.sql            ← Script MySQL pour créer des utilisateurs + robots
├── docker-compose.yml      ← Docker config (MongoDB + MySQL + backend)
```

Frontend (à part, lancé avec Live Server) :
```
tamarobot-frontend-auth-combo/
├── index.html
├── style.css
└── index.js
```

---

## 🧪 Compte test pour se connecter

| Utilisateur | Mot de passe | Tamarobot |
|-------------|--------------|------------|
| alice       | azerty123    | TamaZen    |
| bob         | password1    | TamaBoum   |

---

## ▶️ Lancer le projet

### 1. Lancer les services Docker
```bash
docker compose up --build
```

### 2. Lancer le frontend avec Live Server
- Clic droit sur `index.html` → "Open with Live Server"

---

## ✨ Et après ?

Tu peux facilement ajouter :
- Un système de sessions (JWT)
- Un système de sauvegarde automatique du robot
- Des niveaux, de la santé, etc.

---

## 👤 Auteur

Ce projet a été fait par **moi-même (Arheee)**  

Enjoy ! 🎮
