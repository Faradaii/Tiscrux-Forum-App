import React from 'react';
import parse from 'html-react-parser';
import {
  MdOutlineThumbDown, MdThumbDown, MdOutlineThumbUp, MdThumbUp
} from 'react-icons/md';
import { convertDateFormat } from '../../utils';
import type { ThreadComment, User } from '../../../types';

interface Props {
  comment: ThreadComment
  authUser: User | null
  onVoteComment: (voteData: { commentId: string, voteType: string }) => void
}

function CommentItem (props: Props): JSX.Element {
  const {
    comment, authUser, onVoteComment
  } = props;

  const {
    id, content, createdAt, owner, upVotesBy, downVotesBy
  } = comment;

  return (
    <div className="flex gap-3 items-start p-3">
      <img src={owner.avatar} alt={`${owner.name}-avatar`} className="w-10 rounded-full" />
      <div className="grow">
        <div className="flex justify-between">
          <h3 className="text-lg">{owner.name}</h3>
          <h4 className="text-sm font-light">{convertDateFormat(createdAt)}</h4>
        </div>
        <p>{parse(content)}</p>
        <div className="flex gap-3 justify-end">
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVoteComment({ commentId: id, voteType: upVotesBy.includes(authUser?.id ?? '') ? 'neutralVote' : 'upVote' }); }}>
              {
              upVotesBy.includes(authUser?.id ?? '')
                ? <MdThumbUp className="w-4 h-4" />
                : <MdOutlineThumbUp className="w-4 h-4" />
              }
            </button>
            <span>{upVotesBy.length}</span>
          </div>
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVoteComment({ commentId: id, voteType: downVotesBy.includes(authUser?.id ?? '') ? 'neutralVote' : 'downVote' }); }}>
              {
              downVotesBy.includes(authUser?.id ?? '')
                ? <MdThumbDown className="w-4 h-4" />
                : <MdOutlineThumbDown className="w-4 h-4" />
              }
            </button>
            <span>{downVotesBy.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
