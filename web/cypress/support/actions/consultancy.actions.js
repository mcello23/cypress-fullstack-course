const { faker } = require('@faker-js/faker/locale/pt_BR');

const socialOptions = ['LinkedIn', 'Instagram', 'Udemy', 'YouTube'];
const technologies = ['JavaScript', 'Cypress'];
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const successMessage =
  'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.';

Cypress.Commands.add(
  'fillBasicFields',
  (
    personType = 'PF',
    opts = {
      checkSocial: true,
      checkTerms: true,
      attachFile: true,
      generateTechnologies: true,
    },
  ) => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const phone = faker.phone.number({ style: 'national' });
    const paragraphText = faker.lorem.sentence(8);

    cy.get('#name').clear().type(name).should('have.value', name);
    cy.get('#email').clear().type(email).should('have.value', email);
    cy.get('#phone').clear().type(phone).should('have.value', phone);

    const isCompany =
      personType === 'PJ' ||
      personType === 'company' ||
      personType === 'inCompany';

    if (isCompany) {
      cy.get('#consultancyType')
        .select('inCompany')
        .should('have.value', 'inCompany');
    } else {
      cy.get('#consultancyType').should('have.value', 'individual');
    }

    if (opts.checkSocial) {
      socialOptions.forEach((option) => {
        cy.contains('label', option).find('input').check().should('be.checked');
      });
    }

    if (opts.attachFile) {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/document.pdf', {
        force: true,
      });
    }

    cy.get('#details')
      .clear()
      .type(paragraphText)
      .should('have.value', paragraphText);

    if (opts.generateTechnologies) {
      technologies.forEach((technology) => {
        cy.get('#technologies').type(`${technology}{enter}`);
        cy.contains('span', technology).should('be.visible');
      });
    }

    if (opts.checkTerms) {
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked');
    }
  },
);

Cypress.Commands.add('fillIncorrectFields', () => {
  const phone = faker.phone.number({ style: 'national' });

  cy.get('#phone').clear().type(phone).should('have.value', phone);
  cy.get('#consultancyType')
    .select('inCompany')
    .should('have.value', 'inCompany');
  socialOptions.forEach((option) => {
    cy.contains('label', option).find('input').check().should('be.checked');
  });

  technologies.forEach((technology) => {
    cy.get('#technologies').type(`${technology}{enter}`);
    cy.contains('span', technology).should('be.visible');
  });
  cy.contains('button', 'Enviar formulário').should('be.enabled').click();
});

Cypress.Commands.add('selectIndividual', (cpf) => {
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

Cypress.Commands.add('selectCompany', (cnpj) => {
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

Cypress.Commands.add('submitForm', () => {
  cy.contains('button', 'Enviar formulário').should('be.enabled').click();
  cy.get('.modal-content').contains(successMessage).should('be.visible');
});

Cypress.Commands.add('fillFormFixture', (data) => {
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
