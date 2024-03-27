/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when submit button is clicked
 */
import { render, screen, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInputComponent', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle username typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const usernameInput = screen.getByPlaceholderText('email');

    // action
    await userEvent.type(usernameInput, 'usernameTest');

    // assert
    expect(usernameInput).toHaveValue('usernameTest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('password');

    // action
    await userEvent.type(passwordInput, 'passwordTest');

    // assert
    expect(passwordInput).toHaveValue('passwordTest');
  });

  it('should call login function when submit button is clicked', async () => {
    // arrange
    const loginMock = jest.fn();
    render(<LoginInput login={loginMock} />);
    const emailInput = screen.getByPlaceholderText('email');
    await userEvent.type(emailInput, 'usernameTest');
    const passwordInput = screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'passwordTest');
    const loginButton = screen.getByText('Masuk');

    // action
    await userEvent.click(loginButton);

    // assert
    expect(loginMock).toHaveBeenCalledWith({ email: 'usernameTest', password: 'passwordTest' });
  });
});