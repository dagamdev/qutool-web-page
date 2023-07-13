import styles from './header.module.scss'

import { type MouseEvent } from 'react'
import Link from "next/link"
import { useTooltips, useUser } from '@/hooks'
import { useRouter, usePathname } from 'next/navigation'
import { documentExist, windowExist } from '@/utils/services'
import type { TooltipOption } from '@/utils/types'
import { FaRegUser } from 'react-icons/fa'
import { END_POINT, PROTECTED_ROUTES } from '@/utils/config'
import { RxDashboard } from 'react-icons/rx'
import { BiUserCircle } from 'react-icons/bi'
import { IoMdExit, IoMdLogIn } from 'react-icons/io'

const ROUTES = [
  {
    path: '/',
    name: 'Inicio'
  },
  {
    path: '/dashboard',
    name: 'Dashboard'
  },
  // {
  //   path: '/terms',
  //   name: 'Términos de uso'
  // },
  // {
  //   path: '/privacy',
  //   name: 'Políticas de privacidad'
  // },
] as const

export default function Navigator(){
  const pathName = usePathname()
  const router = useRouter()
  const { user, updateUser } = useUser()
  // const user: any = undefined
  const { events, createTooltip } = useTooltips()

  const options: TooltipOption[] = user ? [
    {
      icon: <FaRegUser />,
      name: 'Profile',
      function() {
        console.log('asd')
      },
    },
    {
      icon: <RxDashboard />,
      name: 'Dashboard',
      function() {
        
      },
    },
    {
      icon: <IoMdExit />,
      name: 'Log out',
      function() {
        if(documentExist){          
          updateUser()
          if(windowExist) window.location.href = END_POINT+'logout'
        }
      },
    }
  ] : [
    {
      icon: <IoMdLogIn />,
      name: 'Log in',
      function() {
        fetch(END_POINT+'auth/redirect').then(prom=> prom.json())
        .then(res=> console.log(res))
        .catch(e=> console.error(e))
        // if(windowExist) window.location.href = END_POINT+'auth'
      },
    }
  ]

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log('click')
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