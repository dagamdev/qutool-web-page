import styles from './header.module.scss'

import { type MouseEvent } from 'react'
import Link from "next/link"
import { useTooltips, useUser, useLanguage, useDialog } from '@/hooks'
import { useRouter, usePathname } from 'next/navigation'
import { customFetch, documentExist } from '@/utils/services'
import type { TooltipOption } from '@/utils/types'
import { PROTECTED_ROUTES } from '@/utils/config'
import { RxDashboard } from 'react-icons/rx'
import { BiUserCircle } from 'react-icons/bi'
import { IoMdExit, IoMdLogIn } from 'react-icons/io'


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
      path: '/dashboard',
      name: textLang.dashboard
    }
  ] as const

  const options: TooltipOption[] = user ? [
    // {
    //   icon: <FaRegUser />,
    //   name: 'Profile',
    //   function() {
    //     console.log('asd')
    //   },
    // },
    {
      icon: <RxDashboard />,
      name: textLang.dashboard,
      function() {
        
      },
    },
    {
      icon: <IoMdExit />,
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
      icon: <IoMdLogIn />,
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
        {user?.avatar ? <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.includes('a_') ? 'gif' : 'png'}`} alt={(user.global_name || 'user')+' avatar'} width={40} height={40} /> : <BiUserCircle className={styles['user-default']} />}
      </div>
    </nav>
  )
}