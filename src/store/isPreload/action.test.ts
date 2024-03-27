/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';

const fakeGetOwnProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
};

const fakeErrorResponse = new Error('Something wrong happened');

describe('asyncPreloadProcess thunk', () => {
  let originalGetOwnProfile: typeof api.getOwnProfile;

  beforeEach(() => {
    originalGetOwnProfile = api.getOwnProfile;
  });
  afterEach(() => {
    api.getOwnProfile = originalGetOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getOwnProfile = jest.fn().mockResolvedValue(fakeGetOwnProfileResponse);

    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    api.getOwnProfile = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});