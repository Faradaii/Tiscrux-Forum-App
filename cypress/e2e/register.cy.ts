/**
 * - register spec
 *   - should display register page correctly
 *   - should display validation popup when name is empty
 *   - should display validation popup when username is empty
 *   - should display validation popup when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */
describe('register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="name"]').should('be.visible');
    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button').contains(/^Buat Akun$/).should('be.visible');
  });

  it('should display validation popup when name is empty', () => {
    cy.get('button').contains(/^Buat Akun$/).click();
    cy.get('input[placeholder="name"]').then((input) => {
      const nameInput = input[0] as HTMLInputElement;
      expect(nameInput.validationMessage).to.eq('Please fill out this field.');
    });
  });

  it('should display validation popup when email is empty or not an email format', () => {
    cy.get('button').contains(/^Buat Akun$/).click();
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

  it('should display validation popup when password is empty or length < 6', () => {
    cy.get('button').contains(/^Buat Akun$/).click();
    cy.get('input[placeholder="password"]').then((input) => {
      const passwordInput = input[0] as HTMLInputElement;
      expect(passwordInput.validationMessage).to.eq('Please fill out this field.');
    });

    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/register').as('registerMessage');

    cy.get('input[placeholder="name"]').type('testuser');
    cy.get('input[placeholder="email"]').type('testuser@mail.com');
    cy.get('input[placeholder="password"]').type('123');

    cy.get('button').contains(/^Buat Akun$/).click();

    cy.wait('@registerMessage');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('password must be at least 6 characters long');
    });
  });

  it('should display alert when email already used', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/register').as('registerMessage');

    cy.get('input[placeholder="name"]').type('testuser');
    cy.get('input[placeholder="email"]').type('testuser@mail.com');
    cy.get('input[placeholder="password"]').type('wrong_password');

    cy.get('button').contains(/^Buat Akun$/).click();

    cy.wait('@registerMessage');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });
});