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
        <h1 className="font-bold md:text-5xl text-2xl w-2/12 text-center">{index}</h1>
        <div className="flex gap-3 px-2">
          <img src={user?.avatar} alt={user?.id} className="rounded-full w-12 h-12" />
          <div>
            <h2 className="md:text-xl text-base font-semibold">{user?.name}</h2>
            <h2>
              @
              {user?.id}
            </h2>
          </div>
        </div>
      </div>
      <h1 className="font-bold md:text-2xl text-lg">{score}</h1>
    </div>
  );
}

export default LeaderboardItem;
