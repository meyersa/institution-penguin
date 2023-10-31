// Makes sure the nav menu is only showing on mobile 

describe('nav view', () => {
  it('default-viewport', () => {
    cy.visit('/')
    cy.get('[class*="header_burgerWrapper"]').should('not.be.visible')

  })
  it('iphone-xr-viewport', () => {
    cy.visit('/')
    cy.viewport('iphone-xr')
    cy.get('[class*="header_burgerWrapper"]').should('be.visible')

  })
})