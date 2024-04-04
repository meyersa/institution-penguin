// Make sure the game pages are redirecting 

describe('Page Redirect Tests', () => {
    const desktopResolution = [1920, 1080];
    const mobileResolution = [500, 800];

    it('Redirects to /login on desktop resolution for /', () => {
        // Set the viewport resolution to desktop
        cy.viewport(desktopResolution[0], desktopResolution[1]);

        // Visit the root page
        cy.visit('/');

        // Assert that it redirects to /login
        cy.url().should('eq', Cypress.config().baseUrl + '/login');
    });

    it('Redirects to /incompatible on mobile resolution for /', () => {
        // Set the viewport resolution to mobile
        cy.viewport(mobileResolution[0], mobileResolution[1]);

        // Visit the root page
        cy.visit('/');

        // Assert that it redirects to /incompatible
        cy.url().should('eq', Cypress.config().baseUrl + '/incompatible');
    });

    it('Redirects to /login on desktop resolution for /flappypenguin', () => {
        // Set the viewport resolution to desktop
        cy.viewport(desktopResolution[0], desktopResolution[1]);

        // Visit the /flappypenguin page
        cy.visit('/flappypenguin');

        // Assert that it redirects to /login
        cy.url().should('eq', Cypress.config().baseUrl + '/login');
    });

    it('Redirects to /incompatible on mobile resolution for /flappypenguin', () => {
        // Set the viewport resolution to mobile
        cy.viewport(mobileResolution[0], mobileResolution[1]);

        // Visit the /flappypenguin page
        cy.visit('/flappypenguin');

        // Assert that it redirects to /incompatible
        cy.url().should('eq', Cypress.config().baseUrl + '/incompatible');
    });
});