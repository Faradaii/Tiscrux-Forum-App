import { type Dispatch } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Threads } from '../../../types';

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
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleVoteThread
({ threadId, userId, voteType }: { threadId: string, userId: string, voteType: string }) {
  return async (dispatch: Dispatch<VoteAction>) => {
    switch (voteType) {
      case 'upVote':
        dispatch(upvoteThreadActionCreator(threadId, userId));
        const { status: upVoteStatus } = await api.upvoteThread(threadId);
        if (upVoteStatus !== 'success') {
          dispatch(neutralvoteThreadActionCreator(threadId, userId));
        }
        break;
      case 'downVote':
        dispatch(downvoteThreadActionCreator(threadId, userId));
        const { status: downVoteStatus } = await api.downvoteThread(threadId);
        if (downVoteStatus !== 'success') {
          dispatch(neutralvoteThreadActionCreator(threadId, userId));
        }
        break;
      default:
        const { status: neutralVoteStatus } = await api.neutralvoteThread(threadId);
        if (neutralVoteStatus === 'success') {
          dispatch(neutralvoteThreadActionCreator(threadId, userId));
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
