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
            `SELECT u.id, u.nom_utilisateur, u.derniere_connexion, t.nom_tama 
             FROM utilisateurs u 
             JOIN tamarobots t ON u.id = t.utilisateur_id 
             WHERE u.nom_utilisateur = ? AND u.mot_de_passe = ?`,
            [nom_utilisateur, mot_de_passe]
        );

        const utilisateur = rows[0];
        const dejaConnecte = utilisateur.derniere_connexion !== null;

        // Mettre à jour la date de dernière connexion
        await db.execute(
            "UPDATE utilisateurs SET derniere_connexion = NOW() WHERE id = ?",
            [utilisateur.id]
        );

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
