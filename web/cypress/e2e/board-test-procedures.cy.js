import { faker } from '@faker-js/faker';

const PROCEDURES =
  'https://qcrelease-c3.board.com/en/data-models/TestE2E/procedures';

const STRING = `Testing cy.prompt-${faker.number.int({
  min: 1000,
  max: 9999,
})}`;

describe('Board cy.prompt procedure demonstration', () => {
  before(function () {
    if (Cypress.env('CI') || process.env.CI) {
      this.skip();
    }
  });
  it('Should create a Procedure with prompt inputs', () => {
    cy.prompt([
      `visit the URL ${PROCEDURES}`,
      'Wait for the page to load, like 10 seconds',
      'Click on the yellow Add button right next to the Procedures title',
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
});
