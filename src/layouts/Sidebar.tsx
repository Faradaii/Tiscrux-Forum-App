import { useContext } from 'react';
import { FaPowerOff } from 'react-icons/fa';
import Image from 'next/image';
import type { ThemeType, User } from '../../types';
import ButtonLink from '../components/buttons/ButtonLink';
import Toggle from '@/components/toggle/Toggle';
import ThemeContext from '@/context/ThemeContext';

function ModalOverlay ({ oldValue, setter }:
{ oldValue: boolean, setter: (val: boolean) => void }): JSX.Element {
  return (
    <div
      className="flex md:hidden fixed top-0 right-0 bottom-0 left-0 z-20"
      role="button"
      onClick={() => { setter(!(oldValue)); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setter(!(oldValue));
        }
      }}
      tabIndex={0}
    />
  );
}

function Sidebar ({
  user = null,
  onSignOut,
  show,
  setter
}: {
  user: User | null
  onSignOut: () => void
  show: boolean
  setter: (val: boolean) => void
}): React.JSX.Element {
  const { theme, toggleTheme } = useContext<ThemeType>(ThemeContext);

  return (
    <>
      <aside className={`${show ? ' ml-0' : ' ml-[-250px] md:ml-0'} md:w-1/4 p-5 flex flex-col border-r-2 w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:sticky top-0 bottom-0 left-0 z-40 h-screen bg-white-light dark:bg-white-dark`}>
        <div className="flex items-between w-full gap-2">
          <h1 className="font-semibold text-2xl grow">Tiscrux!</h1>
          <Toggle onToggleHandler={toggleTheme} content={theme} />
        </div>
        <div className="grow flex flex-col gap-2 py-5">
          <ButtonLink action="Beranda" className="self-start" />
          <ButtonLink action="Leaderboard" className="self-start" />
          { (user !== null && <ButtonLink action="buatThread" className="self-start md:hidden" />)}
        </div>
        {
          (user !== null)
            ? (
              <div className="flex gap-3 mx-2 relative">
                <div>
                  <Image src={user.avatar} alt="" className="rounded-full w-12" width={100} height={100} />
                </div>
                <div className="grow ps-1 flex flex-col">
                  <small className="font-semibold text-lg">{user.name}</small>
                  <small className="text-xs">
                    @
                    {user.id}
                  </small>
                </div>
                <button type="button" onClick={onSignOut}><FaPowerOff /></button>
              </div>
              )
            : (
              <ButtonLink action="Login" className="self-start md:hidden" />
              )
        }
      </aside>
      {show && <ModalOverlay oldValue={show} setter={setter} />}
    </>
  );
}

export default Sidebar;