// Makes sure the site is displaying across multiple nav views

describe('generic page check', () => {
    it('About should contain the h1 element with text "Our Project"', () => {
        // Visit the "/about" page
        cy.visit('/about');

        // Assert that there is an h1 element with the text "Our Project"
        cy.get('h1').should('contain.text', 'Our Project');
    });
    it('Incompatible should contain the h1 element with text "Not compatible"', () => {
        // Visit the "/incompatible" page
        cy.visit('/incompatible');

        // Assert that there is an h1 element with the text "Not compatible"
        cy.get('h1').should('contain.text', 'Not compatible');
    });
});