'use client'

import '@/styles/docs.scss'
import { useState, useEffect } from 'react'
import { customFetch, navigatorLanguage, transformText } from '@/utils/services'

export default function PrivacyPage(){
  const [terms, setTerms] = useState<{
    'es': string
    'en': string
  }>()

  useEffect(()=> {
    customFetch('bot/PP')
    .then(res=> {
      if(res.en) setTerms(res)
    })
    .catch(e=> console.error('Error in get terms', e))
  }, [])  
  

  return (
    <main className='doc'>
      {terms && <section id='bot' className='doc-section'>
        <h2>Políticas de privacidad del bot Bot</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(terms[navigatorLanguage] || terms.en)}}></p>
      </section>}

      <section id='web' className='doc-section'>
        <h2>Políticas de privacidad del la Página</h2>
        <p>Working...</p>
      </section>
    </main>
  )
}