const db = require("../mysql");

async function verifierUtilisateurExiste(nom_utilisateur) {
  const [rows] = await db.execute(
    "SELECT * FROM utilisateurs WHERE nom_utilisateur = ?",
    [nom_utilisateur]
  );
  return rows.length > 0;
}

async function creerUtilisateur(nom_utilisateur, mot_de_passe) {
  const [result] = await db.execute(
    "INSERT INTO utilisateurs (nom_utilisateur, mot_de_passe) VALUES (?, ?)",
    [nom_utilisateur, mot_de_passe]
  );
  return result.insertId; // ID de l'utilisateur créé
}

async function creerTamarobot(nom_tama, utilisateur_id) {
  await db.execute(
    "INSERT INTO tamarobots (nom_tama, utilisateur_id) VALUES (?, ?)",
    [nom_tama, utilisateur_id]
  );
}

module.exports = {
  verifierUtilisateurExiste,
  creerUtilisateur,
  creerTamarobot
};