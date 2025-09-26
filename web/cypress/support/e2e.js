import './actions/consultancy.actions';
import './commands';

beforeEach(function () {
  const specName = Cypress.spec && Cypress.spec.name ? Cypress.spec.name : '';
  if (
    /board-test/i.test(specName) &&
    /integration/i.test(specName) &&
    Cypress.browser?.family !== 'chromium'
  ) {
    this.skip();
    return;
  }

  if (/login/i.test(specName) || /board-test/i.test(specName)) {
    return;
  }

  cy.loginSession('marcelo@webdojo.com', 'katana123');
});

//eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
