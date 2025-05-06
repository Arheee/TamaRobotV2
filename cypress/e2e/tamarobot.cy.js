describe('Tamarobot E2E', () => {
  it('Inscription, connexion et interaction', () => {
    cy.visit('http://localhost:5500/frontend');
    
     // formulaire d'inscription
     cy.get('#show-register').click();

    // Inscription
    cy.get('#register-username').type('testCypress');
    cy.get('#register-password').type('testCypress');
    cy.get('#register-robotname').type('TamaCypressTamaCypress');
    cy.get('#registerBtn').click();

     // Attendre retour message inscription réussie
     cy.get('#registerMessage').invoke('text').should((text) => {
      expect(text).to.match(/(créé|succès)/i); //regex pour eviter la casse
    });
     // Revenir au formulaire de connexion
     cy.get('#show-login').click();

    // Connexion
    cy.get('#login-username').type('cypressuser');
    cy.get('#login-password').type('cypresstest');
    cy.get('#loginBtn').click();

    cy.get('#game-section').should('be.visible');
    // Interaction
    cy.get('#btnBonjour').click();

    // Vérification
    cy.get('#response').should('not.be.empty');
  });
});