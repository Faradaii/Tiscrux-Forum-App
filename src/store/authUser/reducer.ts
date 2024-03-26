import { ActionType, type SetAuthUserAction, type UnsetAuthUserAction } from './action';
import type { UnknownAction, User } from '../../../types';

type AuthUserState = User | null;

type action = SetAuthUserAction | UnsetAuthUserAction | UnknownAction;

function authUserReducer
(authUser: AuthUserState = null, action: action):
AuthUserState {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;
    case ActionType.UNSET_AUTH_USER:
      return null;
    default:
      return authUser;
  }
}

export default authUserReducer;
