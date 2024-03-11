import SkeletonThreadItem from './SkeletonThreadItem';

function SkeletonThreadList (): JSX.Element {
  return (
    <div className="animate-pulse">
      <SkeletonThreadItem />
      <SkeletonThreadItem />
      <SkeletonThreadItem />
    </div>
  );
}

export default SkeletonThreadList;