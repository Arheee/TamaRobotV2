const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend prêt sur http://api.tamarobot.localhost (via Traefik)`);
});
