import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../../components/leaderboards/LeaderboardList';
import { asyncGetLeaderboard } from '../../store/leaderboards/action';
import CruxCard from '../../components/card/CruxCard';
import type { RootState } from '../../store/store';

function LeaderboardPage (): JSX.Element {
  const leaderboards = useSelector((state: RootState) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="grow h-screen p-5 w-max-70">
        <h1 className="font-semibold text-3xl sticky">Leaderboard</h1>
        <div className="py-5">
          <LeaderboardList leaderboards={leaderboards} />
        </div>
      </div>
      <div className="h-screen p-5 w-max-30">
        <CruxCard typeCard="leaderboardTips" />
      </div>
    </div>
  );
}

export default LeaderboardPage;