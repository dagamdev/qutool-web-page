'use client'

import styles from './dialog.module.scss'
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

export default function ConsenNotice(){
  const { lang } = useLanguage()
  const { closeDialog } = useDialog()
  const { textLang } = useLanguage()
  const [close, setClose] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if(event.target instanceof Node){
      if(!cardRef.current?.contains(event.target)) setClose(true)
    }
  }

  const signIn = () => {
    if(windowExist) window.location.href = 'api/auth'
    setClose(true)
  }

  const handleAnimationEnd = ({target}: AnimationEvent<HTMLDivElement>) => {
    console.log(target)
    if(close && target instanceof HTMLElement && target.classList.contains(styles.hide)) {
      console.log('close')
      closeDialog()
    }
  }
  
  return (
    <div onClick={handleClick} className={`${styles.dialog} ${close ? styles.hide : ''}`} onAnimationEnd={handleAnimationEnd}>
      <div ref={cardRef} className={styles['dialog-card']} >
        {/* <p dangerouslySetInnerHTML={{__html: transformText(texts[lang])}} /> */}
        <p>{CONCENT_CONTENT[lang]}</p>

        <div className={styles['dialog-buttons']}>
          <button onClick={closeDialog}>{textLang.inDisagreement}</button>
          <button onClick={signIn}>{textLang.ok}</button>  
        </div>
      </div>
    </div>
  )
}