// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Add Testing Library Commands
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://google.com'))

Cypress.Commands.add('shouldRenderBanner', () => {
    cy.get('.slick-slider').within(() => {
        cy.findByRole('heading', {name: /cyberpunk 2077/i})
        cy.findByRole('link', { name: /buy now/i })
  
        cy.get('.slick-dots > :nth-child(2) > button').click()
        cy.wait(500)
  
        cy.findByRole('heading', { name: /Dome Keeper /i})
        cy.findByRole('link', { name: /buy now/i })
  
        cy.get('.slick-dots > :nth-child(3) > button').click()
        cy.wait(500)
  
        cy.findByRole('heading', {name: /sonzai /i})
        cy.findByRole('link', { name: /buy now/i })
      })
})


Cypress.Commands.add('shouldRenderShowcase', ({name, hightlight = false}) => {
    cy.get(`[data-cy="${name}"]`).within(()=>{
        cy.findByRole('heading',{ name }).should('exist')
        
        cy.get(`[data-cy="highlight"]`).should(hightlight ? 'exist' : 'not.exist')

        if (hightlight) {
          cy.get(`[data-cy="highlight"]`).within(() => {
            cy.findByRole('link').should('have.attr', 'href')
          })
        }

        cy.get(`[data-cy="game-card"]`).should('have.length.gt', -1)
    })
}) 