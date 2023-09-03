'use client'

import styles from '../servers.module.scss'
import { useState, useEffect, type MouseEvent } from 'react'
import { customFetch, getCSRLanguage } from '@/utils/services'
import GuildCard from './GuildCard'
import type { Guild } from '@/utils/types'
import { useDialog } from '@/hooks'

export default function Guilds(){
  const [guilds, setGuilds] = useState<Guild[]>([])
  const isEnglish = getCSRLanguage() == 'en'
  const { openDialog } = useDialog()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    openDialog()
  }

  const login = <a onClick={handleClick} href={isEnglish ? 'log in' : 'regístrarse'}>{isEnglish ? 'register' : 'regístrate'}</a>

  useEffect(()=> {
    customFetch('user/guilds?with_counts=true').then(res=> {
      console.log(res)
      if(res.length){
        setGuilds(res.filter((g: Guild)=> g.owner || (parseInt(g.permissions) & 0x8) == 0x8))
      }
    }).catch(e=> console.error(e))
  }, [])

  return guilds.length ? (
    <ul className={styles.guilds}>
      {guilds.map(g=> <GuildCard key={g.id} guild={g} />)}
    </ul>
  ) : (
    <p className={styles.feedback}>
      {getCSRLanguage() == 'en' ? (<>
        You have not registered yet, {login} to be able to manage your servers.
      </>) : (<>
        Aun no te has registrado, {login} para poder administrar tus servidores.
      </>)
      }
    </p>
  )
}