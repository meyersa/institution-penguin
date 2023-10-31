// Makes sure the site is displaying across multiple nav views

describe('basic view', () => {
  it('default-viewport', () => {
    cy.visit('/')

  })
  it('iphone-xr-viewport', () => {
    cy.viewport('iphone-xr')
    cy.visit('/')

  })
  it('macbook-15-viewport', () => {
    cy.viewport('macbook-15')
    cy.visit('/')

  })
})