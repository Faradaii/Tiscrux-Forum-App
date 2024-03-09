import { type LeaderboardData } from '../../../types';
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

type LeaderboardAction = GetLeaderboardAction | ClearLeaderboardAction;

function leaderboardsReducer
(leaderboards: LeaderboardData[] | null = [], action: LeaderboardAction): LeaderboardData[] | null {
  switch (action.type) {
    case ActionType.GET_LEADERBOARD:
      return action.payload.leaderboards;
    case ActionType.CLEAR_LEADERBOARD:
      return null;
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
