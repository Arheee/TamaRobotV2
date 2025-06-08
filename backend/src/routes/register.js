const express = require("express");
const router = express.Router();
const {
  verifierUtilisateurExiste,
  creerUtilisateur,
  creerTamarobot
} = require("../models/registerModel");

router.get("/", (req, res) => {
  res.send("Route register OK");
});

router.post("/", async (req, res) => {
  const { nom_utilisateur, mot_de_passe, nom_tama, t_pot } = req.body;

  //Honeypot
  if(t_pot){
    return res.status(403).json({error: "Accès refusé"});
  }

  if (!nom_utilisateur || !mot_de_passe || !nom_tama) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    const existe = await verifierUtilisateurExiste(nom_utilisateur);
    if (existe) {
      return res.status(400).json({ error: "Nom d'utilisateur déjà pris" });
    }

    const utilisateur_id = await creerUtilisateur(nom_utilisateur, mot_de_passe);
    await creerTamarobot(nom_tama, utilisateur_id);

    res.status(201).json({ message: "Tamarobot créé avec succès !" });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;