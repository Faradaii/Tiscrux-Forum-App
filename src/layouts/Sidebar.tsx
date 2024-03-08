import React from 'react'
import Image from 'next/image'
import type { User } from '../../types'

function Sidebar ({
  user = null,
  onSignOut
}: {
  user: User | null
  onSignOut: () => void
}): React.JSX.Element {
  return (
    <div>
      <div className="h-screen overflow-auto flex items-center gap-2 bg-white-light dark:bg-white-dark text-black-light dark:text-black-dark">
        <aside className="sticky p-3 top-0 z-40 h-full md:w-1/4 border flex flex-col bg-white-light dark:bg-white-dark">
          <div>
            <h1 className="font-semibold text-2xl">Tiscrux!</h1>
          </div>
          <div className="grow">
          </div>
          {
            (user != null)
              ? (
                <div className="flex gap-3 mx-2 relative">
                  <div>
                    <Image src={user.avatar} alt="" className="rounded-full w-12" />
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
      </div>
    </div>
  )
}

export default Sidebar