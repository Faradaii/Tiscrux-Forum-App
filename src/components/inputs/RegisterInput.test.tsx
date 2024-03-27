/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should handle name typing correctly
 *   - should call register function when submit button is clicked
 */
import { render, screen, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInputComponent', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle username typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const usernameInput = screen.getByPlaceholderText('email');

    // action
    await userEvent.type(usernameInput, 'usernameTest');

    // assert
    expect(usernameInput).toHaveValue('usernameTest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('password');

    // action
    await userEvent.type(passwordInput, 'passwordTest');

    // assert
    expect(passwordInput).toHaveValue('passwordTest');
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText('name');

    // action
    await userEvent.type(nameInput, 'Jhon Doe');

    // assert
    expect(nameInput).toHaveValue('Jhon Doe');
  });

  it('should call register function when submit button is clicked', async () => {
    // arrange
    const registerMock = jest.fn();
    render(<RegisterInput register={registerMock} />);
    const emailInput = screen.getByPlaceholderText('email');
    await userEvent.type(emailInput, 'usernameTest');
    const passwordInput = screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'passwordTest');
    const nameInput = screen.getByPlaceholderText('name');
    await userEvent.type(nameInput, 'Jhon Doe');
    const registerButton = screen.getByText('Buat Akun');

    // action
    await userEvent.click(registerButton);

    // assert
    expect(registerMock).toHaveBeenCalledWith({ email: 'usernameTest', password: 'passwordTest', name: 'Jhon Doe' });
  });
});