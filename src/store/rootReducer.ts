import { combineReducers } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import threadReducer from './thread/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';

export const rootReducer = combineReducers({
  authUser: authUserReducer,
  isPreload: isPreloadReducer,
  leaderboards: leaderboardsReducer,
  thread: threadReducer,
  threads: threadsReducer,
  users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;