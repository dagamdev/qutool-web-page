import { createContext } from 'react'
import type { User } from '@/types'

export interface UserContextData {
  user?: User
}

export const UserContext = createContext<UserContextData | undefined>(undefined)