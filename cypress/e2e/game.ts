/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
  it('should render game page sections', () => {
    cy.visit('/game/cyberpunk-2077');

    cy.getByDataCy('game-info').should('exist').within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
    });

    // gallery
    cy.findAllByRole('button', { name: /thumb \-/i }).should('have.length.gt', 0);
  });
});