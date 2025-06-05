//Chargement des variables d'environnement
require("dotenv").config();

// Import des modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connecté à MongoDB"))
.catch(err => console.error("Erreur MongoDB :", err));

// Middleware
app.use(cors());
app.use(express.json());

// Sert les fichiers statiques du dossier frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Import des routes
const interactionsRoutes = require("./routes/interactions");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");

// Utilisation des routes
app.use("/interactions", interactionsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});