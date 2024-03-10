import { ActionType } from './action';
import { type Threads } from '../../../types';

interface Action {
  type: ActionType
  payload: {
    threads?: Threads[]
    thread?: Threads
  }
}

function threadsReducer (threads: Threads[] = [], action: Action): Threads[] {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    default:
      return threads;
  }
}

export default threadsReducer;
