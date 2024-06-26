import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  asyncCreateComment,
  asyncReceiveDetailThread,
  clearThreadDetailActionCreator,
  asyncToggleVoteThread,
  asyncToggleVoteComment
} from '../../store/thread/action';
import ThreadDetail from '../../components/threads/ThreadDetail';
import { type AppDispatch, type RootState } from '@/store/store';
import SkeletonThreadDetail from '@/components/skeleton/SkeletonThreadDetail';
import SkeletonThreadCategory from '@/components/skeleton/SkeletonThreadCategory';

function DetailPage (): JSX.Element {
  const {
    thread,
    authUser
  } = useSelector((state: RootState) => ({
    thread: state.thread,
    authUser: state.authUser
  }));

  const dispatch: AppDispatch = useDispatch();
  const { query } = useRouter();
  const threadId: string = query.ThreadId ? query.ThreadId as string : '';

  useEffect(() => {
    if (threadId !== undefined && threadId !== null) {
      void dispatch(asyncReceiveDetailThread(threadId));
    }
    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [dispatch, threadId]);

  const onToggleVoteAction = ({ voteType }: { voteType: string }): void => {
    if (authUser !== null) {
      if (typeof threadId === 'string') {
        void dispatch(asyncToggleVoteThread({ threadId, userId: authUser.id, voteType }));
      }
    } else {
      alert('Silahkan login dulu');
    }
  };

  const onToggleVoteCommentAction = ({ voteType, commentId }:
  { voteType: string, commentId: string }): void => {
    if (authUser !== null) {
      if (typeof threadId === 'string') {
        void dispatch(asyncToggleVoteComment({
          threadId, commentId, userId: authUser.id, voteType
        }));
      }
    } else {
      alert('Silahkan login dulu');
    }
  };

  const addComment = (content: string): void => {
    if (threadId !== null) {
      void dispatch(asyncCreateComment({ threadId, content }));
    }
  };

  return (
    <div className="flex">
      <div className="grow h-screen p-5 max-[768px]:w-full max-w-70">
        <div>
          <h1 className="font-semibold text-3xl sticky text-center md:text-start">Detail Postingan</h1>
        </div>
        <div className="py-5">
          {
            (thread !== null)
              ? (
                <ThreadDetail
                  thread={thread}
                  onVote={onToggleVoteAction}
                  onVoteComment={onToggleVoteCommentAction}
                  authUser={authUser}
                  createCommentHandler={addComment}
                />
                )
              : (
                <SkeletonThreadDetail />
                )
            }
        </div>
      </div>
      <div className="h-screen p-5 md:block hidden grow min-w-max w-max-30">
        <h4 className="font-semibold text-2xl block">Related Topic</h4>
        <div className="md:bg-black-dark md:dark:bg-dark-3-light p-1 m-3 rounded-lg">
          {
            (thread !== null)
              ? (
                <div className="my-3">
                  <h1 className="w-5/6 m-auto text-lg font-medium">
                    <span>#</span>
                    {thread?.category}
                  </h1>
                </div>
                )
              : (
                <SkeletonThreadCategory />
                )
          }
        </div>
      </div>
    </div>
  );
}

export default DetailPage;