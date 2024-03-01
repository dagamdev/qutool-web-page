'use client'

import styles from '../servers.module.css'
import { type MouseEvent } from 'react'
import { getCSRLanguage } from '@/utils/services'
import GuildCard from './GuildCard'
import type { Guild } from '@/types'
import { useDialog } from '@/hooks'

export default function Guilds ({ guilds }: {
  guilds: Guild[]
}) {
  const isEnglish = getCSRLanguage() == 'en'
  const { openDialog } = useDialog()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    openDialog()
  }

  const login = <a onClick={handleClick} href={isEnglish ? 'log in' : 'regístrarse'}>{isEnglish ? 'register' : 'regístrate'}</a>

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