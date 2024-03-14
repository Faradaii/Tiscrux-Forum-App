import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { asyncRegisterUser } from '@/store/users/action';
import welcomeIlust from '../../../public/welcomeIlust.svg';
import RegisterInput from '@/components/inputs/RegisterInput';
import type { AppDispatch } from '@/store/store';

function RegisterPage (): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const onRegister = async ({ name, email, password }:
  { name: string, email: string, password: string }):
  Promise<void> => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      await router.push('/login');
    } catch (error) {
      console.error('Login failed:', error);
    }
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
            <RegisterInput register={onRegister} />
            <small>
              Sudah punya akun ?
              <Link href="/login" className="text-primary"> Masuk Sekarang </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;