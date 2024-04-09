// Checks leaderboard since in testing it has exact values
describe("Leaderboard Page", () => {
  beforeEach(() => {
    // Visit the leaderboard page before each test
    cy.visit("/leaderboard");
    cy.get(".loading").should("not.exist");
  });

  it("displays the top 3 players", () => {
    let attempts = 0;
    const maxAttempts = 20; // Adjust the number of attempts as needed
    const interval = 3000; // Adjust the interval between attempts (in milliseconds)

    const checkTopPlayers = () => {
      attempts++;
      cy.get("#boxInside")
        .contains("1.")
        .next()
        .contains("I have 20 characters")
        .then((element) => {
          // Check if the exact person is #1
          if (element.length > 0) {
            cy.get("#boxInside").contains("600pts"); // Check if the highest score is exact
          } else if (attempts < maxAttempts) {
            // Retry if assertions failed and maxAttempts not reached
            cy.wait(interval);
            checkTopPlayers();
          }
        });
    };

    // Start checking top players
    checkTopPlayers();
  });
});
