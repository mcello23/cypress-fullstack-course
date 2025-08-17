import { faker } from '@faker-js/faker/locale/pt_BR';

describe('Consultancy form page validation', () => {
  beforeEach(() => {
    cy.goTo('Formulários', 'Consultoria');
  });

  context('Individual Person (PF)', () => {
    it('Should submit a valid request (CPF) without changing the default type', () => {
      cy.preencherCamposBasicos('PF');
      const cpf = gerarCPF();
      cy.selecionarPessoaFisica(cpf);
      cy.submeterFormulario();
    });

    it('Should submit a valid request (CPF) using fixed fixture data', () => {
      cy.fixture('consultancy').then((data) => {
        cy.preencherFormularioFixture(data);
        cy.submeterFormulario();
      });
    });
  });

  context('Legal Entity (PJ)', () => {
    it('Should submit a valid request (CNPJ) changing to inCompany', () => {
      cy.preencherCamposBasicos('PJ');
      const cnpj = gerarCNPJ();
      cy.selecionarPessoaJuridica(cnpj);
      cy.submeterFormulario();
    });
  });

  context('Additional behaviors', () => {
    it('Should clear document field when switching from PF to PJ', () => {
      cy.preencherCamposBasicos('PF');
      const cpf = gerarCPF();
      cy.selecionarPessoaFisica(cpf);
      cy.contains('label', 'Pessoa Jurídica').find('input').check();
      cy.contains('label', 'CNPJ')
        .parent()
        .find('input')
        .should('have.value', '');
      cy.get('#consultancyType')
        .select('inCompany')
        .should('have.value', 'inCompany');
    });

    it.skip('Should not allow submission without accepting terms', () => {
      cy.preencherCamposBasicos('PF', {
        marcarRedes: true,
        marcarTermos: false,
        anexarArquivo: true,
        gerarTecnologias: true,
      });
      cy.selecionarPessoaFisica(gerarCPF());
      cy.contains('button', 'Enviar formulário').should('be.disabled');
    });

    it('Should validate automatic formatting of CPF and CNPJ', () => {
      cy.preencherCamposBasicos('PF', {
        marcarRedes: false,
        marcarTermos: false,
        anexarArquivo: false,
        gerarTecnologias: false,
      });
      const rawCpf = faker.string.numeric(11);
      cy.contains('label', 'CPF')
        .parent()
        .find('input')
        .type(rawCpf)
        .invoke('val')
        .should('match', /^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
      cy.get('#consultancyType').should('have.value', 'individual');

      cy.contains('label', 'Pessoa Jurídica').find('input').check();
      cy.get('#consultancyType')
        .select('inCompany')
        .should('have.value', 'inCompany');
      const rawCnpj = faker.string.numeric(14);
      cy.contains('label', 'CNPJ')
        .parent()
        .find('input')
        .type(rawCnpj)
        .invoke('val')
        .should('match', /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
    });
  });
});
