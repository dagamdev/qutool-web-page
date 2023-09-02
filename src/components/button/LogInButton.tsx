'use client'

import styles from './button.module.scss'
import Link from 'next/link'
import { useLanguage, useDialog, useUser } from '@/hooks'
import { getCSRLanguage } from '@/utils/services'

export default function LogInButton(){
  const { textLang } = useLanguage()
  const { user } = useUser()
  const { openDialog } = useDialog()
  const isEnglish = getCSRLanguage() == 'en'

  const handleClick = () => {
    openDialog()
  }

  return (
    <>
      {user ? 
        <Link href={'/servers'} className={`${styles.button} button`} >{textLang.manageServer}{isEnglish ? 's' : 'es'}</Link> :  
        <button onClick={handleClick} className={styles.button}>{textLang.logIn}</button>
      }
    </>
  )
}