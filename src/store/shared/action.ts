import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { type Dispatch } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { type ThreadAction, receiveThreadsActionCreator } from '../threads/action';
import { type ReceiveUsersAction, receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads () {
  return async (dispatch: Dispatch<ReceiveUsersAction | ThreadAction>) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;