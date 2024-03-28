import React from 'react';
import parse from 'html-react-parser';
import Link from 'next/link';
import {
  IoArrowUpCircle, IoArrowUpCircleOutline, IoArrowDownCircle, IoArrowDownCircleOutline,
  IoChatbubbleOutline
} from 'react-icons/io5';
import { convertDateFormat, captureImgSrc } from '../../utils';
import { type Threads, type User } from '../../../types';

export interface ThreadItemProps extends Threads {
  user?: {
    id: string
    name: string
    avatar: string
  }
  authUser: User | null
  onVote?: (voteData: { threadId: string, voteType: 'upVote' | 'downVote' | 'neutralVote' }) => void
}

function ThreadItem ({
  id, title, body, category, createdAt, upVotesBy, downVotesBy,
  totalComments, user, authUser, onVote
}: ThreadItemProps): JSX.Element {
  const { srcImageValue, newBodyRemovedImgTag = '' } = captureImgSrc(body);

  return (
    <div className="border flex p-5 m-7 rounded-md max-w-full">
      <div>
        <img src={user?.avatar} alt="" className="min-w-14 max-w-14 me-4 rounded-full" />
      </div>
      <div className="grow me-3 flex-1 overflow-hidden">
        <Link href={`/thread/${id}`}>
          <div className="flex">
            <div className="grow">
              <h5 className="font-semibold">{user?.name}</h5>
              <small>
                @
                {user?.id}
              </small>
            </div>
            <small>{convertDateFormat(createdAt)}</small>
          </div>
          <div className="mt-2 max-w-prose">
            <h4 className="font-semibold text-lg">{title}</h4>
            <p className="mt-1 text-justify line-clamp-6 break-words">{parse(newBodyRemovedImgTag)}</p>
            <p className="text-primary text-sm my-2">
              #
              {category}
            </p>
            {
              (srcImageValue != null) && (
                <>
                  <br />
                  <img src={srcImageValue} alt={srcImageValue} className="w-full object-cover border rounded-xl" />
                </>
              )
            }
          </div>
        </Link>
        <div className="flex gap-3 justify-end mt-4 mb-2">
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVote?.({ threadId: id, voteType: upVotesBy.includes(authUser?.id ?? '') ? 'neutralVote' : 'upVote' }); }}>
              {
              upVotesBy.includes(authUser?.id ?? '' ?? '')
                ? <IoArrowUpCircle className="w-6 h-6" />
                : <IoArrowUpCircleOutline className="w-6 h-6" />
              }
            </button>
            <span>{upVotesBy.length}</span>
          </div>
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVote?.({ threadId: id, voteType: downVotesBy.includes(authUser?.id ?? '') ? 'neutralVote' : 'downVote' }); }}>
              {
              downVotesBy.includes(authUser?.id ?? '' ?? '')
                ? <IoArrowDownCircle className="w-6 h-6" />
                : <IoArrowDownCircleOutline className="w-6 h-6" />
              }
            </button>
            <span>{downVotesBy.length}</span>
          </div>
          <Link href={`/threads/${id}`} className="flex gap-1 items-center">
            <IoChatbubbleOutline className="w-6 h-6" />
            <span>{totalComments}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThreadItem;
