import { type Dispatch } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { receiveThreadsActionCreator, ReceiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator, ReceiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads () {
  return async (dispatch: Dispatch<ReceiveUsersActionCreator | ReceiveThreadsActionCreator>) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}

export default asyncPopulateUsersAndThreads;