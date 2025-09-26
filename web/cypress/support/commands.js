Cypress.Commands.add('preencherCamposBasicos', (...args) =>
  cy.fillBasicFields(...args),
);
Cypress.Commands.add('selecionarPessoaFisica', (...args) =>
  cy.selectIndividual(...args),
);
Cypress.Commands.add('selecionarPessoaJuridica', (...args) =>
  cy.selectCompany(...args),
);
Cypress.Commands.add('submeterFormulario', (...args) => cy.submitForm(...args));
Cypress.Commands.add('preencherFormularioFixture', (...args) =>
  cy.fillFormFixture(...args),
);

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

Cypress.Commands.add('loginBoard', () => {
  cy.session(
    'boardSession',
    () => {
      cy.intercept({
        method: 'POST',
        url: '/Account/Login',
      }).as('preLogin');
      cy.intercept({
        method: 'POST',
        url: '/Account/SignIn',
      }).as('postLogin');
      cy.intercept({
        method: 'GET',
        url: '/connect/userinfo',
      }).as('userInfo');
      cy.visit('https://qcrelease-c3.board.com/', {
        retryOnNetworkFailure: true,
        retryOnStatusCodeFailure: true,
      });
      cy.get('#Username')
        .should('be.visible')
        .type(Cypress.env('BOARD_USERNAME'));
      cy.get('form').last().submit();
      cy.wait('@preLogin').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
      cy.get('#Password')
        .should('be.visible')
        .type(Cypress.env('BOARD_PASSWORD'));
      cy.get('form').last().submit();
      cy.wait('@postLogin').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
      cy.wait('@userInfo').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
    },
    { cacheAcrossSpecs: true },
  );
});

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName).should('be.visible').click();
  cy.contains('h1', pageTitle).should('be.visible');
});
