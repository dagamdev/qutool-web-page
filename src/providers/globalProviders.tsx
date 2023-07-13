'use client'

import { ReactNode } from 'react'
import SessionProvider from './SessionProvider'
import UserProvider from './UserProvider'
import TooltipsProvider from './TooltipsProvider'

export default function GlobalProviders({children}: {children: ReactNode}) {
  return (
    <>
      <SessionProvider>
        <UserProvider>
          <TooltipsProvider>
            {children}
          </TooltipsProvider>
        </UserProvider>
      </SessionProvider>
    </>
  )
}