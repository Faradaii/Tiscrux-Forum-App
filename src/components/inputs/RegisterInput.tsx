import React from 'react';
import useInput from '../../hooks/UseInput';

interface Props {
  register: ({ name, email, password }:
  { name: string, email: string, password: string }) => void
}

function RegisterInput ({ register }: Props): JSX.Element {
  const [name, setName, changeName] = useInput();
  const [email, setEmail, changeEmail] = useInput();
  const [password, setPassword, changePassword] = useInput();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const registerData = {
      name,
      email,
      password
    };
    register(registerData);
    changeName('');
    changeEmail('');
    changePassword('');
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-5/6 font-poppins flex flex-col gap-4 m-auto">
      <div className="text-start">
        <label className="block mb-2">Nama</label>
        <input
          type="text"
          value={name}
          placeholder="name"
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
          placeholder="email"
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
          placeholder="password"
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
