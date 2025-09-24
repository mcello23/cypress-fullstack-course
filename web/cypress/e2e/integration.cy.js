describe('integration page', () => {
  it('Should go to integration subpage', () => {
    cy.prompt([
      'Click on the Integração menu item',
      'Validate that Consulta de CEP is visible on the page',
    ]);
  });
});

it('asd', function () {
  cy.get('#root button:nth-child(2) .text-left').click();
  cy.get('#root .font-bold').click();
});
