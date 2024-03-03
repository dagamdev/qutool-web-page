import styles from './header.module.css'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import Navigator from './Navigator'
import { useRouter } from 'next/navigation'
import { documentExist, windowExist } from '@/utils/services'
import { useTooltips, useLanguage } from '@/hooks'
import PersonAddIcon from '@/icons/personAdd'
import OutlinePrivacyIcon from '@/icons/outlinePrivacy'
import AutoStoriesIcon from '@/icons/autoStories'
import { QUTOOL_INVITE_URL } from '@/utils/config'

export default function Header(){
  const router = useRouter()
  const { textLang } = useLanguage()
  const headerRef = useRef<HTMLElement>(null)
  const { tooltips, createTooltip, deleteTooltip } = useTooltips()

  useEffect(()=> {
    if(documentExist && windowExist){
      const handleContextmenuEvent = (event: MouseEvent) => {
        event.preventDefault()

        const oldTooltip = tooltips.find(f=> f.options && !f.targetElement)
        if(oldTooltip) deleteTooltip(oldTooltip?.id)

        createTooltip(undefined, {
          position: {
            y: event.clientY,
            x: event.clientX
          },
          options: [
            {
              name: textLang.invite,
              icon: <PersonAddIcon />,
              events: {
                onClick() {
                  if(windowExist) window.open(QUTOOL_INVITE_URL, '_blank')
                }  
              }
            },
            {
              name: textLang.TOS,
              icon: <AutoStoriesIcon />,
              events: {
                onClick() {
                  router.push('/terms')
                }
              }
            },
            {
              name: textLang.PP,
              icon: <OutlinePrivacyIcon />,
              events: {
                onClick() {
                  router.push('/privacy')
                }
              }
            }
          ]
        })
      }

      const handleScrollEvent = () => {
        headerRef.current?.classList.toggle(styles.active, window.scrollY > 80)
      }

      window.addEventListener('contextmenu', handleContextmenuEvent)
      document.addEventListener('scroll', handleScrollEvent)
      
      return () => {
        window.removeEventListener('contextmenu', handleContextmenuEvent)
        document.removeEventListener('scroll', handleScrollEvent)
      }
    }
  }, [tooltips])

  return (
    <header ref={headerRef} className={styles.header}>
      <Link className={styles.title} href='/'>
        <Image src='/bot-avatar.png' alt='Qutool avatar' width={60} height={60} />
        <h1>Qutool</h1>
      </Link>

      <Navigator />
    </header>
  )
}