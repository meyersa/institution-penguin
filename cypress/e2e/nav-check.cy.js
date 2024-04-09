describe("nav check", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Default viewport: mobileMenu is out of sight (translateY(-100%))", () => {
    cy.get('#mobileMenu').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -564)');
  });

  it("Default viewport: Header includes the word 'Login' and routes to /login when clicked", () => {
    // Check if the word 'Login' is present in the header
    cy.contains('[class*="headerText"]', 'Login').click();
    // Check if the URL contains '/login' after clicking
    cy.url().should('include', '/login');
  });

  it("iPhone XR viewport: mobileMenu is out of sight (translateY(-100%))", () => {
    // Switch to iPhone XR viewport
    cy.viewport('iphone-xr');
    cy.get('#mobileMenu').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -800)');
  });

  it("iPhone XR viewport: mobileMenu is in sight when menu button is clicked", () => {
    // Switch to iPhone XR viewport
    cy.viewport('iphone-xr');
    // Click on the menu button
    cy.get('[class*="profileButton"]').click();
    // Check if the mobileMenu is visible (translateY(0))
    cy.get('#mobileMenu').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 96)');
  });

  it("iPhone XR viewport: 'Login' button works and takes you to /login", () => {
    // Switch to iPhone XR viewport
    cy.viewport('iphone-xr');
    // Click on the menu button
    cy.get('[class*="profileButton"]').click();
    // Click on the 'Login' button in the mobileMenu
    cy.contains('[class*="menuitem"]', 'Login').click();
    // Check if the URL contains '/login' after clicking
    cy.url().should('include', '/login');
  });
});
