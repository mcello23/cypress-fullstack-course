// Custom Commands

import { faker } from '@faker-js/faker/locale/pt_BR';

// Ajuste estas listas conforme sua aplicação
const socialOptions = ['LinkedIn', 'Instagram', 'Twitter'];
const technologies = ['JavaScript', 'Cypress'];
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const successMessage = 'Formulário enviado com sucesso';

// Login simples
Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(`${password}{enter}`, { log: false });
});

// Login usando sessão para acelerar specs
Cypress.Commands.add('loginSession', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/');
      cy.get('#email').type(email);
      cy.get('#password').type(`${password}{enter}`, { log: false });
      cy.url().should('include', '/dashboard');
    },
    { cacheAcrossSpecs: true },
  );
  cy.visit('/dashboard');
});

// Navegação por botão + validação de título
Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName).should('be.visible').click();
  cy.contains('h1', pageTitle).should('be.visible');
});

// Preenche campos básicos (parametrizável)
Cypress.Commands.add(
  'preencherCamposBasicos',
  (
    tipoPessoa = 'PF',
    opts = {
      marcarRedes: true,
      marcarTermos: true,
      anexarArquivo: true,
      gerarTecnologias: true,
    },
  ) => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const phone = faker.phone.number({ style: 'national' });
    const paragraphText = faker.lorem.sentence(8);

    cy.get('#name').clear().type(nome).should('have.value', nome);
    cy.get('#email').clear().type(email).should('have.value', email);
    cy.get('#phone').clear().type(phone).should('have.value', phone);

    if (tipoPessoa === 'PJ') {
      cy.get('#consultancyType')
        .select('inCompany')
        .should('have.value', 'inCompany');
    } else {
      cy.get('#consultancyType').should('have.value', 'individual');
    }

    if (opts.marcarRedes) {
      socialOptions.forEach((option) => {
        cy.contains('label', option).find('input').check().should('be.checked');
      });
    }

    if (opts.anexarArquivo) {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/document.pdf', {
        force: true,
      });
    }

    cy.get('#details')
      .clear()
      .type(paragraphText)
      .should('have.value', paragraphText);

    if (opts.gerarTecnologias) {
      technologies.forEach((technology) => {
        cy.get('#technologies').type(`${technology}{enter}`);
        cy.contains('span', technology).should('be.visible');
      });
    }

    if (opts.marcarTermos) {
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked');
    }
  },
);

// Seleciona pessoa física e valida CPF
Cypress.Commands.add('selecionarPessoaFisica', (cpf) => {
  cy.contains('label', 'Pessoa Física')
    .find('input')
    .check()
    .should('be.checked');
  cy.get('#consultancyType').should('have.value', 'individual');
  cy.contains('label', 'CPF')
    .parent()
    .find('input')
    .clear()
    .type(cpf)
    .should('have.value', cpf)
    .invoke('val')
    .should('match', cpfRegex);
});

// Seleciona pessoa jurídica e valida CNPJ
Cypress.Commands.add('selecionarPessoaJuridica', (cnpj) => {
  cy.contains('label', 'Pessoa Jurídica')
    .find('input')
    .check()
    .should('be.checked');
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
});

// Submete formulário e valida modal de sucesso
Cypress.Commands.add('submeterFormulario', () => {
  cy.contains('button', 'Enviar formulário').should('be.enabled').click();
  cy.get('.modal-content').contains(successMessage).should('be.visible');
});

// Preenche formulário usando fixture (dados determinísticos)
Cypress.Commands.add('preencherFormularioFixture', (data) => {
  cy.get('#name').clear().type(data.name).should('have.value', data.name);
  cy.get('#email').clear().type(data.email).should('have.value', data.email);
  cy.get('#phone').clear().type(data.phone).should('have.value', data.phone);
  cy.get('#consultancyType').should('have.value', data.consultancyType);

  cy.contains('label', 'Pessoa Física')
    .find('input')
    .check()
    .should('be.checked');
  cy.contains('label', 'CPF')
    .parent()
    .find('input')
    .clear()
    .type(data.cpf)
    .should('have.value', data.cpf)
    .invoke('val')
    .should('match', cpfRegex);

  (data.socialOptions || []).forEach((opt) => {
    cy.contains('label', opt).find('input').check().should('be.checked');
  });

  cy.get('input[type="file"]').selectFile('cypress/fixtures/document.pdf', {
    force: true,
  });

  cy.get('#details')
    .clear()
    .type(data.details)
    .should('have.value', data.details);

  (data.technologies || []).forEach((tech) => {
    cy.get('#technologies').type(`${tech}{enter}`);
    cy.contains('span', tech).should('be.visible');
  });

  if (data.acceptTerms) {
    cy.contains('label', 'termos de uso')
      .find('input')
      .check()
      .should('be.checked');
  }
});
