import React from 'react';
import parse from 'html-react-parser';
import { IoArrowUpCircle, IoArrowUpCircleOutline, IoArrowDownCircle, IoArrowDownCircleOutline } from 'react-icons/io5';
import { convertDateFormat, captureImgSrc } from '../../utils';
import CommentInput from '../comments/CommentInput';
import CommentItem from '../comments/CommentItem';
import type { User, Comment, Thread } from '../../../types';

interface Props {
  thread: Thread
  authUser: User | null
  onVote: (voteData: { threadId: string, voteType: string }) => void
  createCommentHandler: (content: string) => void
  onVoteComment: (voteData: { threadId?: string, commentId: string, voteType: string }) => void
}

function ThreadDetail ({
  thread, authUser, onVote, createCommentHandler, onVoteComment
}: Props): JSX.Element {
  const { id, title, body, category, createdAt, upVotesBy, downVotesBy, comments, owner } = thread;
  const { srcImageValue, newBodyRemovedImgTag } = captureImgSrc(body);

  return (
    <div className="p-5 m-3 rounded-md flex flex-col gap-2">
      <div className="grow me-5 flex items-center">
        <img src={owner?.avatar} alt="" className="min-w-14 max-w-14 me-4 rounded-full" />
        <div className="flex">
          <div className="grow">
            <h5 className="font-semibold text-lg">{owner?.name}</h5>
            <small>
              @
              {owner?.id}
            </small>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold text-xl">{title}</h4>
        <br />
        <p className="mt-1 text-justify">{(newBodyRemovedImgTag != null) ? parse(newBodyRemovedImgTag) : null}</p>
        <p className="md:hidden my-3 text-primary">
          #
          {category}
        </p>
        {
          (srcImageValue != null) && <img src={srcImageValue} alt={srcImageValue} className="w-full object-cover border rounded-xl" />
        }
      </div>
      <div className="items-end border-b-2 py-1 pb-4 flex justify-between">
        <h6 className="font-medium">{convertDateFormat(createdAt, 1)}</h6>
        <div className="flex gap-3 justify-end">
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVote({ threadId: id, voteType: upVotesBy?.includes(authUser?.id ?? '') ? 'neutralVote' : 'upVote' }); }}>
              {
              upVotesBy?.includes(authUser?.id ?? '')
                ? <IoArrowUpCircle className="w-8 h-8" />
                : <IoArrowUpCircleOutline className="w-8 h-8" />
              }
            </button>
            <span>{upVotesBy?.length}</span>
          </div>
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVote({ threadId: id, voteType: downVotesBy?.includes(authUser?.id ?? '') ? 'neutralVote' : 'downVote' }); }}>
              {
              downVotesBy?.includes(authUser?.id ?? '')
                ? <IoArrowDownCircle className="w-8 h-8" />
                : <IoArrowDownCircleOutline className="w-8 h-8" />
              }
            </button>
            <span>{downVotesBy?.length}</span>
          </div>
        </div>
      </div>
      <div>
        <CommentInput authUser={authUser} createCommentHandler={createCommentHandler} />
      </div>
      <div className="border-t-2 py-5 flex flex-col gap-3">
        {
          Array.isArray(comments) && comments.reverse().map((comment: Comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              authUser={authUser}
              onVoteComment={onVoteComment}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ThreadDetail;
