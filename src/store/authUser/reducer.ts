import { ActionType, type SetAuthUserAction, type UnsetAuthUserAction } from './action';
import type { User } from '../../../types';

type AuthUserState = User | null;

function authUserReducer
(
  authUser: AuthUserState = null,
  action: SetAuthUserAction | UnsetAuthUserAction
): AuthUserState {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;
    case 'UNSET_AUTH_USER':
      return null;
    default:
      return authUser;
  }
}

export default authUserReducer;
