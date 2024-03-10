import { type Dispatch } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { type LeaderboardData } from '../../../types';

enum ActionType {
  GET_LEADERBOARD = 'GET_LEADERBOARD',
  CLEAR_LEADERBOARD = 'CLEAR_LEADERBOARD',
}

interface GetLeaderboardAction {
  type: ActionType.GET_LEADERBOARD
  payload: {
    leaderboards: LeaderboardData[]
  }
}

interface ClearLeaderboardAction {
  type: ActionType.CLEAR_LEADERBOARD
}

type LeaderboardAction = GetLeaderboardAction | ClearLeaderboardAction;

function getLeaderboardActionCreator (leaderboards: LeaderboardData[]): GetLeaderboardAction {
  return {
    type: ActionType.GET_LEADERBOARD,
    payload: {
      leaderboards
    }
  };
}

function clearLeaderboardActionCreator (): ClearLeaderboardAction {
  return {
    type: ActionType.CLEAR_LEADERBOARD
  };
}

function asyncGetLeaderboard () {
  return async (dispatch: Dispatch<LeaderboardAction>) => {
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(getLeaderboardActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  getLeaderboardActionCreator,
  clearLeaderboardActionCreator,
  asyncGetLeaderboard
};