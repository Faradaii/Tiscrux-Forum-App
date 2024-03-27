/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly and call alert when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import asyncPopulateUsersAndThreads from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeGetAllUsersResponse = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg'
  },
  {
    id: 'users-2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg'
  },
  {
    id: 'users-3',
    name: 'Si Fulan',
    email: 'fulan@example.com',
    avatar: 'https://generated-image-url.jpg'
  }
];

const fakeGetAllThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
  }
];

const fakeErrorResponse = new Error('Something wrong happened');

describe('asyncPopulateUsersAndThreads thunk', () => {
  let originalGetAllThreads: typeof api.getAllThreads;
  let originalGetAllUsers: typeof api.getAllUsers;

  beforeEach(() => {
    originalGetAllThreads = api.getAllThreads;
    originalGetAllUsers = api.getAllUsers;
  });
  afterEach(() => {
    api.getAllThreads = originalGetAllThreads;
    api.getAllUsers = originalGetAllUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllThreads = jest.fn().mockResolvedValue(fakeGetAllThreadsResponse);
    api.getAllUsers = jest.fn().mockResolvedValue(fakeGetAllUsersResponse);

    const dispatch = jest.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeGetAllThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeGetAllUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getAllThreads = jest.fn().mockRejectedValue(fakeErrorResponse);
    api.getAllUsers = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});