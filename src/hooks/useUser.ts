import { useContext } from 'react'
import { UserContext, type UserContextData } from '@/contexts'

export function useUser() {
  return useContext(UserContext) as UserContextData
}