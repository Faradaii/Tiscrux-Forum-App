import { type Dispatch } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import type { Thread, Threads } from '../../../types';
import { type RootState } from '../store';

enum ActionType {
  RECEIVE_THREADS = 'RECEIVE_THREADS',
  ADD_THREAD = 'ADD_THREAD',
  UPVOTE_THREAD = 'UPVOTE_THREAD',
  DOWNVOTE_THREAD = 'DOWNVOTE_THREAD',
  NEUTRALVOTE_THREAD = 'NEUTRALVOTE_THREAD',
}

export interface ThreadAction {
  type: ActionType.RECEIVE_THREADS
  payload: {
    threads: Threads[]
  }
}

export interface ThreadAddAction {
  type: ActionType.ADD_THREAD
  payload: {
    thread: Threads
  }
}

export interface VoteAction {
  type: ActionType
  payload: {
    threadId: string
    userId: string
  }
}

function receiveThreadsActionCreator (threads: Threads[]): ThreadAction {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  };
}

function addThreadActionCreator (thread: Threads): ThreadAddAction {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  };
}

function upvoteThreadActionCreator (threadId: string, userId: string): VoteAction {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  };
}

function downvoteThreadActionCreator (threadId: string, userId: string): VoteAction {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  };
}

function neutralvoteThreadActionCreator (threadId: string, userId: string): VoteAction {
  return {
    type: ActionType.NEUTRALVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  };
}

function asyncAddThread ({ title = '', body = '', category = '' }: { title?: string, body?: string, category?: string }) {
  return async (dispatch: Dispatch<ThreadAddAction>) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleVoteThread
({ threadId, userId, voteType }: { threadId: string, userId: string, voteType: string }) {
  return async (dispatch: Dispatch<VoteAction>, getState: RootState) => {
    const store = getState();
    const { upVotesBy, downVotesBy } = store.threads
      .find((thread: Thread) => thread.id === threadId);

    switch (voteType) {
      case 'upVote':
        dispatch(upvoteThreadActionCreator(threadId, userId));

        try {
          await api.upvoteThread(threadId);
        } catch (error) {
          if (downVotesBy.includes(userId)) {
            dispatch(downvoteThreadActionCreator(threadId, userId));
          } else {
            dispatch(neutralvoteThreadActionCreator(threadId, userId));
          }
        }
        break;
      case 'downVote':
        dispatch(downvoteThreadActionCreator(threadId, userId));

        try {
          await api.downvoteThread(threadId);
        } catch (error) {
          if (upVotesBy.includes(userId)) {
            dispatch(upvoteThreadActionCreator(threadId, userId));
          } else {
            dispatch(neutralvoteThreadActionCreator(threadId, userId));
          }
        }
        break;
      default:
        dispatch(neutralvoteThreadActionCreator(threadId, userId));
        try {
          await api.neutralvoteThread(threadId);
        } catch (error) {
          if (upVotesBy.includes(userId)) {
            dispatch(upvoteThreadActionCreator(threadId, userId));
          }
          if (downVotesBy.includes(userId)) {
            dispatch(downvoteThreadActionCreator(threadId, userId));
          }
        }
        break;
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread
};
