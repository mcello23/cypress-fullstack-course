describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should login successfully', () => {
    cy.login('marcelo@webdojo.com', 'katana123');
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-name"]').should('contain', 'Marcelo');
  });

  it('Negative - should not login with invalid password', () => {
    cy.login('marcelo@webdojo.com', 'katana3');
    cy.contains('Acesso negado! Tente novamente.').should('be.visible');
  });

  it('Negative - should not login with unregistered email', () => {
    cy.login('marcel@webdojo.com', 'katana123');
    cy.contains('Acesso negado! Tente novamente.').should('be.visible');
  });

  it('Negative - should not proceed with incorrect email format', () => {
    cy.login('marcelo', 'katana123');
    cy.contains('Hmm... esse email parece estar errado 🤔').should(
      'be.visible',
    );
  });

  it('Uses cy.prompt', () => {
    cy.prompt([
      'Insert email marcelo@webdojo.com into the the input e-mail',
      'Insert password katana123 into the input password',
      'Validate that both fields were filled correctly',
      'Validate that the Entrar button is enabled',
      'Click on the Entrar button',
      'Validate that the user name is Marcelo Costa',
    ]);
    // // Prompt step 1: Insert email marcelo@webdojo.com into the the input e-mail
    // cy.get("#email").type("marcelo@webdojo.com");

    // // Prompt step 2: Insert password katana123 into the input password
    // cy.get("#password").type("katana123")

    // // Prompt step 3: Validate that both fields were filled correctly
    // cy.get("#email").should("have.value", "marcelo@webdojo.com")
    // cy.get("#password").should("have.value", "katana123")

    // // Prompt step 4: Validate that the Entrar button is enabled
    // cy.get("#root .text-white").should("be.enabled")

    // // Prompt step 5: Click on the Entrar button
    // cy.get("#root .text-white").click()

    // // Prompt step 6: Validate that the user name is Marcelo Costa
    // cy.get("[data-cy=\"user-name\"]").should("have.text", "Marcelo Costa")
  });
});
