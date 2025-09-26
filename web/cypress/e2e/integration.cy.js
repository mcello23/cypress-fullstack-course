describe('integration page', () => {
  it('Should go to integration subpage', () => {
    cy.prompt([
      'Click on the Integração menu item',
      'Validate that Consulta de CEP is visible on the page',
      'Validate that the button Buscar is visible and enabled on the page',
    ]);
  });
});
