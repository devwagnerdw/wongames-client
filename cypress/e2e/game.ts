/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
  it('should render game page sections', () => {
    cy.visit('/game/cyberpunk-2077');

    cy.getByDataCy('game-info', { timeout: 70000 }).should('exist').within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
    });

    // gallery
    cy.findAllByRole('button', { name: /thumb \-/i }).should('have.length.gt', 0);

      // content
      cy.getByDataCy('content').within(() => {
        cy.findByRole('heading', { name: /description/i }).should('exist')
      })
  
      cy.getByDataCy('content').children().should('have.length.at.least', 2)
  });
});