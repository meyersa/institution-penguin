// Makes sure the wrapper is displaying

describe('nav view', () => {
    it('default-viewport', () => {
        cy.visit('/')
        cy.get('[class*="wrapper_outside"]').should('be.visible')

    })
    it('iphone-xr-viewport', () => {
        cy.visit('/')
        cy.viewport('iphone-xr')
        cy.get('[class*="wrapper_outside"]').should('be.visible')

    })
})