import './commands';

beforeEach(() => {
  if (Cypress.spec.name.includes('consultancy')) {
    cy.loginSession('marcelo@webdojo.com', 'katana123');
  }
});
