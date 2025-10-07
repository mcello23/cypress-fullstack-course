describe('Board cy.prompt demonstration', () => {
  it('Should access Office of Finance capsule and validate texts and values', () => {
    // cy.prompt([
    //   `visit URL ${PROCEDURES}`,
    //   'Wait for the page to load, like 8 seconds',
    //   'Click on the yellow Add button right next to the Procedures title',
    //   `On the name input, type ${STRING}`,
    //   'Click on the STEPS button, then on the Step button',
    //   'Force click on "Go to Capsule" button',
    //   'Click on Capsule path input',
    //   'Type E2EAdminPortal inside the input',
    //   'Force click at the first item that appears on Capsule path input dropdown',
    //   'Click on Add button, then Done button, then on Create button',
    //   'wait 6 seconds',
    //   'Click on Close button, inside the modal',
    //   `Validate that ${STRING} is seen on the page`,
    // ])
    // Prompt step 1: visit URL https://qcrelease-c3.board.com/en/data-models/TestE2E/procedures
    cy.visit("https://qcrelease-c3.board.com/en/data-models/TestE2E/procedures");

    // Prompt step 2: Wait for the page to load, like 8 seconds
    cy.wait(8000)

    // Prompt step 3: Click on the yellow Add button right next to the Procedures title
    cy.get(".main-color").click()

    // Prompt step 4: On the name input, type Testing cy.prompt-4823
    cy.get("#mat-input-0").type("Testing cy.prompt-4823")

    // Prompt step 5: Click on the STEPS button, then on the Step button
    cy.get("#mat-tab-content-0-0 .mdc-button.ng-star-inserted").click()
    cy.get("#mat-mdc-dialog-0 .mat-mdc-outlined-button.ng-star-inserted").click()

    // Prompt step 6: Force click on "Go to Capsule" button
    cy.get("#mat-tab-content-1-0 div:nth-child(1) > .group-actions > div:nth-child(1)").click()

    // Prompt step 7: Click on Capsule path input
    cy.get("#brd-dropdown-1 .input-enabled").click()

    // Prompt step 8: Type E2EAdminPortal inside the input
    cy.get("#brd-dropdown-1 .prevent-click-outside-overlay").type("E2EAdminPortal")

    // Prompt step 9: Force click at the first item that appears on Capsule path input dropdown
    cy.get("#cdk-overlay-2 [role=\"gridcell\"]").click()

    // Prompt step 10: Click on Add button, then Done button, then on Create button
    cy.get("#mat-tab-content-1-1 .mdc-button.mat-primary").click()
    cy.get("#mat-mdc-dialog-0 .mdc-button.mat-primary").click()
    cy.get(".mdc-button.mat-primary").click()

    // Prompt step 11: wait 6 seconds
    cy.wait(6000)

    // Prompt step 12: Click on Close button, inside the modal
    cy.get("brd-panel-toolbar:nth-child(4) .mdc-button").click()

    // Prompt step 13: Validate that Testing cy.prompt-4823 is seen on the page
    cy.get(".dx-selection [aria-describedby=\"dx-col-5\"]").should("be.visible")
  });
});
