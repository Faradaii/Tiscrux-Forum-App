import { type UnknownAction, type LeaderboardData } from '../../../types';
import { ActionType } from './action';

interface GetLeaderboardAction {
  type: ActionType.GET_LEADERBOARD
  payload: {
    leaderboards: LeaderboardData[]
  }
}

interface ClearLeaderboardAction {
  type: ActionType.CLEAR_LEADERBOARD
}

type Action = GetLeaderboardAction | ClearLeaderboardAction | UnknownAction;

function leaderboardsReducer
(leaderboards: LeaderboardData[] = [], action: Action): LeaderboardData[] | null {
  switch (action.type) {
    case ActionType.GET_LEADERBOARD:
      return action.payload.leaderboards;
    case ActionType.CLEAR_LEADERBOARD:
      return [];
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
