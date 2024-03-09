import React from 'react';
import Image from 'next/image';
import type { User } from '../../types';
import ButtonLink from '../components/buttons/ButtonLink';

function Sidebar ({
  user = null,
  onSignOut
}: {
  user: User | null
  onSignOut: () => void
}): React.JSX.Element {
  return (
    <aside className="sticky p-3 top-0 z-40 h-screen md:w-1/4 border flex flex-col bg-white-light dark:bg-white-dark">
      <div>
        <h1 className="font-semibold text-2xl">Tiscrux!</h1>
      </div>
      <div className="grow">
        <ButtonLink action="Beranda" />
        <ButtonLink action="Leaderboard" />
        <ButtonLink action="Pengaturan" />
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
              <button type="button" onClick={onSignOut}>...</button>
            </div>
            )
          : ''
      }
    </aside>
  );
}

export default Sidebar;