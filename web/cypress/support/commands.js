Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password + '{enter}');
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
    {
      cacheAcrossSpecs: true,
    },
  );
  cy.visit('/dashboard');
});

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName).should('be.visible').click();
  cy.contains('h1', pageTitle).should('be.visible');
});
