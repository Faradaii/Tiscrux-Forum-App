import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

interface Props {
  login: (credentials: { email: string, password: string }) => Promise<void>
}

function LoginInput ({ login }: Props): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isHide, setIsHide] = useState<boolean>(true);
  const { push } = useRouter();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    login({ email, password }).then(() => {
      void push('/');
    }).catch((error) => {
      alert(error);
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-5/6 font-poppins flex flex-col gap-4 m-auto">
      <div className="text-start">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          autoComplete="username"
          value={email}
          required
          onChange={(e) => { setEmail(e.target.value); }}
          className="w-full px-3 py-1 rounded-lg border-gray-200 border bg-white-light dark:bg-white-dark"
        />
      </div>
      <div className="text-start">
        <label className="block mb-2">Password</label>
        <div className="relative">
          <input
            id="password"
            type={isHide ? 'password' : 'text'}
            autoComplete="current-password"
            value={password}
            required
            onChange={(e) => { setPassword(e.target.value); }}
            className="w-full px-3 py-1 rounded-lg border-gray-200 border bg-white-light dark:bg-white-dark"
          />
          <button
            type="button"
            className="absolute right-4 top-0 translate-y-1/2"
            onClick={() => { setIsHide(!isHide); }}
          >
            {isHide ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        </div>
      </div>
      <button type="submit" className="bg-primary rounded-lg py-1 text-lg my-2 text-white">
        Masuk
      </button>
    </form>
  );
}

export default LoginInput;