import { ActionType, type ThreadAction } from './action';
import type { Thread } from '../../../types';

function threadDetailReducer
(thread: Thread | null = null, action: ThreadAction): Thread | null {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.thread;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.UPVOTE_THREAD:
      if (thread == null) return thread;
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.includes(action.payload.userId)
          ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
          : thread.upVotesBy.concat(action.payload.userId),
        downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId)
      };
    case ActionType.DOWNVOTE_THREAD:
      if (thread == null) return thread;
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: thread.downVotesBy.includes(action.payload.userId)
          ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
          : thread.downVotesBy.concat(action.payload.userId)
      };
    case ActionType.NEUTRALVOTE_THREAD:
      if (thread == null) return thread;
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId)
      };
    case ActionType.CREATE_COMMENT:
      if (thread == null) return thread;
      return {
        ...thread,
        comments: [action.payload.comment, ...thread.comments]
      };
    case ActionType.UPVOTE_THREAD_COMMENT:
      if (thread == null) return thread;
      return {
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat(action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId)
            };
          }
          return comment;
        })
      };
    case ActionType.DOWNVOTE_THREAD_COMMENT:
      if (thread == null) return thread;
      return {
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                : comment.downVotesBy.concat(action.payload.userId)
            };
          }
          return comment;
        })
      };
    case ActionType.NEUTRALVOTE_THREAD_COMMENT:
      if (thread == null) return thread;
      return {
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId)
            };
          }
          return comment;
        })
      };
    default:
      return thread;
  }
}

export default threadDetailReducer;
