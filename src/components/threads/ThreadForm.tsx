import React from 'react';
import useInput from '@/hooks/UseInput';
import Tiptap from '@/components/editor/Tiptap';

interface Props {
  createThreadHandler: ({ title, body, category }:
  { title: string, body: string, category: string }) => void
}

function ThreadForm ({ createThreadHandler }: Props): JSX.Element {
  const [title, setTitle] = useInput();
  const [body,, changeBody] = useInput(1);
  const [category, setCategory] = useInput();

  const changeBodyHandler = (value: React.SetStateAction<string>): void => {
    changeBody(value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createThreadHandler({ title, body, category });
  };

  return (
    <form onSubmit={onSubmitHandler} className="my-5 flex flex-col gap-4 h-full md:w-4/6 font-poppins bg-white-light dark:bg-white-dark">
      <div className="p-8 grow border flex flex-col gap-4 rounded-lg">
        <div className="text-start">
          <input type="text" value={title} required onChange={setTitle} className="w-full text-2xl placeholder-gray-700 bg-transparent outline-none" placeholder="Judul Thread" />
        </div>
        <Tiptap onChange={changeBodyHandler} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <div className="grow text-start flex flex-col gap-3">
        <input type="text" value={category} onChange={setCategory} className="p-3 w-full border rounded-lg placeholder-gray-700 bg-transparent outline-none" placeholder="Ketik Topic" />
        <small className="text-xs flex gap-2">
          <span className="border rounded-full text-white bg-black w-4 h-4 block text-center">i</span>
          Anda hanya dapat menggunakan satu topik
        </small>
        <button type="submit" className="self-end bg-primary text-white border border-gray-300 py-2 px-4 rounded-lg w-fit text-base">Posting Thread</button>
      </div>
    </form>
  );
}

export default ThreadForm;