/**
 * skenario test
 *
 * - asyncGetLeaderboard thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly and call alert when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import { asyncGetLeaderboard, getLeaderboardActionCreator } from './action';

const fakeGetLeaderboardResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 5
  }
];

const fakeErrorResponse = new Error('Something wrong happened');

describe('asyncGetLeaderboard thunk', () => {
  let originalGetLeaderboards: typeof api.getLeaderboards;

  beforeEach(() => {
    originalGetLeaderboards = api.getLeaderboards;
  });
  afterEach(() => {
    api.getLeaderboards = originalGetLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getLeaderboards = jest.fn().mockResolvedValue(fakeGetLeaderboardResponse);

    const dispatch = jest.fn();

    // action
    await asyncGetLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(getLeaderboardActionCreator(fakeGetLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getLeaderboards = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncGetLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});