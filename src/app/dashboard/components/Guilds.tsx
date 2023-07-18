'use client'

import styles from '../dashboard.module.scss'
import { useState, useEffect } from 'react'
import { customFetch } from '@/utils/services'
import GuildCard from './GuildCard'
import type { Guild } from '@/utils/types'

export default function Guilds(){
  const [guilds, setGuilds] = useState<Guild[]>([])

  useEffect(()=> {
    customFetch('user/guilds?with_counts=true').then(res=> {
      console.log(res)
      if(res.length){
        setGuilds(res.filter((g: Guild)=> g.owner || (parseInt(g.permissions) & 0x8) == 0x8))
      }
    }).catch(e=> console.error(e))
  }, [])

  return (
    <ul className={styles.guilds}>
      {guilds.map(g=> <GuildCard key={g.id} guild={g} />)}
    </ul>
  )
}