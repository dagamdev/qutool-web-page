import { useState, useEffect } from 'react'
import { getCSRLanguage } from '@/utils/services'
import texts from '@/utils/texts.json'
import type { Languages } from '@/utils/types'

const AVAILABLES_LANGS: readonly Languages[] = ['en', 'es']

export function useLanguage() {
  const [lang, setLang] = useState<Languages>('en')
  
  const textLang = texts[lang]

  useEffect(()=> {
    const language = getCSRLanguage()
    if(AVAILABLES_LANGS.some(s=> s == language)) {
      setLang(language)
    } 
  }, [])
  
  return {
    lang,
    setLang,
    textLang
  }
}