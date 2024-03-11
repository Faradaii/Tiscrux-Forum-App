import SkeletonCommentInput from "./SkeletonCommentInput";
import SkeletonCommentItem from "./SkeletonCommentItem";

function SkeletonThreadDetail (): JSX.Element {
  return (
    <div className="p-5 m-3 rounded-md flex flex-col gap-2">
      <div className="px-4 py-2 dark:bg-dark-2-light bg-gray-200 rounded-lg">
        <div className="grow py-2 flex items-center px-3">
          <div className="w-14 h-14 me-4 rounded-full dark:bg-dark-2-light bg-gray-100" />
          <div className="grow flex flex-col gap-2">
            <div className="font-semibold text-lg min-h-6 max-w-xs dark:bg-dark-2-light bg-gray-100" />
            <div className="font-semibold text-lg min-h-4 max-w-20 dark:bg-dark-2-light bg-gray-100" />
          </div>
        </div>
        <div className="items-end border-b-2 px-4 py-2 flex justify-between dark:bg-dark-2-light bg-gray-200">
          <div className="grow me-3 rounded-sm">
            <div className="my-5 flex flex-col gap-5">
              <div className="min-h-6 max-w-xl dark:bg-dark-2-light bg-gray-100 rounded-lg" />
              <div className="min-h-6 min-w-10">
                <div className="mt-1 h-4 leading-loose dark:bg-dark-2-light bg-gray-100 rounded-md" />
                <div className="mt-1 max-w-md h-4 leading-loose dark:bg-dark-2-light bg-gray-100 rounded-md" />
                <div className="mt-1 max-w-xs h-4 leading-loose dark:bg-dark-2-light bg-gray-100 rounded-md" />
              </div>
              <div className="min-h-4 max-w-20 dark:bg-dark-2-light bg-gray-100 rounded-lg" />
            </div>
            <div className="flex gap-3 justify-end mt-4 mb-2">
              <div className="min-h-6 min-w-10 dark:bg-dark-2-light bg-gray-100 rounded-lg" />
              <div className="min-h-6 min-w-10 dark:bg-dark-2-light bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 mt-4 p-1 dark:bg-dark-2-light bg-gray-200 rounded-lg">
        <SkeletonCommentInput />
      </div>
      <div className="border-t-2 py-5 flex flex-col gap-3">
        <SkeletonCommentItem />
        <SkeletonCommentItem />
        <SkeletonCommentItem />
      </div>
    </div>
  );
}

export default SkeletonThreadDetail;