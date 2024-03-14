import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../../components/leaderboards/LeaderboardList';
import { asyncGetLeaderboard } from '../../store/leaderboards/action';
import CruxCard from '../../components/card/CruxCard';
import type { AppDispatch, RootState } from '../../store/store';
import SkeletonLeaderboardList from '@/components/skeleton/SkeletonLeaderboardList';

function LeaderboardPage (): JSX.Element {
  const leaderboards = useSelector((state: RootState) => state.leaderboards);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="grow h-screen p-5 max-[768px]:w-full">
        <h1 className="font-semibold text-3xl sticky text-center md:text-start">Leaderboard</h1>
        <div className="py-5">
          {
            ((leaderboards?.length !== 0))
              ? <LeaderboardList leaderboards={leaderboards} />
              : <SkeletonLeaderboardList />
          }
        </div>
      </div>
      <div className="hidden md:block h-screen p-5 w-max-30">
        <CruxCard typeCard="leaderboardTips" />
      </div>
    </div>
  );
}

export default LeaderboardPage;