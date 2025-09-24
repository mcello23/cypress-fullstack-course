describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should login successfully', () => {
    cy.login('marcelo@webdojo.com', 'katana123');
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-name"]').should('contain', 'Marcelo');
  });

  it('Negative - should not login with invalid password', () => {
    cy.login('marcelo@webdojo.com', 'katana3');
    cy.contains('Acesso negado! Tente novamente.').should('be.visible');
  });

  it('Negative - should not login with unregistered email', () => {
    cy.login('marcel@webdojo.com', 'katana123');
    cy.contains('Acesso negado! Tente novamente.').should('be.visible');
  });

  it('Negative - should not proceed with incorrect email format', () => {
    cy.login('marcelo', 'password');
    cy.contains('Hmm... esse email parece estar errado 🤔').should(
      'be.visible',
    );
  });

  it('Uses cy.prompt', () => {
    if (Cypress.browser?.family !== 'chromium') {
      this.skip();
    }
    cy.prompt(
      [
        'Insert email marcelo@webdojo.com into the input e-mail',
        'Insert {{password}} into the input password',
        'Validate that both fields were filled correctly',
        'Validate that the Entrar button is enabled',
        'Click on the Entrar button',
        'Validate that the user name is Marcelo Costa',
      ],
      {
        excludeFromAI: { password: 'katana123' },
      },
    );
  });
});
