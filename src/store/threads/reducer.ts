import { ActionType, type ThreadAddAction, type ThreadAction } from './action';
import type { Threads } from '../../../types';

function threadsReducer
(threads: Threads[] = [], action: ThreadAction | ThreadAddAction): Threads[] {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    default:
      return threads;
  }
}

export default threadsReducer;
