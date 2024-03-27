import type { Dispatch } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import type { LoadingBarAction, User } from '../../../types';
import api from '../../utils/api';

enum ActionType {
  RECEIVE_USERS = 'RECEIVE_USERS',
}

export interface ReceiveUsersAction {
  type: ActionType.RECEIVE_USERS
  payload: {
    users: User[]
  }
}

type UserAction = ReceiveUsersAction;

function receiveUsersActionCreator (users: User[]): ReceiveUsersAction {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users
    }
  };
}

function asyncRegisterUser
({ email, name, password }: { email: string, name: string, password: string }) {
  return async (dispatch: Dispatch<UserAction | LoadingBarAction>) => {
    dispatch(showLoading());
    try {
      await api.register({ email, name, password });
    } catch (error: any) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser
};

export type {
  UserAction
};
