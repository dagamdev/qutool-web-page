'use client'

import styles from './dialog.module.css'
import Link from 'next/link'
import { useRef, useState, useEffect, type MouseEvent, type AnimationEvent } from 'react'
import { useDialog, useLanguage } from "@/hooks"
import { transformText, windowExist } from "@/utils/services"

const CONCENT_CONTENT = {
  en: (<>
    By logging in, you accept our <Link href={'/privacy'}>privacy policies</Link> that govern the use and protection of your data
  </>),
  es: (<>
    Al iniciar sesión, aceptas nuestras <Link href={'/privacy'}>políticas de privacidad</Link> que rigen el uso y protección de tus datos
  </>)
}

export default function ConsenNotice () {
  const { closeDialog, showDialog } = useDialog()
  const { lang } = useLanguage()
  const { textLang } = useLanguage()
  const [thisRef, setThisref] = useState<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (showDialog) thisRef?.showModal()
    console.log(thisRef)
  }, [thisRef, showDialog])

  const disagreement = () => {
    thisRef?.close()
    closeDialog()
  }

  const handleSignIn = () => {
    location.assign(`https://discord.com/oauth2/authorize?client_id=935707268090056734&response_type=code&redirect_uri=${encodeURIComponent(location.origin + '/api/auth/callback')}&scope=identify+guilds+guilds.join`)
    thisRef?.close()
    closeDialog()
  }

  const handleAnimationEnd = ({target}: AnimationEvent<HTMLDialogElement>) => {
    console.log('end animation', target)
    if(target instanceof HTMLElement && target.classList.contains(styles.hide)) {
      closeDialog()
      thisRef?.close()
    }
  }
  
  return (
    <dialog ref={setThisref} className={styles.dialog} onAnimationEnd={handleAnimationEnd}>
      <p>{CONCENT_CONTENT[lang]}</p>

      <div className={styles['dialog-buttons']}>
        <button onClick={disagreement}>{textLang.inDisagreement}</button>
        <button onClick={handleSignIn}>{textLang.ok}</button>  
      </div>
    </dialog>
  )
}