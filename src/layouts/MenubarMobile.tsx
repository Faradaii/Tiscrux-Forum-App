import React from 'react';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { type User } from '../../types';

export default function MenuBarMobile ({ user = null, setter }:
{ user: User | null, setter: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
  return (
    <nav className="md:hidden z-20 absolute top-3 left-0 right-0 h-[40px] flex justify-between [&>*]:my-auto px-2">
      <button
        type="button"
        className="text-4xl flex text-white h-full  mx-2"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        {(user !== null) ? <Image src={user?.avatar} alt="avatar" width={100} height={100} className="rounded-full w-full h-full" /> : <FaUser className="dark:text-black-dark text-dark-3-light" />}
      </button>
    </nav>
  );
}