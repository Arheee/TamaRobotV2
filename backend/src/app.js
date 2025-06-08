require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connecté à MongoDB"))
.catch(err => console.error("Erreur MongoDB :", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, "../../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// Routes
app.use("/interactions", require("./routes/interactions"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

module.exports = app;