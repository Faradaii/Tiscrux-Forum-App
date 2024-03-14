import { type Dispatch } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator, type SetAuthUserAction } from '../authUser/action';

export enum ActionType {
  SET_IS_PRELOAD = 'SET_IS_PRELOAD',
}

interface SetIsPreloadAction {
  type: ActionType.SET_IS_PRELOAD
  payload: {
    isPreload: boolean
  }
}

type PreloadAction = SetIsPreloadAction | SetAuthUserAction;

export function setIsPreloadActionCreator (isPreload: boolean): SetIsPreloadAction {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload
    }
  };
}

export function asyncPreloadProcess () {
  return async (dispatch: Dispatch<PreloadAction>) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      dispatch(setIsPreloadActionCreator(false));
    } catch (e) {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}
