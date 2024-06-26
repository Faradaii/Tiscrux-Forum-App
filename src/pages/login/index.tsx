import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import welcomeIlust from '../../../public/welcomeIlust.svg';
import LoginInput from '@/components/inputs/LoginInput';
import { asyncSetAuthUser } from '@/store/authUser/action';
import type { AppDispatch, RootState } from '@/store/store';

function Login (): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { authUser } =
  useSelector((state: RootState) => ({
    authUser: state.authUser
  }));

  if (authUser !== null) {
    void router.push('/');
  }

  const onLogin = ({ email, password }: { email: string, password: string }):
  void => {
    void dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:h-5/6 md:w-5/6">
        <div className="flex justify-center items-center">
          <Image src={welcomeIlust} alt="Forum-app" width={450} className="m-auto" />
        </div>
        <div className="m-auto sm:w-4/6 font-geologica flex flex-col justify-center items-center text-center gap-5 md:gap-14 ">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl md:text-5xl font-semibold">Tiscrux</h2>
            <h6 className="text-base font-light md:text-lg">Temukan berbagai diskusi yang anda sukai !</h6>
          </div>
          <div className="w-full">
            <LoginInput login={onLogin} />
            <small>
              Belum punya akun ?
              <Link href="/register" className="text-primary"> Buat Akun </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;