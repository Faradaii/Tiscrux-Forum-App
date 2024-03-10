import React from 'react';
import useInput from '../../hooks/UseInput';
import { type User } from '../../../types';

interface Props {
  authUser: User | null
  createCommentHandler: (content: string) => void
}

function CommentInput ({ authUser, createCommentHandler }: Props): JSX.Element {
  const [content, setContent, changeContent] = useInput();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createCommentHandler(content);
    changeContent('');
  };

  console.log(authUser);

  return (
    <form className="flex gap-3 py-3" onSubmit={onSubmitHandler}>
      {(authUser != null)
        ? (
          <>
            <img src={authUser.avatar} alt="" className="min-w-12 max-w-12 rounded-full" />
            <input type="text" className="grow bg-transparent outline-none px-2" placeholder="Berikan Crux..." value={content} onChange={setContent} />
            <button type="submit" className="bg-primary text-white min-w-20 max-h-10 rounded-lg">Crux</button>
          </>
          )
        : (
          <p>Silahkan login dulu</p>
          )}
    </form>
  );
}

export default CommentInput;