import { type ReactNode } from 'react'
import type { User } from '@/types'
import { UserContext } from '@/contexts'

export default function UserProvider({ children, user }: {
  children: ReactNode
  user?: User
}){
  return (
    <UserContext.Provider value={{
      user
    }}>
      {children}
    </UserContext.Provider>
  )
}