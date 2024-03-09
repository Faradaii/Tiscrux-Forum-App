import { ActionType, type UserAction } from './action';
import type { User } from '../../../types';

function usersReducer (users: User[] = [], action: UserAction): User[] {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
}

export default usersReducer;
