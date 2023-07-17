'use client'

import styles from './dialog.module.scss'
import Link from 'next/link'
import { useRef, useState, useEffect, type MouseEvent } from 'react'
import { useDialog, useLanguage } from "@/hooks"
import { transformText, windowExist } from "@/utils/services"
import texts from '@/utils/texts.json'

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
  const [thisRef, setThisRef] = useState<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // useEffect(()=> {
  //   if(thisRef){

  //   }
  // }, [thisRef])

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if(event.target instanceof Node){
      if(!cardRef.current?.contains(event.target)) closeDialog()
      
    }
  }

  const signIn = () => {
    if(windowExist) window.location.href = 'api/auth'
    closeDialog()
  }

  
  return (
    <div onClick={handleClick} className={styles.dialog}>
      <div ref={cardRef} className={styles['dialog-card']} >
        {/* <p dangerouslySetInnerHTML={{__html: transformText(texts[lang])}} /> */}
        <p>{CONCENT_CONTENT[lang]}</p>

        <div className={styles['dialog-buttons']}>
          <button onClick={closeDialog}>In disagreement</button>
          <button onClick={signIn}>OK</button>  
        </div>
      </div>
    </div>
  )
}