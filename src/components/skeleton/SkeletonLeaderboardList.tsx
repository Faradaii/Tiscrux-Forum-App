import SkeletonLeaderboardItem from './SkeletonLeaderboardItem';

function SkeletonLeaderboardList (): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <SkeletonLeaderboardItem />
      <SkeletonLeaderboardItem />
      <SkeletonLeaderboardItem />
      <SkeletonLeaderboardItem />
      <SkeletonLeaderboardItem />
      <SkeletonLeaderboardItem />
      <SkeletonLeaderboardItem />
    </div>
  );
}

export default SkeletonLeaderboardList;