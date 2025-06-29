import './commands';

beforeEach(() => {
  if (
    Cypress.spec.name.includes('consultancy') ||
    Cypress.spec.name.includes('hover') ||
    Cypress.spec.name.includes('multi-window') ||
    Cypress.spec.name.includes('kanban') ||
    Cypress.spec.name.includes('iframe')
  ) {
    cy.loginSession('marcelo@webdojo.com', 'katana123');
  }
});
