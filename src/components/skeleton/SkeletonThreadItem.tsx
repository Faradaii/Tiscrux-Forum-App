function SkeletonThreadItem (): JSX.Element {
  return (
    <div className="border flex p-5 m-5 rounded-md dark:bg-dark-2-light bg-gray-200">
      <div>
        <div className="dark:bg-dark-2-light bg-gray-100 min-h-14 max-h-14 min-w-14 max-w-14 me-4 rounded-full" />
      </div>
      <div className="grow me-3 rounded-sm">
        <div className="flex">
          <div className="grow flex flex-col gap-2">
            <div className="min-h-5 max-w-xs dark:bg-dark-2-light bg-gray-100 rounded-lg " />
            <div className="min-h-5 max-w-20 dark:bg-dark-2-light bg-gray-100 rounded-lg " />
          </div>
        </div>
        <div className="my-5 flex flex-col gap-3">
          <div className="min-h-6 max-w-xl dark:bg-dark-2-light bg-gray-100 rounded-lg" />
          <div className="min-h-6 min-w-10">
            <div className="mt-1 h-4 leading-loose dark:bg-dark-2-light bg-gray-100 rounded-md" />
            <div className="mt-1 h-4 max-w-lg leading-loose dark:bg-dark-2-light bg-gray-100 rounded-md" />
          </div>
          <div className="min-h-4 max-w-20 dark:bg-dark-2-light bg-gray-100 rounded-lg" />
        </div>
        <div className="flex gap-3 justify-end mt-4 mb-2">
          <div className="min-h-6 min-w-10 dark:bg-dark-2-light bg-gray-100 rounded-lg" />
          <div className="min-h-6 min-w-10 dark:bg-dark-2-light bg-gray-100 rounded-lg" />
          <div className="min-h-6 min-w-10 dark:bg-dark-2-light bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonThreadItem;