describe('Sign in flow', () => {
    it('should navigate to the signin page, sign in, and navigate to the authenticated page', () => {
      // Visit the landing page
      cy.visit('http://localhost:5173/view');
  
      // Click the Sign in button
      cy.get('[data-testid="signin-button"]').click();
  
      // Verify that the signin page opens
      cy.url().should('include', '/signin');
  
      // Fill in the login information
      cy.get('input[id="email"]').type('dy69@gmail.com');
      cy.get('input[id="password"]').type('1234');
  
      // Submit the signin form
      cy.get('button[type="submit"]').click();
  
      // Verify that the new page with data-testid="auth-page" opens
      cy.get('[data-testid="auth-page"]').should('be.visible');
    });
  });