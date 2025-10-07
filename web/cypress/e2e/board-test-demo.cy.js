describe('Board cy.prompt demonstration', () => {
  it('Should access Office of Finance capsule and validate texts and values', () => {
    cy.prompt([
      'visit Office of Finance capsule https://qcrelease-c3.board.com/en/capsules/Demo%5COffice%20of%20Finance.bcps/screen',
      'Wait for the page to load, like 30 seconds',
      'Validate that Welcome to Finance is seen on the page',
      'Validate that User: mcosta@board.com is seen',
      'Click on Earnings Dashboard',
      'Wait for the page to load, like 3 seconds',
      'Validate that Operation Expenses, Revenue, Net Income and Margin are seen on the page',
      'Click on P&L Report button',
      'Validate that Current Version, Budget, Yearly values are seen on the page',
      'Validate that there is a value of 545,316,895 shown in the page',
    ]);
  });
});
