/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly and call alert when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeRegisterResponse = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
};

const fakeRegisterInput = {
  name: 'John Doe',
  email: 'john@example.com',
  password: '123456'
};

const fakeErrorResponse = new Error('Something wrong happened');

describe('asyncRegisterUser thunk', () => {
  let originalRegister: typeof api.register;

  beforeEach(() => {
    originalRegister = api.register;
  });
  afterEach(() => {
    api.register = originalRegister;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.register = jest.fn().mockResolvedValue(fakeRegisterResponse);

    const dispatch = jest.fn();

    // action
    await asyncRegisterUser(fakeRegisterInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.register = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncRegisterUser(fakeRegisterInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});