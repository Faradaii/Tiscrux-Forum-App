import React, { type FormEvent } from 'react';
import { useRouter } from 'next/router';
import useInput from '../../hooks/UseInput';

interface Props {
  register: (credentials: { name: string, email: string, password: string }) => void
}

function RegisterInput ({ register }: Props): JSX.Element {
  const [name, setName] = useInput();
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  const { push } = useRouter();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    register({ name, email, password });
    void push('/login');
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-5/6 font-poppins flex flex-col gap-4 m-auto">
      <div className="text-start">
        <label className="block mb-2">Nama</label>
        <input
          type="text"
          value={name}
          required
          onChange={setName}
          className="w-full px-3 py-1 rounded-lg border-gray-200 border bg-white-light dark:bg-white-dark"
        />
      </div>
      <div className="text-start">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          autoComplete="username"
          value={email}
          required
          onChange={setEmail}
          className="w-full px-3 py-1 rounded-lg border-gray-200 border bg-white-light dark:bg-white-dark"
        />
      </div>
      <div className="text-start">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          required
          onChange={setPassword}
          className="w-full px-3 py-1 rounded-lg border-gray-200 border bg-white-light dark:bg-white-dark"
        />
      </div>
      <button type="submit" className="bg-primary rounded-lg py-1 text-lg my-2 text-white">
        Buat Akun
      </button>
    </form>
  );
}

export default RegisterInput;
