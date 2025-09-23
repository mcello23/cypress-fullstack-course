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
    cy.login('marcelo', 'katana123');
    cy.contains('Hmm... esse email parece estar errado 🤔').should(
      'be.visible',
    );
  });

  it.skip('Uses cy.prompt', () => {
    cy.prompt(['Visit https://cloud.cypress.io/login']);
  });
});
