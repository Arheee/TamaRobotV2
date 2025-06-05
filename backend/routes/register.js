const express = require("express");
const router = express.Router();
const db = require("../mysql");

//GET
router.get("/", (req, res) => {
  res.send("Route register OK");
});

// POST /register
router.post("/", async (req, res) => {
    const { nom_utilisateur, mot_de_passe, nom_tama } = req.body;

    if (!nom_utilisateur || !mot_de_passe || !nom_tama) {
        return res.status(400).json({ error: "Champs manquants" });
    }

    try {
        // Vérifie si l'utilisateur existe déjà
        const [exist] = await db.execute("SELECT * FROM utilisateurs WHERE nom_utilisateur = ?", [nom_utilisateur]);
        if (exist.length > 0) {
            return res.status(400).json({ error: "Nom d'utilisateur déjà pris" });
        }

        // Insére l'utilisateur
        const [result] = await db.execute(
            "INSERT INTO utilisateurs (nom_utilisateur, mot_de_passe) VALUES (?, ?)",
            [nom_utilisateur, mot_de_passe]
        );
        const utilisateur_id = result.insertId;

        // Insére le Tamarobot
        await db.execute(
            "INSERT INTO tamarobots (nom_tama, utilisateur_id) VALUES (?, ?)",
            [nom_tama, utilisateur_id]
        );

        res.status(201).json({ message: "Tamarobot créé avec succès !" });
    } catch (err) {
        console.error("Erreur lors de l'inscription :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
