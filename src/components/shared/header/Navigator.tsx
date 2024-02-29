import styles from './header.module.css'

import { type MouseEvent } from 'react'
import Link from "next/link"
import { useTooltips, useUser, useLanguage, useDialog } from '@/hooks'
import { useRouter, usePathname } from 'next/navigation'
import { customFetch, documentExist } from '@/utils/services'
import type { TooltipOption } from '@/utils/types'
import { PROTECTED_ROUTES } from '@/utils/config'
// import { RxDashboard } from 'react-icons/rx'
// import { BiUserCircle } from 'react-icons/bi'
// import { IoMdExit, IoMdLogIn } from 'react-icons/io'
import DiscordImage from '@/components/image/DiscordImage'

export default function Navigator(){
  const pathName = usePathname()
  const router = useRouter()
  const { textLang } = useLanguage()
  const { user, updateUser } = useUser()
  const { events, createTooltip } = useTooltips()
  const { openDialog } = useDialog()

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
      // icon: <RxDashboard />,
      icon: '-',
      name: textLang.servers,
      function() {
        
      },
    },
    {
      // icon: <IoMdExit />,
      icon: '-',
      name: textLang.logOut,
      function() {
        if(documentExist){          
          customFetch('auth/logout').then(res=> {
            if(res.ok) {
              updateUser()
              if(PROTECTED_ROUTES.some(s=> s == pathName)) router.push('/')
            }
          }).catch(e=> {
            console.error(e)
          })
        }
      },
    }
  ] : [
    {
      // icon: <IoMdLogIn />,
      icon: '-',
      name: textLang.logIn,
      function() {
        openDialog()
      },
    }
  ]

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    createTooltip(e, {options})
  }

  return (
    <nav>
      <ul className={styles.routes}>
        {ROUTES.map((r, i)=> <li key={i} {...events} data-name={r.name} data-direction={'bottom'}>
          <Link href={r.path} className={pathName == r.path ? 'current' : ''} >{r.name}</Link>
        </li>)}
      </ul>

      <div onClick={handleClick} className={styles.user} style={{border: user?.avatar ? '2px solid var(--border)' : ''}} data-direction='bottom'>
        {user?.avatar
          ? <DiscordImage id={user.id} image={user.avatar} type='user avatar' alt={user.username} />
          : 'hola'
          // <BiUserCircle className={styles['user-default']} />
        }
      </div>
    </nav>
  )
}