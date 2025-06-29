describe('Should play a video', () => {
  beforeEach(() => {
    cy.contains('Video').click();
  });

  it('should play the video', () => {
    cy.contains('Video').should('be.visible');
    cy.get('iframe[title="Video Player"]')
      .should('exist')
      .its('0.contentDocument.body')
      .then(cy.wrap)
      .as('iframeBody');
    cy.get('@iframeBody').find('.play-button').click();
    cy.get('@iframeBody').find('.pause-button').should('be.visible');
  });
});
