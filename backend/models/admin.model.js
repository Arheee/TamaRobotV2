const db = require("../mysql");

async function getAllAdminUsers() {
  const query = `
    SELECT u.nom_utilisateur, u.derniere_connexion, t.nom_tama
    FROM utilisateurs u
    LEFT JOIN tamarobots t ON u.id = t.utilisateur_id
    ORDER BY u.nom_utilisateur ASC
  `;
  const connection = await db.promise();
  const [rows] = await connection.execute(query);
  return rows;
}

module.exports = { getAllAdminUsers };