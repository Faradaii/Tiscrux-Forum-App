/**
* test scenario for threadDetailReducer
*
* - threadDetail functions
*  - should return the initial state when given by unknown action
*  - should return the thread when given by RECEIVE_THREAD_DETAIL action
*  - should return cleared thread when given by CLEAR_THREAD_DETAIL action
*  - should return thread with upvoted thread when given by UPVOTE_THREAD action
*  - should return thread with downvoted thread when given by DOWNVOTE_THREAD action
*  - should return thread with neutralvoted thread when given by NEUTRALVOTE_THREAD action
*  - should return thread with new comment when given by CREATE_COMMENT action
*  - should return thread with upvoted comment when given by UPVOTE_THREAD_COMMENT action
*  - should return thread with downvoted comment when given by DOWNVOTE_THREAD_COMMENT action
*  - should return thread with neutralvoted comment when given by NEUTRALVOTE_THREAD_COMMENT action
*
*/
import { type Thread } from '../../../types';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        thread: {
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
        }
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.thread);
  });

  it('should return cleared thread when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'CLEAR_THREAD_DETAIL'
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return thread with upvoted thread when given by UPVOTED_THREAD action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1'
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    const nextState1 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, upVotesBy: ['users-1'] });
    expect(nextState1).toEqual({ ...initialState, upVotesBy: [] });
  });

  it('should return thread with downvoted thread when given by DOWNVOTE_THREAD action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1'
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    const nextState1 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, downVotesBy: ['users-1'] });
    expect(nextState1).toEqual({ ...initialState, downVotesBy: [] });
  });

  it('should return thread with downvoted thread when given by NEUTRALVOTE_THREAD action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'NEUTRALVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1'
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, upVotesBy: [], downVotesBy: [] });
  });

  it('should return thread with new comment when given by CREATE_COMMENT action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'CREATE_COMMENT',
      payload: {
        comment: {
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
        }
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState)
      .toEqual({ ...initialState, comments: [action.payload.comment, ...initialState.comments] });
  });

  it('should return thread with upvoted comment when given by UPVOTE_THREAD_COMMENT action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'UPVOTE_THREAD_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-1'
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    const nextState1 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState)
      .toEqual({ ...initialState, comments: [{ ...initialState.comments[0], upVotesBy: ['users-1'] }] });
    expect(nextState1)
      .toEqual({ ...nextState, comments: [{ ...nextState?.comments[0], upVotesBy: [] }] });
  });

  it('should return thread with downvoted comment when given by DOWNVOTE_THREAD_COMMENT action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'DOWNVOTE_THREAD_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-1'
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    const nextState1 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState)
      .toEqual({ ...initialState, comments: [{ ...initialState.comments[0], downVotesBy: ['users-1'] }] });
    expect(nextState1)
      .toEqual({ ...nextState, comments: [{ ...nextState?.comments[0], downVotesBy: [] }] });
  });

  it('should return thread with neutralvoted comment when given by NEUTRALVOTE_THREAD_COMMENT action', () => {
    // arrange
    const initialState: Thread = {
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
    const action = {
      type: 'NEUTRALVOTE_THREAD_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-1'
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState)
      .toEqual(
        {
          ...initialState,
          comments: [{ ...initialState.comments[0], upVotesBy: [], downVotesBy: [] }]
        }
      );
  });
});