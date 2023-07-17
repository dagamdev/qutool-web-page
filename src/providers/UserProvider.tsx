import { useState, useEffect, type ReactNode } from 'react'
import type { User } from '@/utils/types';
import { UserContext } from "@/contexts";
import { customFetch } from '@/utils/services';

export default function UserProvider({children}: {children: ReactNode}){
  const [user, setUser] = useState<User>()

  useEffect(()=> {
    customFetch('user').then(res=> {
      if(res.id){
        setUser(res)
      }
    }).catch(e=> console.error('Error: ', e))
    
  }, [])
  
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