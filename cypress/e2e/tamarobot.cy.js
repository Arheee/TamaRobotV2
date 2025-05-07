describe('Tamarobot E2E', () => {
  it('Inscription, connexion et interaction', () => {
    const timestamp = Date.now();
    const username = `Cypress_${timestamp}`;
    const password = 'CypressPassword';
    const robotname = `Tama_${timestamp}`;
    cy.visit('http://localhost:5500/frontend');
    
     // formulaire d'inscription
     cy.get('#show-register').click();

    // Inscription
    cy.get('#register-username').type(username);
    cy.get('#register-password').type(password);
    cy.get('#register-robotname').type(robotname);
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