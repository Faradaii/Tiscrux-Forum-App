function SkeletonThreadCategory (): JSX.Element {
  return (
    <>
      <div className="flex w-5/6 m-auto rounded-md animate-pulse px-2">
        <div className="my-3 grow flex flex-col gap-1">
          <div className="min-h-4 max-w-20 dark:bg-dark-2-light bg-gray-100 rounded-sm" />
          <div className="min-h-3 max-w-10 dark:bg-dark-2-light bg-gray-100 rounded-sm" />
        </div>
      </div>
      <div className="flex w-5/6 m-auto rounded-md animate-pulse px-2">
        <div className="my-3 grow flex flex-col gap-1">
          <div className="min-h-4 max-w-20 dark:bg-dark-2-light bg-gray-100 rounded-sm" />
          <div className="min-h-3 max-w-10 dark:bg-dark-2-light bg-gray-100 rounded-sm" />
        </div>
      </div>
    </>
  );
}

export default SkeletonThreadCategory;