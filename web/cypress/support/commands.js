Cypress.Commands.add('preencherCamposBasicos', (...args) => cy.fillBasicFields(...args));
Cypress.Commands.add('selecionarPessoaFisica', (...args) => cy.selectIndividual(...args));
Cypress.Commands.add('selecionarPessoaJuridica', (...args) => cy.selectCompany(...args));
Cypress.Commands.add('submeterFormulario', (...args) => cy.submitForm(...args));
Cypress.Commands.add('preencherFormularioFixture', (...args) => cy.fillFormFixture(...args));

Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(`${password}{enter}`, { log: false });
});

Cypress.Commands.add('loginSession', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/');
      cy.get('#email').type(email);
      cy.get('#password').type(`${password}{enter}`, { log: false });
      cy.url().should('include', '/dashboard');
    },
    { cacheAcrossSpecs: true },
  );
  cy.visit('/dashboard');
});

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName).should('be.visible').click();
  cy.contains('h1', pageTitle).should('be.visible');
});