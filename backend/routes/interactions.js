const express = require("express");
const router = express.Router();
//Modèle Mongoose
const Interaction = require("../models/Interaction");

router.post("/", async (req, res) => {
    try {
        const interaction = new Interaction(req.body);
        //ici j'enregistre le doc dans la collection mongoDB
        const saved = await interaction.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const history = await Interaction.find().sort({ date: -1 }).limit(10);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
