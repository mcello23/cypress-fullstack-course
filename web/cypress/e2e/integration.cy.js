describe('integration page', () => {
  it('Should go to integration subpage', () => {
    cy.prompt([
      'Click on Integration menu item',
      'Validate that Zip Code Lookup is visible on the page',
      'Validate that the button Search is visible and enabled on the page',
      'Validate that the Street input is visible on the page',
      'Click on Go Back to Dashboard button on top of the page',
      'Validate that the name Marcelo Costa is seen on the page',
      'Validate that the email marcelo@webdojo.com is seen on the page',
    ]);
  });
});
