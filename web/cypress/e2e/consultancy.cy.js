import { faker } from '@faker-js/faker/locale/pt_BR';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

function generateCPF() {
  const n = faker.string.numeric(11);
  return n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function generateCNPJ() {
  const n = faker.string.numeric(14);
  return n.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

describe('Consultancy form page validation', () => {
  beforeEach(() => {
    cy.goTo('Formulários', 'Consultoria');
  });

  context('Individual Person (PF)', () => {
    it('Should submit a valid request (CPF) without changing the default type', () => {
      cy.fillBasicFields('PF');
      const cpf = generateCPF();
      cy.selectIndividual(cpf);
      cy.submitForm();
    });

    it('Should submit a valid request (CPF) using fixed fixture data', () => {
      cy.fixture('consultancy').then((data) => {
        cy.fillFormFixture(data);
        cy.submitForm();
      });
    });
  });

  context('Legal Entity (PJ)', () => {
    it('Should submit a valid request (CNPJ) changing to inCompany', () => {
      cy.fillBasicFields('PJ');
      const cnpj = generateCNPJ();
      cy.selectCompany(cnpj);
      cy.submitForm();
    });
  });

  context('Additional behaviors', () => {
    it('Should clear document field when switching from PF to PJ', () => {
      cy.fillBasicFields('PF');
      const cpf = generateCPF();
      cy.selectIndividual(cpf);
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
      cy.fillBasicFields('PF', {
        checkSocial: true,
        checkTerms: false,
        attachFile: true,
        generateTechnologies: true,
      });
  cy.selectIndividual(generateCPF());
      cy.contains('button', 'Enviar formulário').should('be.disabled');
    });

    it('Should validate automatic formatting of CPF and CNPJ', () => {
      cy.fillBasicFields('PF', {
        checkSocial: false,
        checkTerms: false,
        attachFile: false,
        generateTechnologies: false,
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
