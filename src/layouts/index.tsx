import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { type RootState } from '@reduxjs/toolkit/query';
import Sidebar from './Sidebar';
import { asyncPreloadProcess } from '@/store/isPreload/action';

const disableNavbar = ['/login', '/register', '/404'];

export default function Layout ({ children }: { children: ReactNode | ReactNode[] }):
JSX.Element | null {
  const { pathname } = useRouter();
  const { authUser, isPreload } =
  useSelector((state: RootState) => ({
    authUser: state.authUser,
    isPreload: state.isPreload
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
      {!disableNavbar.includes(pathname) && <Sidebar user={authUser} onSignOut={() => { console.log('p'); }} />}
      <main className="w-full">{children}</main>
    </div>
  );
}