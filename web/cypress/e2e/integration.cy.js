describe('integration page', () => {
  it('Should go to integration subpage', function () {
    if (Cypress.browser?.family !== 'chromium') {
      this.skip();
    }
    cy.prompt([
      'Click on the Integração menu item',
      'Validate that Consulta de CEP is visible on the page',
    ]);
  });
});
