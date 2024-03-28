import React from 'react';
import LeaderboardItem from './LeaderboardItem';
import { type LeaderboardData } from '../../../types';

interface LeaderboardListProps {
  leaderboards: LeaderboardData[] | null
}

function LeaderboardList ({ leaderboards }: LeaderboardListProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      {
        (leaderboards?.map((leaderboard, index) => (
          <LeaderboardItem key={leaderboard.user?.id} index={index + 1} leaderboard={leaderboard} />
        )))
      }
    </div>
  );
}

export default LeaderboardList;