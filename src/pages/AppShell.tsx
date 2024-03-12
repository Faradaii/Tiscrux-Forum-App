import LoadingBar from 'react-redux-loading-bar';
import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { type RootState } from '@/store/store';
import Sidebar from '../layouts/Sidebar';
import { asyncPreloadProcess } from '@/store/isPreload/action';
import { asyncUnsetAuthUser } from '@/store/authUser/action';

const disableNavbar = ['/login', '/register', '/404'];

export default function AppShell ({ children }: { children: ReactNode | ReactNode[] }):
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

  const onSignOut = (): void => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }
  return (
    <div className="h-screen overflow-auto flex items-center gap-2 bg-white-light dark:bg-white-dark text-black-light dark:text-black-dark">
      <LoadingBar />
      {!disableNavbar.includes(pathname) && <Sidebar user={authUser} onSignOut={onSignOut} />}
      <main className="w-full">
        <LoadingBar scope="sectionBar" />
        {children}
      </main>
    </div>
  );
}