import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { asyncAddThread } from '../../store/threads/action';
import type { AppDispatch } from '@/store/store';
import ThreadForm from '@/components/threads/ThreadForm';

function AddPage (): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  const onCreateThread = ({ title, body, category }:
  { title: string, body: string, category: string }): void => {
    if (title !== undefined) {
      void dispatch(asyncAddThread({
        title,
        body,
        category
      }));
      void push('/');
    }
  };

  return (
    <div className="w-full">
      <div className="h-screen p-5">
        <div>
          <h1 className="font-semibold text-3xl sticky text-center md:text-start">Buat Thread</h1>
        </div>
        <ThreadForm createThreadHandler={onCreateThread} />
      </div>
    </div>
  );
}

export default AddPage;