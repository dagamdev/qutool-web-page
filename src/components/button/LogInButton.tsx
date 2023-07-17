'use client'

import styles from './button.module.scss'
import Link from 'next/link'
import { useLanguage, useDialog, useUser } from '@/hooks'

export default function LogInButton(){
  const { textLang } = useLanguage()
  const { user } = useUser()
  const { openDialog } = useDialog()

  const handleClick = () => {
    openDialog()
  }

  return (
    <>
      {user ? 
        <Link href={'/dashboard'} className={`${styles.button} button`} >{textLang.dashboard}</Link> :  
        <button onClick={handleClick} className={styles.button}>{textLang.logIn}</button>
      }
    </>
  )
}