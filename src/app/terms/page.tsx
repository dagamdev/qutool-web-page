'use client'

import '@/styles/docs.scss'
import { useEffect, useState } from 'react'
import { navigatorLanguage, transformText } from '@/utils/services'
import { END_POINT } from "@/utils/config"

export default function TermsPage(){
  const [terms, setTerms] = useState<{
    'es': string
    'en': string
  }>()

  useEffect(()=> {
    fetch(END_POINT+'TOS').then(prom=> prom.json())
    .then(res=> {
      if(res.en) setTerms(res)
    })
    .catch(e=> console.error('Error in get terms', e))
  }, [])  
  
  console.log(navigatorLanguage)

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