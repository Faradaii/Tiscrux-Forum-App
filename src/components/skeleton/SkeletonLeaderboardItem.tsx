function SkeletonLeaderboardItem (): JSX.Element {
  return (
    <div className="rounded-lg min-h-16 flex justify-between gap-5 items-center p-3 dark:bg-dark-2-light bg-gray-200">
      <div className="flex w-full">
        <div className="font-bold text-5xl w-2/12 text-center">
          <div className="dark:bg-dark-2-light bg-gray-100 w-1/2 h-full m-auto" />
        </div>
        <div className="w-full flex gap-3 px-2">
          <div className="rounded-full min-w-14 min-h-14 dark:bg-dark-2-light bg-gray-100" />
          <div className="grow flex flex-col gap-2">
            <div className="dark:bg-dark-2-light bg-gray-100 w-3/4 h-6" />
            <div className="dark:bg-dark-2-light bg-gray-100 w-2/4 h-4" />
          </div>
        </div>
      </div>
      <div className="w-10 h-12 dark:bg-dark-2-light bg-gray-100" />
    </div>
  );
}

export default SkeletonLeaderboardItem;
