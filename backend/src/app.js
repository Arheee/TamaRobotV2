require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS pour le frontend Traefik
// app.use(cors({
//   origin: "http://tamarobot.localhost",
//   credentials: true
// }));
app.use(cors({
  origin: "http://tamarobot.localhost", // l'origine exacte de ton frontend
  credentials: true
}));
// app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch(err => console.error("❌ Erreur MongoDB :", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use("/interactions", require("./routes/interactions"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

module.exports = app;
