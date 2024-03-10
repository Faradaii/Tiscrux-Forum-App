import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useInput from '../../hooks/UseInput';
import { asyncAddThread } from '../../store/threads/action';

function AddPage (): JSX.Element {
  const [title, setTitle] = useInput();
  const [body, setBody] = useInput(1);
  const [category, setCategory] = useInput();

  const { push } = useRouter();
  const dispatch = useDispatch();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(asyncAddThread({
      title,
      body,
      category
    }));
    push('/');
  };

  return (
    <div className="w-full">
      <div className="h-screen p-5">
        <div>
          <h1 className="font-semibold text-3xl sticky">Buat Thread</h1>
        </div>
        <form onSubmit={onSubmitHandler} className="my-5 flex flex-col gap-4 h-full w-4/6 font-poppins bg-white-light dark:bg-white-dark">
          <div className="p-8 h-3/6 border flex flex-col gap-4 rounded-lg">
            <div className="text-start">
              <input type="text" value={title} required onChange={setTitle} className="w-full text-2xl placeholder-gray-700 bg-transparent outline-none" placeholder="Judul Thread" />
            </div>
            <div contentEditable required onInput={setBody} className=" overflow-auto grow break-all rounded-lg bg-white-light dark:bg-white-dark outline-none placeholder:text-gray-400" placeholder="Ceritakan ceritamu..." />
          </div>
          <div className="text-start flex flex-col gap-3">
            <input type="text" value={category} onChange={setCategory} className="p-3 w-full border rounded-lg placeholder-gray-700 bg-transparent outline-none" placeholder="Ketik Topic" />
            <small className="text-xs flex gap-2">
              <span className="border rounded-full text-white bg-black w-4 h-4 block text-center">i</span>
              Anda hanya dapat menggunakan satu topik
            </small>
          </div>
          <button type="submit" className="self-end bg-primary text-white border border-gray-300 py-2 px-4 rounded-lg w-fit text-base">Posting Thread</button>
        </form>
      </div>
    </div>
  );
}

export default AddPage;