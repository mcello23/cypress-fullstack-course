import './actions/consultancy.actions';
import './commands';

beforeEach(() => {
  if (Cypress.spec.name.includes('consultancy')) {
    cy.loginSession('marcelo@webdojo.com', 'katana123');
  }
});

//eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
