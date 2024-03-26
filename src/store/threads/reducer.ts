import { ActionType, type ThreadAction, type ThreadAddAction, type VoteAction } from './action';
import { type UnknownAction, type Threads } from '../../../types';

type Action =
  | ThreadAction
  | ThreadAddAction
  | VoteAction
  | UnknownAction;

function threadsReducer (threads: Threads[] = [], action: Action): Threads[] {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      if ('threads' in action.payload) {
        return action.payload.threads;
      }
      return threads;
    case ActionType.ADD_THREAD:
      if ('thread' in action.payload) {
        return [action.payload.thread, ...threads];
      }
      return threads;
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat(action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId)
          };
        }
        return thread;
      });
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.concat(action.payload.userId)
          };
        }
        return thread;
      });
    case ActionType.NEUTRALVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId)
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
