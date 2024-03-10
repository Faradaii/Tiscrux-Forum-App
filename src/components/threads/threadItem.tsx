import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import {
  IoArrowUpCircle, IoArrowUpCircleOutline, IoArrowDownCircle, IoArrowDownCircleOutline,
  IoChatbubbleOutline
} from 'react-icons/io5';
import { convertDateFormat, captureImgSrc } from '../../utils';

interface ThreadItemProps {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  upVotesBy: string[]
  downVotesBy: string[]
  totalComments: number
  user: {
    id: string
    name: string
    avatar: string
  }
  authUser: string | null
  onVote: (voteData: { threadId: string, voteType: 'upVote' | 'downVote' | 'neutralVote' }) => void
}

function ThreadItem ({
  id, title, body, category, createdAt, upVotesBy, downVotesBy,
  totalComments, user, authUser, onVote
}: ThreadItemProps): JSX.Element {
  const { srcImageValue, newBodyRemovedImgTag = '' } = captureImgSrc(body);

  return (
    <div className="border flex p-5 m-5 rounded-md">
      <div>
        <img src={user.avatar} alt="" className="min-w-14 max-w-14 me-4 rounded-full" />
      </div>
      <div className="grow me-3">
        <Link to={`/threads/${id}`}>
          <div className="flex">
            <div className="grow">
              <h5 className="font-semibold">{user.name}</h5>
              <small>
                @
                {user.id}
              </small>
            </div>
            <small>{convertDateFormat(createdAt)}</small>
          </div>
          <div className="mt-2">
            <h4 className="font-semibold text-lg">{title}</h4>
            <p className="mt-1 text-justify line-clamp-6">{parse(newBodyRemovedImgTag)}</p>
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
        <div className="flex gap-3 justify-end">
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVote({ threadId: id, voteType: upVotesBy.includes(authUser ?? '') ? 'neutralVote' : 'upVote' }); }}>
              {
              upVotesBy.includes(authUser ?? '')
                ? <IoArrowUpCircle className="w-6 h-6" />
                : <IoArrowUpCircleOutline className="w-6 h-6" />
              }
            </button>
            <span>{upVotesBy.length}</span>
          </div>
          <div className="flex gap-1 items-center">
            <button type="button" onClick={() => { onVote({ threadId: id, voteType: downVotesBy.includes(authUser ?? '') ? 'neutralVote' : 'downVote' }); }}>
              {
              downVotesBy.includes(authUser ?? '')
                ? <IoArrowDownCircle className="w-6 h-6" />
                : <IoArrowDownCircleOutline className="w-6 h-6" />
              }
            </button>
            <span>{downVotesBy.length}</span>
          </div>
          <Link to={`/threads/${id}`} className="flex gap-1 items-center">
            <IoChatbubbleOutline className="w-6 h-6" />
            <span>{totalComments}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThreadItem;