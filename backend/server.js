require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(" Connecté à MongoDB"))
  .catch(err => console.error(" Erreur MongoDB :", err));

// Routes
const interactionsRoutes = require("./routes/interactions");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");

app.use("/interactions", interactionsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
    console.log('test pourrrrrr le nouveau workflow Github Act ');
});
