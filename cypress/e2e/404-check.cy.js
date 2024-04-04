// Make sure 404 is working

describe('404 Page Tests', () => {
    const pages = ['/1', '/adsfkjsdf', '/wp-admin'];

    pages.forEach((page) => {
        it(`Visits ${page} and expects 404 page with text "404 - Page Not Found"`, () => {
            cy.request({
                url: page,
                failOnStatusCode: false // Do not treat non-2xx status codes as failures
            }).then((response) => {
                // Assert that the response status code is 404
                expect(response.status).to.eq(404);

                // Assert that the response body contains the text "404 - Page Not Found"
                expect(response.body).to.contain('404 - Page Not Found');
            });
        });
    });
});