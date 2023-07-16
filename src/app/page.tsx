'use client'

import styles from './page.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { customFetch, navigatorLanguage, transformText, windowExist } from '@/utils/services'

const textLanguage = {
  en: {
    title: 'Qutool Discord bot',
    logIn: 'Log in'
  },
  es: {
    title: 'Qutool bot de Discord',
    logIn: 'Iniciar sesión'
  }
}

export default function Home() {
  const [botDescription, setBotDescription] = useState<{
    en: string
    es: string
  }>()
  
  useEffect(()=> {
    customFetch('bot/description').then(res=> {
      if(res.en){
        setBotDescription(res)
      }
    }).catch(e=> console.error(e))
  }, [])

  const handleClick = () => {
    if(windowExist) window.location.href = 'api/auth'
  }

  return (
    <main className={styles.home}>
      <h2>{textLanguage[navigatorLanguage].title || textLanguage.en.title}</h2>
      {botDescription && <p dangerouslySetInnerHTML={{__html: transformText(botDescription[navigatorLanguage] || botDescription.en)}}></p>}
      <button onClick={handleClick}>{textLanguage[navigatorLanguage].logIn || textLanguage.en.logIn}</button>
    </main>
  )
}
