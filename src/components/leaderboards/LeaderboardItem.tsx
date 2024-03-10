import React from 'react';
import type { LeaderboardData } from '../../../types';

interface LeaderboardItemProps {
  index: number
  leaderboard: LeaderboardData
}

function LeaderboardItem ({
  index, leaderboard: { user, score }
}: LeaderboardItemProps): JSX.Element {
  return (
    <div className="flex justify-between gap-5 items-center p-3">
      <div className="flex w-full">
        <h1 className="font-bold text-5xl w-2/12 text-center">{index}</h1>
        <div className="flex gap-3 px-2">
          <img src={user.avatar} alt={user.id} className="rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <h2>
              @
              {user.id}
            </h2>
          </div>
        </div>
      </div>
      <h1 className="font-bold text-2xl">{score}</h1>
    </div>
  );
}

export default LeaderboardItem;
