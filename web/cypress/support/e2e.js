import './commands'

beforeEach(() => {
    if (Cypress.spec.name.includes('consultancy') ||
        Cypress.spec.name.includes('profile')) {
        cy.loginSession('marcelo@webdojo.com','katana123')
    }
})