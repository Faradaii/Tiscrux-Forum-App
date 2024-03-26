import { type Dispatch } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import type { LoadingBarAction, User } from '../../../types';
import api from '../../utils/api';

enum ActionType {
  SET_AUTH_USER = 'SET_AUTH_USER',
  UNSET_AUTH_USER = 'UNSET_AUTH_USER',
}

interface SetAuthUserAction {
  type: ActionType.SET_AUTH_USER
  payload: {
    authUser: User
  }
}

interface UnsetAuthUserAction {
  type: ActionType.UNSET_AUTH_USER
}

function setAuthUserActionCreator (authUser: User): SetAuthUserAction {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  };
}

function unsetAuthUserActionCreator (): UnsetAuthUserAction {
  return {
    type: ActionType.UNSET_AUTH_USER
  };
}

function asyncSetAuthUser ({ email, password }: { email: string, password: string }) {
  return async (dispatch: Dispatch<SetAuthUserAction | LoadingBarAction>) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error: any) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser () {
  return (dispatch: Dispatch<UnsetAuthUserAction>) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
};

export type {
  SetAuthUserAction,
  UnsetAuthUserAction
};
