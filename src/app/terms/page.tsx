'use client'

import '@/styles/docs.scss'
import { useEffect, useState } from 'react'
import { customFetch, navigatorLanguage, transformText } from '@/utils/services'

export default function TermsPage(){
  const [terms, setTerms] = useState<{
    'es': string
    'en': string
  }>()

  useEffect(()=> {
    customFetch('bot/TOS')
    .then(res=> {
      if(res.en) setTerms(res)
    })
    .catch(e=> console.error('Error in get terms', e))
  }, [])  
  

  return (
    <main className='doc'>
      {terms && <section id='bot' className='doc-section'>
        <h2>Términos de Uso del Bot</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(terms[navigatorLanguage] || terms.en)}}></p>
      </section>}

      <section id='web' className='doc-section'>
        <h2>Términos de Uso de la Página</h2>
        <p>Working</p>
      </section>
    </main>
  )
}