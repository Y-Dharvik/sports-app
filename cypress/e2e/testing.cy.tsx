describe('Sign in flow', () => {
    Cypress.on('uncaught:exception', (err) => {
      // we expect a 3rd party library error with message 'list not defined'
      // and don't want to fail the test so we return false
      if (err.message.includes('Cannot use import statement outside a module')) {
        return false
      }
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    })

    it('should navigate to the signin page, sign in, and navigate to the authenticated page', () => {
      // Visit the landing page
      cy.visit('http://localhost:5173/view');
  
      // Click the Sign in button
      console.log('clicking sign in button');
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

    // after sign in, the user should be able to click the preferences button which opens a modal, where he should be able to select the checkbox with cricket sport

    it('should navigate to the authenticated page, click the preferences button, select the cricket checkbox, and save the preferences', () => {
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
  
      // Click the Preferences button
      cy.get('[data-testid="Preferences-button"]').click();
  
      // Verify that the preferences modal opens
      cy.get('[data-testid="preferences-modal"]').should('be.visible');
  
      // Select the cricket checkbox
      cy.get('input[id="Rugby"]').check();
  
      // Save the preferences
      cy.get('button[type="submit"]').click();
  
      // Verify that the sport is visible in the favorites list
      cy.get('[data-testid="fav-sport-categories"]').should('contain', 'Rugby');

    });
  });