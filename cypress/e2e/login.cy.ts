/**
 * - Login spec
 *   - should display login page correctly
 *   - should display validation popup when username is empty  or not an email format
 *   - should display validation popup when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('should display validation popup when username is empty or not an email format', () => {
    cy.get('button').contains(/^Masuk$/).click();
    cy.get('input[placeholder="email"]').then((input) => {
      const emailInput = input[0] as HTMLInputElement;
      expect(emailInput.validationMessage).to.eq('Please fill out this field.');
    });

    cy.get('input[placeholder="email"]').type('testuser');
    cy.get('input[placeholder="email"]').then((input) => {
      const emailInput = input[0] as HTMLInputElement;
      expect(emailInput.validationMessage).to.eq(`Please include an '@' in the email address. '${emailInput.value}' is missing an '@'.`);
    });
  });

  it('should display validation popup when password is empty', () => {
    cy.get('button').contains(/^Masuk$/).click();
    cy.get('input[placeholder="password"]').then((input) => {
      const passwordInput = input[0] as HTMLInputElement;
      expect(passwordInput.validationMessage).to.eq('Please fill out this field.');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login').as('loginMessage');

    cy.get('input[placeholder="email"]').type('testuser@mail.com');

    cy.get('input[placeholder="password"]').type('wrong_password');

    cy.get('button').contains(/^Masuk$/).click();

    cy.wait('@loginMessage');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="email"]').type('testuser@mail.com');

    cy.get('input[placeholder="password"]').type('testuser123');

    cy.get('button').contains(/^Masuk$/).click();

    cy.get('aside').should('be.visible');
    cy.get('button').contains('Beranda').should('be.visible');
  });
});