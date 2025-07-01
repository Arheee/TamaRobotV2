const app = require("./app"); // importe l'app Express and le app

const PORT = process.env.PORT || 3000;

// On lance le serveur et attache à toutes les interfaces réseau (0000 est necessaire pour docker)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend prêt sur http://api.tamarobot.localhost (via Traefik)`);
});
