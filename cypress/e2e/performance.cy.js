// Checks that the pages are remotely performative 

describe('Performance Tests', () => {
    const htmlPages = ['/', '/about', '/leaderboard'];
    htmlPages.forEach((page) => {
        it(`Should have fast load times for ${page}`, () => {
            cy.visit(page);
            cy.window().its('performance').then((performance) => {
                // 1000ms (1s) as a very lenient test
                expect(performance.timing.responseEnd - performance.timing.requestStart).to.be.lessThan(1000);
            });
        });
    });

    const apiPages = ['/profile/1', '/api/database/profile/1'];
    apiPages.forEach((page) => {
        it(`Should have fast load times for ${page}`, () => {
            cy.request(page);
            cy.window().its('performance').then((performance) => {
                // 1000ms (1s) as a very lenient test
                expect(performance.timing.responseEnd - performance.timing.requestStart).to.be.lessThan(1000);
            });
        });
    });
});
