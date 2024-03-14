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

  const onClearOneFilter = (value: string): void => {
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
    <div className="flex flex-col relative h-screen p-2 md:me-4">
      <div className="p-5 flex justify-between max-[768px]:flex-col max-[768px]:w-full">
        <h1 className="font-semibold text-3xl text-center md:text-start">Beranda</h1>
        {(authUser !== null) && <ButtonLink action="buatThread" className="hidden md:block" />}
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="grow md:px-5 order-3 md:order-1">
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
        <div className="md:h-fit md:p-1 flex flex-col gap-3 order-2 min-w-[30%] md:max-w-min w-full max-[768px]:overflow-x-auto items-center">
          <h4 className="font-semibold text-2xl hidden md:block">Popular Topic</h4>
          <div className="md:bg-black-dark md:dark:bg-dark-3-light p-4 rounded-lg flex md:flex-col md:gap-1 gap-2 self-start md:w-5/6 md:m-auto">
            {
              (filter.length > 1) && <button type="button" className="sticky md:self-end self-center text-sm" onClick={() => { onClearFilter(); }}>Hapus filter</button>
            }
            {
              (threads?.length !== 0)
                ? (
                    topicList.map(({ topic, totalPost }) => (
                      <div className="w-full flex m-auto md:border-none border md:px-2 px-3 text-nowrap rounded-full gap-1 justify-between" key={topic}>
                        <button type="button" className="w-full text-left" onClick={() => { addFilter(topic); }}>
                          <div className="my-2 grow">
                            <h1 className="text-xs md:text-lg font-medium">
                              <span>#</span>
                              {topic}
                            </h1>
                            <h1 className="text-sm font-light text-gray-500 hidden md:block">
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
    </div>
  );
}

export default HomePage;
