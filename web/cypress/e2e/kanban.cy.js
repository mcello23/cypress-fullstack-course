const dataTransfer = new DataTransfer();

describe('Kanban board functionality', () => {
  beforeEach(() => {
    cy.contains('Kanban').click();
  });

  it('should add a new task', () => {
    cy.contains('div[draggable=true]', 'Documentar API').trigger('dragstart', {
      dataTransfer,
    });

    cy.get('.column-done')
      .trigger('drop', {
        dataTransfer,
      })
      .find('h3')
      .should('have.text', 'Done (4)');
    cy.get('.column-done')
      .and('include.text', 'Documentar API')
      .and('include.text', 'Criar documentação da API com Swagger');
  });
});
