import { createContext } from 'react'
import type { Session } from '@/utils/types';

export interface SessionContextData {
  session: Session | undefined
  updateSession: (newSession: Session) => void
}

export const SessionContext = createContext<SessionContextData | undefined>(undefined)