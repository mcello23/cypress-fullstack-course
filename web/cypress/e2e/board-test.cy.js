import { faker } from '@faker-js/faker';

const FINANCE_CAPSULE =
  'https://qcrelease-c3.board.com/en/capsules/Demo%5COffice%20of%20Finance.bcps/screen';

const PROCEDURES =
  'https://qcrelease-c3.board.com/en/data-models/TestE2E/procedures';

const STRING = `Testing cy.prompt-${faker.number.int({
  min: 1000,
  max: 9999,
})}`;

describe('Board', () => {
  beforeEach(() => {
    cy.loginBoard();
  });

  it('Should access Office of Finance capsule and validate its numbers', () => {
    cy.prompt([
      `visit this Office of Finance capsule ${FINANCE_CAPSULE}`,
      'Wait for the page to load, like 8 seconds',
      'Validate that Welcome to Finance is seen on the page',
      'Validate that User:mcosta@board.com is seen',
      'Click on Earnings Dashboard',
      'Wait for the page to load, like 8 seconds',
      'Validate that Operation Expenses, Revenue, Net Income and Margin are seen on the page',
      'Click on P&L Report button',
      'Validate that Current Version, Budget, Yearly values are seen on the page',
      'Validate that there is a value of 545,316,895 shown in the page',
    ]);
  });

  it('Should create a Procedure with prompt inputs', () => {
    cy.prompt([
      `visit this URL ${PROCEDURES}`,
      'Wait for the page to load, like 15 seconds',
      'Click on the Add button right next to the Procedures title',
      `On the name input, type ${STRING}`,
      'Click on the STEPS button, then on the Step button',
      'Force click on "Go to Capsule" button',
      'Click on Capsule path input',
      'Type E2EAdminPortal inside the input',
      'Force click at the first item that appears on Capsule path input dropdown',
      'Click on Add button, then Done button, then on Create button',
      'wait 6 seconds',
      'Click on Close button, inside the modal',
      `Validate that ${STRING} is seen on the page`,
    ]);
  });

  after(() => {
    cy.get(
      '[aria-describedby="cdk-describedby-message-ng-1-10"] .mat-mdc-button-touch-target',
    ).click();
    cy.get('#mat-mdc-dialog-1 .mat-primary .mdc-button__label').click();
  });
});
