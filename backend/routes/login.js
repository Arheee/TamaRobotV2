const express = require("express");
const router = express.Router();
const db = require("../mysql");

router.post("/", async (req, res) => {
    const { nom_utilisateur, mot_de_passe } = req.body;

    if (!nom_utilisateur || !mot_de_passe) {
        return res.status(400).json({ error: "Champs requis manquants." });
    }

    try {
        const [rows] = await db.execute(
            "SELECT u.id, u.nom_utilisateur, t.nom_tama FROM utilisateurs u JOIN tamarobots t ON u.id = t.utilisateur_id WHERE u.nom_utilisateur = ? AND u.mot_de_passe = ?",
            [nom_utilisateur, mot_de_passe]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: "Identifiants invalides." });
        }

        res.json({ message: "Connexion réussie", utilisateur: rows[0].nom_utilisateur, tamabot: rows[0].nom_tama });
    } catch (err) {
        console.error("Erreur login:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
