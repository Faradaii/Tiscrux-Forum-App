/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when submit button is clicked
 */
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
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
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByText('Masuk');

    // action
    await userEvent.type(emailInput, 'usernameTest');
    await userEvent.type(passwordInput, 'passwordTest');
    await waitFor(() => {
      fireEvent.submit(submitButton);
    });

    // assert
    expect(loginMock).toHaveBeenCalledWith({ email: 'usernameTest', password: 'passwordTest' });
  });
});