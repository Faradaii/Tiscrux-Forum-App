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
import { type RootState } from '@/store/store';

function DetailPage (): JSX.Element {
  const {
    thread,
    authUser
  } = useSelector((state: RootState) => ({
    thread: state.thread,
    authUser: state.authUser
  }));

  const dispatch = useDispatch();
  const { query } = useRouter();
  const threadId = query.ThreadId;

  useEffect(() => {
    if (threadId !== null) {
      dispatch(asyncReceiveDetailThread(threadId));
    }
    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [dispatch, threadId]);

  const onToggleVoteAction = ({ voteType }: { voteType: string }): void => {
    if (authUser != null) {
      dispatch(asyncToggleVoteThread({ threadId, userId: authUser.id, voteType }));
    } else {
      alert('Silahkan login dulu');
    }
  };

  const onToggleVoteCommentAction = ({ voteType, commentId }:
  { voteType: string, commentId: string }): void => {
    if (authUser != null) {
      dispatch(asyncToggleVoteComment({
        threadId: threadId as string, commentId, userId: authUser.id, voteType
      }));
    } else {
      alert('Silahkan login dulu');
    }
  };

  const addComment = (content: string): void => {
    if (threadId !== null) {
      dispatch(asyncCreateComment(threadId as string, content));
    }
  };

  if (thread === null) {
    return <h1>ok</h1>;
  }

  return (
    <div className="flex">
      <div className="grow h-screen p-5 w-max-70">
        <div>
          <h1 className="font-semibold text-3xl sticky">Detail Postingan</h1>
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
                <div>Loading...</div>
                )
            }
        </div>
      </div>
      <div className="h-screen p-5 w-max-30 grow">
        <h4 className="font-semibold text-2xl block">Related Topic</h4>
        <div className="bg-black-dark p-1 m-3 rounded-lg">
          <div className="my-3">
            <h1 className="w-5/6 m-auto text-lg font-medium">
              <span>#</span>
              {thread?.category}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;