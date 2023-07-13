'use client'

import { useState, useEffect, ReactNode } from 'react'
import { SessionContext } from '@/contexts'
import { Session } from '@/utils/types'

export default function SessionProvider({children}: {children: ReactNode}) {
  const [session, setSession] = useState<Session>()

  useEffect(()=> {
    fetch('api/session').then(prom=> prom.json())
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