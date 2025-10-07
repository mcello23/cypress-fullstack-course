import './actions/consultancy.actions';
import './commands';

beforeEach(function () {
  const specName = Cypress.spec && Cypress.spec.name ? Cypress.spec.name : '';

  // Skip tests that require cy.prompt in non-Chromium browsers
  if (
    /(board-test|integration)/i.test(specName) &&
    Cypress.browser?.family !== 'chromium'
  ) {
    this.skip();
    return;
  }

  // Skip login for login specs
  if (/login/i.test(specName)) {
    return;
  }

  // Use board login for board tests
  if (/board-test/i.test(specName)) {
    cy.loginBoard();
    return;
  }

  // Default login for all other tests
  cy.loginSession('marcelo@webdojo.com', 'katana123');
});

//eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
