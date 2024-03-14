import LoadingBar from 'react-redux-loading-bar';
import { useEffect, useState, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { type AppDispatch, type RootState } from '@/store/store';
import Sidebar from '../layouts/Sidebar';
import { asyncPreloadProcess } from '@/store/isPreload/action';
import { asyncUnsetAuthUser } from '@/store/authUser/action';
import MenuBarMobile from '@/layouts/MenubarMobile';

const disableNavbar = ['/login', '/register', '/404'];

export default function AppShell ({ children }: { children: ReactNode | ReactNode[] }):
JSX.Element | null {
  const { pathname } = useRouter();
  const { authUser, isPreload } =
  useSelector((state: RootState) => ({
    authUser: state.authUser,
    isPreload: state.isPreload
  }));

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = (): void => {
    dispatch(asyncUnsetAuthUser());
  };

  const [showSidebar, setShowSidebar] = useState(false);

  if (isPreload) {
    return null;
  }
  return (
    <>
      <LoadingBar updateTime={300} maxProgress={80} progressIncrease={20} className="absolute z-50 bg-primary h-1" />
      <div className="h-screen overflow-auto flex items-center gap-2 bg-white-light dark:bg-white-dark text-black-light dark:text-black-dark">
        {!disableNavbar.includes(pathname) && (
          <>
            <MenuBarMobile user={authUser} setter={setShowSidebar} />
            <Sidebar
              user={authUser}
              onSignOut={onSignOut}
              show={showSidebar}
              setter={setShowSidebar}
            />
          </>
        )}
        <main className="w-full sm:text-sm md:text-base text-xs">
          {children}
        </main>
      </div>
    </>
  );
}