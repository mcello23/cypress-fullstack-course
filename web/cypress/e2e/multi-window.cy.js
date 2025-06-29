describe('Multi-window functionality', () => {
  it('should validate Instagram link', () => {
    cy.get('[data-cy="instagram-link"]')
      .should('have.attr', 'href', 'https://www.instagram.com/mc3llo')
      .and('have.attr', 'target', '_blank');
  });
  it('should validate Forms page', () => {
    cy.contains('Formulários').click();
    cy.contains('a', 'termos de uso').invoke('removeAttr', 'target').click();
    cy.contains(
      'Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.',
    ).should('be.visible');
  });
});
