// Navigational checks

describe('nav view', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('default-viewport should not show the burger menu', () => {
    cy.get('[class*="mobile"]').should('not.be.visible')

  });
  it('iphone-xr-viewport should only show the burger menu when pressed', () => {
    cy.viewport('iphone-xr')
    cy.get('[class*="header_mobileMenu"]').should('not.be.visible')

  });
  it('iphone-xr-viewport should show the burger menu when pressed', () => {
    cy.viewport('iphone-xr')
    cy.get('#profileButton').click();
    cy.get('[class*="header_mobileMenu"]').should('be.visible')

  });
})