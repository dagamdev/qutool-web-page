'use client'

import styles from './button.module.css'
import Link from 'next/link'
import { useLanguage, useDialog, useUser } from '@/hooks'

export default function LogInButton(){
  const { textLang, lang } = useLanguage()
  const { user } = useUser()
  const { openDialog, setLoadDialog } = useDialog()
  const isEnglish = lang == 'en'

  const handleClick = () => {
    openDialog()
  }

  return (
    <>
      {user ? 
        <Link href={'/servers'} className={`${styles.button} button`} >{textLang.manageServer}{isEnglish ? 's' : 'es'}</Link> :  
        <button onClick={handleClick} onMouseEnter={() => setLoadDialog()} className={styles.button}>{textLang.logIn}</button>
      }
    </>
  )
}