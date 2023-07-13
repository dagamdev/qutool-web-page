import { useContext } from 'react'
import { SessionContext, type SessionContextData } from '@/contexts'

export function useSession() {
  return useContext(SessionContext) as SessionContextData
}