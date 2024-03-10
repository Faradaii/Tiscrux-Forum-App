import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import asyncPopulateUsersAndThreads from '../store/shared/action';
import { asyncToggleVoteThread } from '../store/threads/action';
import ThreadList from '../components/threads/ThreadList';
import CruxCard from '../components/card/CruxCard';
import { countTopicsAndTotal } from '../utils';
import ButtonLink from '../components/buttons/ButtonLink';

function HomePage (): JSX.Element {
  const { threads, users, authUser, isPreload } =
  useSelector((state: RootState) => ({
    authUser: state.authUser,
    threads: state.threads,
    users: state.users,
    isPreload: state.isPreload
  }));
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onToggleVoteAction = ({ threadId, voteType }: { threadId: string, voteType: 'upVote' | 'downVote' | 'neutralVote' }): void => {
    if (authUser !== null) {
      dispatch(asyncToggleVoteThread({ threadId, userId: authUser.id, voteType }));
    } else {
      alert('Silahkan login dulu');
    }
  };

  if (isPreload) {
    return <h1>loading</h1>;
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((u) => thread.ownerId === u.id),
    authUser
  }));

  const threadFiltered = threadList
    .filter((thread) => thread.category.includes(filter));

  const topicList = countTopicsAndTotal(threadList);

  return (
    <div className="flex">
      <div className="grow h-screen p-5 w-max-70">
        <div className="flex justify-between">
          <h1 className="font-semibold text-3xl">Beranda</h1>
          <ButtonLink action="buatThread" />
        </div>
        <div className="py-2">
          {
            (threads.length > 0)
              ? (
                <ThreadList threads={threadFiltered} onVote={onToggleVoteAction} />
                )
              : (
                <div>Loading...</div>
                )
          }
        </div>
      </div>
      <div className="h-screen p-5 w-max-30 grow">
        <h4 className="font-semibold text-2xl block">Popular Topic</h4>
        <div className="bg-black-dark p-3 m-3 rounded-lg">
          {
            topicList.map(({ topic, totalPost }) => (
              <div className="my-3" key={topic}>
                <h1 className="w-5/6 m-auto text-lg font-medium">
                  <button type="button" onClick={() => { setFilter(topic); }}>
                    <span>#</span>
                    {topic}
                  </button>
                </h1>
                <h1 className="w-5/6 m-auto text-sm font-light text-gray-500">
                  {totalPost}
                  <span> posts</span>
                </h1>
              </div>
            ))
          }
        </div>
        {
          (authUser === null) && <CruxCard typeCard="authTips" />
        }
      </div>
    </div>
  );
}

export default HomePage;
