'use client'

import { type ReactNode } from 'react'
import UserProvider from './UserProvider'
import TooltipsProvider from './TooltipsProvider'
import DialogProvider from './DialogProvider'

export default function GlobalProviders({children}: {children: ReactNode}) {
  return (
    <UserProvider>
      <TooltipsProvider>
        <DialogProvider>
          {children}
        </DialogProvider>
      </TooltipsProvider>
    </UserProvider>
  )
}