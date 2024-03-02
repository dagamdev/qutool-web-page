import '@/styles/docs.css'

import { Metadata } from 'next'
import { getSSRLanguage, getSSRTextByLang, controllers } from '@/lib'
import { transformText } from '@/utils/services'

export const metadata: Metadata = {
  title: 'TOS'
}

export default async function TermsPage(){
  const lang = getSSRLanguage()
  const text = getSSRTextByLang()
  const termsOfUse = await controllers.getTextsLang('TOS', lang)
  
  return (
    <main className='doc'>
      <section className='doc-section'>
        <h2>{text.bot.TOS}</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(termsOfUse)}}></p>
      </section>
    </main>
  )
}