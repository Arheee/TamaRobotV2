// Fonction de validation d'une interaction utilisateur
function validateInteraction(data) {
    return data && typeof data.type === "string" && typeof data.reponse === "string";
  }
  
  module.exports = { validateInteraction };
  