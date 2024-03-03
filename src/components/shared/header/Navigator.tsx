import styles from './header.module.css'

import { type MouseEvent } from 'react'
import Link from "next/link"
import { useTooltips, useUser, useLanguage, useDialog } from '@/hooks'
import { useRouter, usePathname } from 'next/navigation'
import { documentExist } from '@/utils/services'
import type { TooltipOption } from '@/types'
import DashboardIcon from '@/icons/dashboard'
import UserCircleIcon from '@/icons/userCircle'
import ExitIcon from '@/icons/exit'
import LoginIcon from '@/icons/login'
import DiscordImage from '@/components/image/DiscordImage'

export default function Navigator(){
  const pathName = usePathname()
  const { textLang } = useLanguage()
  const { user } = useUser()
  const { events, createTooltip } = useTooltips()
  const { setLoadDialog, openDialog } = useDialog()

  const ROUTES = [
    {
      path: '/',
      name: textLang.home
    },
    {
      path: '/servers',
      name: textLang.servers
    }
  ] as const

  const options: TooltipOption[] = user ? [
    {
      icon: <DashboardIcon />,
      name: textLang.servers,
      events: {
        onClick() {
          location.assign('/servers') 
        }
      },
      closeAfterEvent: true
    },
    {
      icon: <ExitIcon />,
      name: textLang.logOut,
      events: {
        onClick() {
          if(documentExist){
            document.cookie = "sessionId=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;"
            location.assign('/')
          }
        }
      },
      closeAfterEvent: true
    }
  ] : [
    {
      icon: <LoginIcon />,
      name: textLang.logIn,
      events: {
        onClick() {
          openDialog()
        },
        onMouseEnter() {
          setLoadDialog()
        }
      },
      closeAfterEvent: {
        onClick: true
      }
    }
  ]

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    createTooltip(e, {options})
  }

  return (
    <nav>
      <ul className={styles.routes}>
        {ROUTES.map((r, i)=> <li key={i}>
          <Link href={r.path} className={pathName == r.path ? 'current' : ''} >{r.name}</Link>
        </li>)}
      </ul>

      <div onClick={handleClick} className={styles.user} style={{border: user?.avatar ? '2px solid var(--border)' : ''}} data-direction='bottom'>
        {user?.avatar
          ? <DiscordImage id={user.id} image={user.avatar} type='user avatar' alt={user.username} />
          : <UserCircleIcon className={styles['user-default']} />
        }
      </div>
    </nav>
  )
}