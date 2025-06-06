const express = require("express");
const router = express.Router();
const {
  trouverUtilisateurAvecTama,
  mettreAJourDerniereConnexion
} = require("../models/loginModel");

router.post("/", async (req, res) => {
  const { nom_utilisateur, mot_de_passe } = req.body;

  if (!nom_utilisateur || !mot_de_passe) {
    return res.status(400).json({ error: "Champs requis manquants." });
  }

  try {
    const utilisateur = await trouverUtilisateurAvecTama(nom_utilisateur, mot_de_passe);

    if (!utilisateur) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const dejaConnecte = utilisateur.derniere_connexion !== null;

    await mettreAJourDerniereConnexion(utilisateur.id);

    res.json({
      message: "Connexion réussie",
      utilisateur: utilisateur.nom_utilisateur,
      tamabot: utilisateur.nom_tama,
      dejaConnecte
    });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;