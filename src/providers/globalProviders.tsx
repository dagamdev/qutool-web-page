'use client'

import { type ReactNode } from 'react'
import UserProvider from './UserProvider'
import TooltipsProvider from './TooltipsProvider'
import DialogProvider from './DialogProvider'
import { Session, User } from '@/types'

export default function GlobalProviders({ children, session, user }: {
  children: ReactNode
  session?: Session
  user?: User
}) {

  return (
    <UserProvider user={user}>
      <TooltipsProvider>
        <DialogProvider>
          {children}
        </DialogProvider>
      </TooltipsProvider>
    </UserProvider>
  )
}