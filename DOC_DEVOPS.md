# Documentation technique – Outils DevOps utilisés (Tamarobot)

## Docker & Docker Compose 🐳🐋

Le projet est entièrement conteneurisé avec Docker :
- `backend` : Express.js (API REST)
- `mysql` : base relationnelle avec injection d’un script `init.sql`
- `mongo` : base NoSQL MongoDB

### Démarrer le projet
```bash
docker compose up --build
```

## Tests automatisés – Jest

Un test unitaire a été mis en place dans `backend/tests/interaction.test.js`, pour vérifier la structure des interactions envoyées au backend.

### Exécution manuelle :
```bash
cd backend
npm install
npm test
```

### Exemple de test :
```js
expect(validateInteraction({ type: "boire", reponse: "slurp" })).toBe(true);
```

## Intégration continue – GitHub Actions

Un workflow `test.yml` a été ajouté dans `.github/workflows` :
- Lancement automatique des tests Jest à chaque `push`
- Résultat consultable dans l'onglet **Actions** du dépôt


## Environnement – `.env`

Le backend utilise un fichier `.env` pour centraliser la configuration :
- Connexion MySQL
- Connexion MongoDB
- Port du serveur

