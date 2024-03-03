'use client'

import styles from './dialog.module.css'
import Link from 'next/link'
import { useState, useEffect, type AnimationEvent } from 'react'
import { useDialog, useLanguage } from "@/hooks"

const CONCENT_CONTENT = {
  en: (<>
    By logging in, you accept our <Link href={'/privacy'}>privacy policies</Link> that govern the use and protection of your data
  </>),
  es: (<>
    Al iniciar sesión, aceptas nuestras <Link href={'/privacy'}>políticas de privacidad</Link> que rigen el uso y protección de tus datos
  </>)
}

export default function ConsenNotice () {
  const { showDialog, closeDialog: setCloseDialog } = useDialog()
  const { lang } = useLanguage()
  const { textLang } = useLanguage()
  const [thisRef, setThisref] = useState<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (showDialog) thisRef?.showModal()
  }, [thisRef, showDialog])

  const closeDialog = () => {
    thisRef?.setAttribute('close', '')
  }

  const handleSignIn = () => {
    closeDialog()
    location.assign(`https://discord.com/oauth2/authorize?client_id=935707268090056734&response_type=code&redirect_uri=${encodeURIComponent(location.origin + '/api/auth/callback')}&scope=identify+guilds+guilds.join`)
  }

  const handleAnimationEnd = ({target}: AnimationEvent<HTMLDialogElement>) => {
    if(target instanceof HTMLDialogElement && target.hasAttribute('close')) {
      target.close()
      target.removeAttribute('close')
      setCloseDialog()
    }
  }
  
  return (
    <dialog ref={setThisref} className={styles.dialog} onAnimationEnd={handleAnimationEnd}>
      <p>{CONCENT_CONTENT[lang]}</p>

      <div className={styles['dialog-buttons']}>
        <button onClick={closeDialog}>{textLang.inDisagreement}</button>
        <button onClick={handleSignIn}>{textLang.ok}</button>  
      </div>
    </dialog>
  )
}