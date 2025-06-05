const express = require("express");
const router = express.Router();
const { getAllAdminUsers } = require("../models/admin.model");

router.get("/", async (req, res) => {
  try {
    const rows = await getAllAdminUsers();
    res.json(rows);
  } catch (err) {
    console.error("Erreur admin :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;