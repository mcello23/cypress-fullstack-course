import './actions/consultancy.actions';
import './commands';

beforeEach(() => {
  if (Cypress.spec.name.includes('consultancy')) {
    cy.loginSession('marcelo@webdojo.com', 'katana123');
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  return false;
});