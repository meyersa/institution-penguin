// Checks leaderboard since in testing it has exact values
describe('Leaderboard Page', () => {
  beforeEach(() => {
    // Visit the leaderboard page before each test
    cy.visit('/leaderboard');
  });

  it('displays the top 3 players', () => {
    // Check if the top 3 player elements are present
    cy.get('#boxInside').contains('1.').next().contains('I_have_20_characters'); // Check if the exact person is #1
    cy.get('#boxInside').contains('600pts'); // Check if the highest score is exact
  });
});