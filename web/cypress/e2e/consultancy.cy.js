import { faker } from '@faker-js/faker/locale/pt_BR';

// ---------- Geradores ----------
const gerarCPF = () =>
  faker.string
    .numeric(11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

const gerarCNPJ = () =>
  faker.string
    .numeric(14)
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

// ---------- Dados comuns ----------
const socialOptions = [
  'Instagram',
  'YouTube',
  'LinkedIn',
  'Udemy',
  'Indicação de Amigo',
];
const techonologies = ['JavaScript', 'Cypress', 'React'];
const successMessage =
  'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.';

// ---------- Helpers UI ----------
function preencherCamposBasicos(tipoPessoa = 'PF') {
  const nome = faker.person.fullName();
  const email = faker.internet.email();
  const phone = faker.phone.number({ style: 'national' });
  const paragraphText = faker.lorem.sentence(8);

  cy.get('#name').clear().type(nome).should('have.value', nome);
  cy.get('#email').clear().type(email).should('have.value', email);
  cy.get('#phone').clear().type(phone).should('have.value', phone);

  if (tipoPessoa === 'PJ') {
    // Apenas PJ altera o select
    cy.get('#consultancyType')
      .select('inCompany')
      .should('have.value', 'inCompany');
  } else {
    // PF: valida default (não altera)
    cy.get('#consultancyType').should('have.value', 'individual');
  }

  socialOptions.forEach((option) => {
    cy.contains('label', option).find('input').check().should('be.checked');
  });

  cy.get('input[type="file"]').selectFile('cypress/fixtures/document.pdf', {
    force: true,
  });

  cy.get('#details')
    .clear()
    .type(paragraphText)
    .should('have.value', paragraphText);

  techonologies.forEach((technology) => {
    cy.get('#technologies').type(`${technology}{enter}`);
    cy.contains('span', technology).should('be.visible');
  });

  cy.contains('label', 'termos de uso')
    .find('input')
    .check()
    .should('be.checked');
}

function selecionarPessoaFisica(cpf) {
  cy.contains('label', 'Pessoa Física')
    .find('input')
    .check()
    .should('be.checked');
  // Garante que continua individual
  cy.get('#consultancyType').should('have.value', 'individual');
  cy.contains('label', 'CPF')
    .parent()
    .find('input')
    .clear()
    .type(cpf)
    .should('have.value', cpf)
    .invoke('val')
    .should('match', cpfRegex);
}

function selecionarPessoaJuridica(cnpj) {
  cy.contains('label', 'Pessoa Jurídica')
    .find('input')
    .check()
    .should('be.checked');
  // Ajusta select para PJ
  cy.get('#consultancyType')
    .select('inCompany')
    .should('have.value', 'inCompany');
  cy.contains('label', 'CNPJ')
    .parent()
    .find('input')
    .clear()
    .type(cnpj)
    .should('have.value', cnpj)
    .invoke('val')
    .should('match', cnpjRegex);
}

function submeterFormulario() {
  cy.contains('button', 'Enviar formulário').should('be.enabled').click();
  cy.get('.modal-content').contains(successMessage).should('be.visible');
}

// ---------- Suite ----------
describe('Consultancy form page validation', () => {
  beforeEach(() => {
    cy.goTo('Formulários', 'Consultoria');
  });

  context('Pessoa Física', () => {
    it('Deve enviar solicitação válida (CPF) sem alterar o tipo (default individual)', () => {
      preencherCamposBasicos('PF');
      const cpf = gerarCPF();
      selecionarPessoaFisica(cpf);
      submeterFormulario();
    });
  });

  context('Pessoa Jurídica', () => {
    it('Deve enviar solicitação válida (CNPJ) alterando para inCompany', () => {
      preencherCamposBasicos('PJ');
      const cnpj = gerarCNPJ();
      selecionarPessoaJuridica(cnpj);
      submeterFormulario();
    });
  });

  context('Comportamentos adicionais', () => {
    it('Deve limpar campo de documento ao trocar de Pessoa Física para Jurídica', () => {
      preencherCamposBasicos('PF');
      const cpf = gerarCPF();
      selecionarPessoaFisica(cpf);
      cy.contains('label', 'Pessoa Jurídica').find('input').check();
      cy.contains('label', 'CNPJ')
        .parent()
        .find('input')
        .should('have.value', '');
      cy.get('#consultancyType')
        .select('inCompany')
        .should('have.value', 'inCompany');
    });

    it.skip('Não deve permitir envio sem aceitar termos (default individual)', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const phone = faker.phone.number({ style: 'national' });

      cy.get('#name').type(nome);
      cy.get('#email').type(email);
      cy.get('#phone').type(phone);

      // Default deve ser individual
      cy.get('#consultancyType').should('have.value', 'individual');

      selecionarPessoaFisica(gerarCPF());

      cy.contains('button', 'Enviar formulário').should('be.disabled');
    });

    it('Deve validar formatação automática de CPF e CNPJ mantendo default e ajuste', () => {
      preencherCamposBasicos('PF');
      cy.contains('label', 'Pessoa Física').find('input').check();
      const rawCpf = faker.string.numeric(11);
      cy.contains('label', 'CPF')
        .parent()
        .find('input')
        .type(rawCpf)
        .invoke('val')
        .should('match', cpfRegex);
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
        .should('match', cnpjRegex);
    });
  });
});
