import { ActionType, type ThreadAction } from './action';
import type { ThreadDetail } from '../../../types';

function threadDetailReducer
(detailThread: ThreadDetail | null = null, action: ThreadAction): ThreadDetail | null {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.detailThread;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.UPVOTE_THREAD:
      if (detailThread == null) return detailThread;
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy.concat(action.payload.userId),
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId)
      };
    case ActionType.DOWNVOTE_THREAD:
      if (detailThread == null) return detailThread;
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.downVotesBy.concat(action.payload.userId)
      };
    case ActionType.NEUTRALVOTE_THREAD:
      if (detailThread == null) return detailThread;
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
      };
    case ActionType.CREATE_COMMENT:
      if (detailThread == null) return detailThread;
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments]
      };
    case ActionType.UPVOTE_THREAD_COMMENT:
      if (detailThread == null) return detailThread;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
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
      if (detailThread == null) return detailThread;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
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
      if (detailThread == null) return detailThread;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
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
      return detailThread;
  }
}

export default threadDetailReducer;
