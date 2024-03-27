/**
 * skenario test
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly and call alert when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { addThreadActionCreator, asyncAddThread } from './action';

const fakeCreateThreadResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0
};

const fakeAddThreadInput = {
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General'
};

const fakeErrorResponse = new Error('Something wrong happened');

describe('asyncAddThread thunk', () => {
  let originalCreateThread: typeof api.createThread;

  beforeEach(() => {
    originalCreateThread = api.createThread;
  });
  afterEach(() => {
    api.createThread = originalCreateThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.createThread = jest.fn().mockResolvedValue(fakeCreateThreadResponse);

    const dispatch = jest.fn();

    // action
    await asyncAddThread(fakeAddThreadInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeCreateThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.createThread = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncAddThread(fakeAddThreadInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});