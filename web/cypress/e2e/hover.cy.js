describe('Hover functionality', () => {
  it('should display tooltip on hover', () => {
    cy.get('[data-cy="instagram-link"]').trigger('mouseover');
    cy.get('.mouseover').should('contain', 'Isso é Mouseover!');
  });
});
