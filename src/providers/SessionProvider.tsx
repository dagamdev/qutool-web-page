'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { SessionContext } from '@/contexts'
import type { Session } from '@/utils/types'
import { customFetch } from '@/utils/services'

export default function SessionProvider({children}: {children: ReactNode}) {
  const [session, setSession] = useState<Session>()

  useEffect(()=> {
    customFetch('session')
    .then(res=> {
      if(res.userId){
        setSession(res)
      }
    }).catch(e=> console.error(e))
  }, [])

  return (
    <SessionContext.Provider value={{
      session, 
      updateSession(newSession: Session) {
        setSession(newSession)
      }
    }
    }>
      {children}
    </SessionContext.Provider>
  )
}