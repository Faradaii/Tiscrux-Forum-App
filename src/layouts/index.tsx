import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getAuthUserState } from '../store/authUser/slice';
import Sidebar from './Sidebar';
import { asyncPreloadProcess, getIsPreloadState } from '@/store/isPreload/slice';
import { type User } from '../../types';

const disableNavbar = ['/login', 'register'];

export default function Layout ({ children }: { children: ReactNode | ReactNode[] }):
JSX.Element | null {
  const { pathname } = useRouter();
  const { authState, isPreload }: { authState: User | null, isPreload: boolean } =
  useSelector((state) => ({
    authState: getAuthUserState(state),
    isPreload: getIsPreloadState(state)
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }
  return (
    <div className="h-screen overflow-auto flex items-center gap-2 bg-white-light dark:bg-white-dark text-black-light dark:text-black-dark">
      {!disableNavbar.includes(pathname) && <Sidebar user={authState} onSignOut={() => { console.log('p'); }} />}
      <main className="w-full">{children}</main>
    </div>
  );
}