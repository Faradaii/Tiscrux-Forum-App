function SkeletonCommentItem (): JSX.Element {
  return (
    <div className="flex gap-5 items-start py-3 px-5 dark:bg-dark-2-light bg-gray-200 rounded-lg animate-pulse">
      <div className="flex gap-3 max-h-10 items-center">
        <div className="min-w-10 min-h-10 dark:bg-dark-2-light bg-gray-100 rounded-full" />
      </div>
      <div className="w-full mt flex flex-col gap-2">
        <div className="grow flex gap-2 justify-between">
          <div className="min-h-5 w-2/6 text-lg dark:bg-dark-2-light bg-gray-100" />
          <div className="min-h-4 w-1/6 text-sm font-light dark:bg-dark-2-light bg-gray-100" />
        </div>
        <div className="min-h-4 w-3/4 dark:bg-dark-2-light bg-gray-100 rounded-lg " />
        <div className="flex w-full gap-3 justify-end">
          <div className="min-h-4 min-w-8 dark:bg-dark-2-light bg-gray-100 rounded-sm" />
          <div className="min-h-4 min-w-8 dark:bg-dark-2-light bg-gray-100 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCommentItem;
