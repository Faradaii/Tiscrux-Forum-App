function SkeletonCommentInput (): JSX.Element {
  return (
    <div className="min-h-xs flex gap-3 p-3 animate-pulse">
      <div className="min-w-12 min-h-12 rounded-full dark:bg-dark-2-light bg-gray-100" />
      <div className="grow bg-transparent outline-none px-2" />
      <div className="dark:bg-dark-2-light bg-gray-100 text-white min-w-20 min-h-8 rounded-lg" />
    </div>
  );
}

export default SkeletonCommentInput;