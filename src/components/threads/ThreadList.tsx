import React from 'react';
import ThreadItem, { type ThreadItemProps } from './ThreadItem';

interface ThreadListProps {
  threads: ThreadItemProps[]
  onVote: (voteData: { threadId: string, voteType: 'upVote' | 'downVote' | 'neutralVote' }) => void
}

function ThreadList ({ threads, onVote }: ThreadListProps): JSX.Element {
  return (
    <>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} onVote={onVote} />
      ))}
    </>
  );
}

export default ThreadList;