// Verifies profile is working as intended

describe('Profile Page', () => {
  it('displays the correct profile information for player #1', () => {
    // Visit the player profile page
    cy.visit('/profile/1')

    // Check if the profile information is displayed correctly
    cy.contains('h1', 'OG Penguin')
    cy.contains('a', 'Total points: 100')
    cy.contains('a', 'Global rank: 1')
    cy.contains('a', 'Last active')
    cy.contains('a', 'Member since')
    cy.get('img').should('have.attr', 'src').should('include', 'default-avatar.png')

  });

  it('displays a 404 error when visiting a non-existent profile', () => {
    // Visit a non-existent profile page
    cy.visit('/profile/abcd');

    // Check if the URL contains '/404'
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/404');
    });
  });
})