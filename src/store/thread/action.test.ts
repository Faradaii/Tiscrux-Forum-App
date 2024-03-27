/**
 * skenario test
 *
 * - asyncReceiveDetailThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly and call alert when data fetching failed
 *
 * - asyncCreateComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly and call alert when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import { asyncCreateComment, asyncReceiveDetailThread, clearThreadDetailActionCreator, createCommentActionCreator, receiveThreadDetailActionCreator } from './action';

const fakeReceiveDetailThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg'
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: []
    }
  ]
};

const fakeCreateCommentResponse = {
  id: 'comment-1',
  content: 'Ini adalah komentar pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com'
  }
};

const fakeCommentInput = {
  threadId: 'thread-1',
  content: 'test comment'
};

const fakeErrorResponse = new Error('Something wrong happened');

describe('asyncReceiveDetailThread thunk', () => {
  let originalGetThreadDetail: typeof api.getThreadDetail;

  beforeEach(() => {
    originalGetThreadDetail = api.getThreadDetail;
  });
  afterEach(() => {
    api.getThreadDetail = originalGetThreadDetail;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getThreadDetail = jest.fn().mockResolvedValue(fakeReceiveDetailThread);

    const dispatch = jest.fn();

    // action
    await asyncReceiveDetailThread('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch)
      .toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeReceiveDetailThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getThreadDetail = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncReceiveDetailThread('thread-2')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncCreateComment thunk', () => {
  let originalCreateComment: typeof api.createComment;

  beforeEach(() => {
    originalCreateComment = api.createComment;
  });
  afterEach(() => {
    api.createComment = originalCreateComment;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.createComment = jest.fn().mockResolvedValue(fakeCreateCommentResponse);

    const dispatch = jest.fn();

    // action
    await asyncCreateComment(fakeCommentInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(createCommentActionCreator(fakeCreateCommentResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.createComment = jest.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncCreateComment(fakeCommentInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});