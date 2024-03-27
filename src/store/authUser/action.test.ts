/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

const fakeGetOwnProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
};

const fakeLoginInput = {
  email: 'john@example.com',
  password: '123456'
};

const fakeLoginResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw'
};

const fakeErrorResponse = new Error('Something wrong happened');

describe('asyncSetAuthUser thunk', () => {
  let originalLogin: typeof api.login;
  let originalGetOwnProfile: typeof api.getOwnProfile;

  beforeEach(() => {
    originalLogin = api.login;
    originalGetOwnProfile = api.getOwnProfile;
  });
  afterEach(() => {
    api.login = originalLogin;
    api.getOwnProfile = originalGetOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.login = jest.fn().mockResolvedValue(fakeLoginResponse);
    api.getOwnProfile = jest.fn().mockResolvedValue(fakeGetOwnProfileResponse);

    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser(fakeLoginInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.login = jest.fn().mockRejectedValue(fakeErrorResponse);
    api.getOwnProfile = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncSetAuthUser(fakeLoginInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});