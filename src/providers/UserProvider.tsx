import { useState, useEffect, ReactNode } from 'react'
import { UserContext } from "@/contexts";
import type { User } from '@/utils/types';
import { useSession } from '@/hooks';
import { customDiscordFetch } from '@/utils/services';

export default function UserProvider({children}: {children: ReactNode}){
  const [user, setUser] = useState<User>()
  const { session } = useSession()

  useEffect(()=> {
    if(session){
      customDiscordFetch('users/@me', session.accessToken)
      .then(res=> {
        // console.log(res)
        if(res.id){
          setUser(res)
        }
      }).catch(e=> console.error(e))
    }
  }, [session])
  
  return (
    <UserContext.Provider value={{
      user,
      updateUser(newData?: User) {
        setUser(newData)
      }
    }}>
      {children}
    </UserContext.Provider>
  )
}