import { cy } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/pt_BR';

const nome = faker.person.fullName();
const email = faker.internet.email();
const phone = faker.phone.number({ style: 'national' });
const cpf = faker.string
  .numeric(11)
  .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
const paragraphText = faker.lorem.sentence(8);

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

describe('Consultancy form page validation', () => {
  beforeEach(() => {
    cy.goTo('Formulários', 'Consultoria');
  });

  it('Should fill request for individual consultance', () => {
    cy.get('#name').type(nome).should('have.value', nome);
    cy.get('#email').type(email).should('have.value', email);
    cy.get('#phone').type(phone).should('have.value', phone);
    cy.get('#consultancyType').select('In Company');
    cy.contains('label', 'Pessoa Física')
      .find('input')
      .click()
      .should('be.checked');

    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type(cpf)
      .should('have.value', cpf);

    socialOptions.forEach((option) => {
      cy.contains('label', option).find('input').click().should('be.checked');
    });

    cy.get('input[type="file"]').selectFile('cypress/fixtures/document.pdf', {
      force: true,
    });

    cy.get('#details').type(paragraphText).should('have.value', paragraphText);

    techonologies.forEach((technology) => {
      cy.get('#technologies').type(`${technology}{enter}`);
      cy.contains('span', technology).should('be.visible');
    });

    cy.contains('label', 'termos de uso').find('input').check();

    cy.contains('button[type="submit"]', 'Enviar formulário')
      .should('be.visible')
      .click();

    cy.get('.modal-content', { timeout: 10000 })
      .contains(successMessage)
      .should('be.visible');
  });
  it('Should validate the required field messages', () => {
    cy.contains('button', 'Enviar formulário').should('be.visible').click();
    cy.contains('label', 'Nome Completo *')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)');
    cy.contains('label', 'Email *')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)');
    cy.contains('label', 'termos de uso')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Você precisa aceitar os termos de uso')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)');
  });
});
