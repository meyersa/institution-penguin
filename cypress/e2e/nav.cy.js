describe('nav view', () => {
  it('default-viewport', () => {
    cy.visit('/')
    cy.get('.burgerWrapper').should('not.be.visible')

  })
  it('iphone-xr-viewport', () => {
    cy.visit('/')
    cy.viewport('iphone-xr')
    cy.get('.burgerWrapper').should('visible')
  
  })
})