import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import asyncPopulateUsersAndThreads from '../store/shared/action';
import { asyncToggleVoteThread } from '../store/threads/action';
import ThreadList from '../components/threads/ThreadList';
import CruxCard from '../components/card/CruxCard';
import { countTopicsAndTotal } from '../utils';
import ButtonLink from '../components/buttons/ButtonLink';
import SkeletonThreadList from '@/components/skeleton/SkeletonThreadList';
import SkeletonThreadCategory from '@/components/skeleton/SkeletonThreadCategory';

function HomePage (): JSX.Element {
  const { threads, users, authUser, isPreload } =
  useSelector((state: RootState) => ({
    authUser: state.authUser,
    threads: state.threads,
    users: state.users,
    isPreload: state.isPreload
  }));
  const [filter, setFilter] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // const dispatchWithTypes: Dispatch<ReceiveUsersAction | ThreadAction> = dispatch;

    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onToggleVoteAction = ({ threadId, voteType }: { threadId: string, voteType: 'upVote' | 'downVote' | 'neutralVote' }): void => {
    if (authUser !== null) {
      dispatch(asyncToggleVoteThread({ threadId, userId: authUser.id, voteType }));
    } else {
      alert('Silahkan login dulu');
    }
  };

  const onClearFilter = (): void => {
    setFilter([]);
  };

  const onClearOneFilter = (value): void => {
    setFilter((prevState) => prevState.filter((state) => state !== value));
  };

  const addFilter = (newState: string): void => {
    setFilter((prevState) => [...prevState, newState]);
  };

  if (isPreload) {
    return <h1>loading</h1>;
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((u) => thread.ownerId === u.id),
    authUser
  }));

  const threadFiltered = filter.length === 0
    ? threadList
    : threadList
      .filter((thread) => filter.includes(thread.category));

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
                <SkeletonThreadList />
                )
          }
        </div>
      </div>
      <div className="h-screen p-5 w-max-30 grow">
        <h4 className="font-semibold text-2xl block">Popular Topic</h4>
        <div className="bg-black-dark p-4 m-3 rounded-lg flex flex-col">
          {
            (filter.length > 1) && <button type="button" className="self-end text-sm" onClick={() => { onClearFilter(); }}>Hapus filter</button>
          }
          {
            (threads?.length !== 0)
              ? (
                  topicList.map(({ topic, totalPost }) => (
                    <div className="flex w-5/6 m-auto" key={topic}>
                      <button type="button" className="w-full text-left" onClick={() => { addFilter(topic); }}>
                        <div className="my-3 grow">
                          <h1 className="text-lg font-medium">
                            <span>#</span>
                            {topic}
                          </h1>
                          <h1 className="text-sm font-light text-gray-500">
                            {totalPost}
                            <span> posts</span>
                          </h1>
                        </div>
                      </button>
                      {
                        filter.includes(topic) && <button type="button" onClick={() => { onClearOneFilter(topic); }}>x</button>
                      }
                    </div>
                  )))
              : (
                <SkeletonThreadCategory />
                )
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
