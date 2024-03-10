import { type Dispatch } from '@reduxjs/toolkit';
import type { Comment, Thread } from '../../../types';
import api from '../../utils/api';

enum ActionType {
  RECEIVE_THREAD_DETAIL = 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL = 'CLEAR_THREAD_DETAIL',
  UPVOTE_THREAD = 'UPVOTE_THREAD',
  DOWNVOTE_THREAD = 'DOWNVOTE_THREAD',
  NEUTRALVOTE_THREAD = 'NEUTRALVOTE_THREAD',
  CREATE_COMMENT = 'CREATE_COMMENT',
  UPVOTE_THREAD_COMMENT = 'UPVOTE_THREAD_COMMENT',
  DOWNVOTE_THREAD_COMMENT = 'DOWNVOTE_THREAD_COMMENT',
  NEUTRALVOTE_THREAD_COMMENT = 'NEUTRALVOTE_THREAD_COMMENT',
}

interface ReceiveThreadDetailAction {
  type: ActionType.RECEIVE_THREAD_DETAIL
  payload: {
    thread: Thread
  }
}

interface ClearThreadDetailAction {
  type: ActionType.CLEAR_THREAD_DETAIL
}

interface UpvoteThreadAction {
  type: ActionType.UPVOTE_THREAD
  payload: {
    threadId: string
    userId: string
  }
}

interface DownvoteThreadAction {
  type: ActionType.DOWNVOTE_THREAD
  payload: {
    threadId: string
    userId: string
  }
}

interface NeutralvoteThreadAction {
  type: ActionType.NEUTRALVOTE_THREAD
  payload: {
    threadId: string
    userId: string
  }
}

interface CreateCommentAction {
  type: ActionType.CREATE_COMMENT
  payload: {
    comment: Comment
  }
}

interface UpvoteThreadCommentAction {
  type: ActionType.UPVOTE_THREAD_COMMENT
  payload: {
    threadId: string
    commentId: string
    userId: string
  }
}

interface DownvoteThreadCommentAction {
  type: ActionType.DOWNVOTE_THREAD_COMMENT
  payload: {
    threadId: string
    commentId: string
    userId: string
  }
}

interface NeutralvoteThreadCommentAction {
  type: ActionType.NEUTRALVOTE_THREAD_COMMENT
  payload: {
    threadId: string
    commentId: string
    userId: string
  }
}

type ThreadAction =
  | ReceiveThreadDetailAction
  | ClearThreadDetailAction
  | UpvoteThreadAction
  | DownvoteThreadAction
  | NeutralvoteThreadAction
  | CreateCommentAction
  | UpvoteThreadCommentAction
  | DownvoteThreadCommentAction
  | NeutralvoteThreadCommentAction;

function receiveThreadDetailActionCreator (thread: Thread): ReceiveThreadDetailAction {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      thread
    }
  };
}

function clearThreadDetailActionCreator (): ClearThreadDetailAction {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL
  };
}

function upvoteThreadActionCreator
(threadId: string, userId: string): UpvoteThreadAction {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  };
}

function downvoteThreadActionCreator
(threadId: string, userId: string): DownvoteThreadAction {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  };
}

function neutralvoteThreadActionCreator
(threadId: string, userId: string): NeutralvoteThreadAction {
  return {
    type: ActionType.NEUTRALVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  };
}

function createCommentActionCreator
(comment: Comment): CreateCommentAction {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment
    }
  };
}

function upvoteThreadCommentActionCreator
(threadId: string, commentId: string, userId: string): UpvoteThreadCommentAction {
  return {
    type: ActionType.UPVOTE_THREAD_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    }
  };
}

function downvoteThreadCommentActionCreator
(threadId: string, commentId: string, userId: string): DownvoteThreadCommentAction {
  return {
    type: ActionType.DOWNVOTE_THREAD_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    }
  };
}

function neutralvoteThreadCommentActionCreator
(threadId: string, commentId: string, userId: string): NeutralvoteThreadCommentAction {
  return {
    type: ActionType.NEUTRALVOTE_THREAD_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    }
  };
}

function asyncReceiveDetailThread (threadId: string) {
  return async (dispatch: Dispatch<ThreadAction>) => {
    try {
      dispatch(clearThreadDetailActionCreator());
      const thread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleVoteThread
({ threadId, userId, voteType }: { threadId: string, userId: string, voteType: string }) {
  return async (dispatch: Dispatch<ThreadAction>) => {
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
        if (downVoteStatus === 'success') {
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
function asyncCreateComment (threadId: string, content: string) {
  return async (dispatch: Dispatch<ThreadAction>) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleVoteComment
({ threadId, commentId, userId, voteType }:
{ threadId: string, commentId: string, userId: string, voteType: string }) {
  return async (dispatch: Dispatch<ThreadAction>) => {
    switch (voteType) {
      case 'upVote':
        dispatch(upvoteThreadCommentActionCreator(threadId, commentId, userId));
        const { status: upVote } = await api.upvoteThreadComment(threadId, commentId);
        if (upVote !== 'success') {
          dispatch(neutralvoteThreadCommentActionCreator(threadId, commentId, userId));
        }
        break;
      case 'downVote':
        dispatch(downvoteThreadCommentActionCreator(threadId, commentId, userId));
        const { status: downVote } = await api.downvoteThreadComment(threadId, commentId);
        if (downVote !== 'success') {
          dispatch(neutralvoteThreadCommentActionCreator(threadId, commentId, userId));
        }
        break;
      default:
        const { status: neutralVote } = await api.neutralvoteThreadComment(threadId, commentId);
        if (neutralVote === 'success') {
          dispatch(neutralvoteThreadCommentActionCreator(threadId, commentId, userId));
        }
        break;
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralvoteThreadActionCreator,
  createCommentActionCreator,
  upvoteThreadCommentActionCreator,
  downvoteThreadCommentActionCreator,
  neutralvoteThreadCommentActionCreator,
  asyncReceiveDetailThread,
  asyncToggleVoteThread,
  asyncCreateComment,
  asyncToggleVoteComment
};

export type {
  ThreadAction
};
