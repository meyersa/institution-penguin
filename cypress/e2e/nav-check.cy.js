// Navigational checks

describe('nav view', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('default-viewport should not show the burger menu', () => {
    cy.get('[class*="header_burgerWrapper"]').should('not.be.visible')

  });
  it('iphone-xr-viewport should show the burger menu', () => {
    cy.viewport('iphone-xr')
    cy.get('[class*="header_burgerWrapper"]').should('be.visible')

  });
})