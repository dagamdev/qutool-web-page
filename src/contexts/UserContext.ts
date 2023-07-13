import { User } from '@/utils/types'
import { createContext } from 'react'

export interface UserContextData {
  user?: User,
  updateUser: (newData?: User) => void
}

export const UserContext = createContext<UserContextData | undefined>(undefined)