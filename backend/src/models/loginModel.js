const db = require("../mysql");

async function trouverUtilisateurAvecTama(nom_utilisateur, mot_de_passe) {
  const [rows] = await db.execute(
    `SELECT u.id, u.nom_utilisateur, u.derniere_connexion, t.nom_tama
     FROM utilisateurs u
     JOIN tamarobots t ON u.id = t.utilisateur_id
     WHERE u.nom_utilisateur = ? AND u.mot_de_passe = ?`,
    [nom_utilisateur, mot_de_passe]
  );
  return rows[0];
}

async function mettreAJourDerniereConnexion(id) {
  await db.execute(
    "UPDATE utilisateurs SET derniere_connexion = NOW() WHERE id = ?",
    [id]
  );
}

module.exports = {
  trouverUtilisateurAvecTama,
  mettreAJourDerniereConnexion,
};