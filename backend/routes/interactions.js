const express = require("express");
const router = express.Router();
const Interaction = require("../models/Interaction");

// POST
router.post("/", async (req, res) => {
    const { type, reponse, nom_utilisateur, session_id } = req.body;
    if (!type || !reponse || !nom_utilisateur || !session_id) {
        return res.status(400).json({ error: "Champs manquants" });
    }

    try {
        const interaction = new Interaction({ type, reponse, nom_utilisateur, session_id, date: new Date() });
        const saved = await interaction.save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET
router.get("/", async (req, res) => {
    const nom_utilisateur = req.query.user;
    if (!nom_utilisateur){
        return res.status(400).json({ error: "Nom utilisateur requis" });
    } 

    try {
        const interactions = await Interaction.find({ nom_utilisateur })
        .sort({ date: -1 })
        .limit(50);
        res.json(interactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
