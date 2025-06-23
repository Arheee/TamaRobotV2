describe('Création de compte, connexion et interaction', () => {
  it('Crée un compte, se reconnecte, et interagit', () => {
    const timestamp = Date.now();
    const username = `Cypress_${timestamp}`;
    const password = 'CypressPassword';
    const robotname = `Tama_${timestamp}`;

    // 1. Créer un nouveau compte
    cy.visit('http://tamarobot.localhost/');
    
    // Aller à l'écran d'inscription
    cy.get('#show-register').click();
    
    // Remplir le formulaire d'inscription
    cy.get('#register-username').type(username);
    cy.get('#register-password').type(password);
    cy.get('#register-robotname').type(robotname);
    cy.get('#registerBtn').click();

    // Vérification du message de succès
    cy.get('#registerMessage').should('contain.text', 'succès');

    // 2. Aller à la page de connexion
    cy.get('#show-login').click();

    // 3. Se connecter avec le compte créé
    cy.get('#login-username').type(username);
    cy.get('#login-password').type(password);
    cy.get('#loginBtn').click();

    // Vérifier que la page d'accueil du jeu est visible
    cy.get('#game-section').should('be.visible');
    
    // 4. Interagir avec le robot (par exemple, cliquer sur un bouton)
    cy.get('#btnBonjour').click();

    // Vérifier la réponse
    cy.get('#response').should('not.be.empty');
  });
});
