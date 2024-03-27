import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import useInput from '@/hooks/UseInput';

interface Props {
  login: ({ email, password }: { email: string, password: string }) => void
}

function LoginInput ({ login }: Props): JSX.Element {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [isHide, setIsHide] = useState<boolean>(true);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const loginData = {
      email,
      password
    };
    login(loginData);
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-5/6 font-poppins flex flex-col gap-4 m-auto">
      <div className="text-start">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email"
          autoComplete="username"
          value={email}
          required
          onChange={setEmail}
          className="w-full px-3 py-1 rounded-lg border-gray-200 border bg-white-light dark:bg-white-dark"
        />
      </div>
      <div className="text-start">
        <label className="block mb-2">Password</label>
        <div className="relative">
          <input
            id="password"
            placeholder="password"
            type={isHide ? 'password' : 'text'}
            autoComplete="current-password"
            value={password}
            required
            onChange={setPassword}
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
      <button type="submit" className="bg-primary rounded-lg py-1 text-lg my-2 text-white" name="submit">
        Masuk
      </button>
    </form>
  );
}

export default LoginInput;
