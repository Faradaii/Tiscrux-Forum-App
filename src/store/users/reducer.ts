import { ActionType, type UserAction } from './action';
import type { UnknownAction, User } from '../../../types';

type action = UserAction | UnknownAction;

function usersReducer (users: User[] = [], action: action): User[] {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
}

export default usersReducer;
