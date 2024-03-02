import '@/styles/docs.css'

import { transformText } from '@/utils/services'
import { getSSRLanguage, getSSRTextByLang, controllers } from '@/lib'
import docs from '@/utils/documents.json'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy'
}

export default async function PrivacyPage(){
  const lang = getSSRLanguage()
  const text = getSSRTextByLang()
  const privacyPolicies = await controllers.getTextsLang('PP', lang)  

  return (
    <main className='doc'>
      <section className='doc-section'>
        <h2>{text.bot.PP}</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(privacyPolicies)}}></p>
      </section>

      <section className='doc-section'>
        <h2>Políticas de privacidad del la Página</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(docs[lang].PP)}} />
      </section>
    </main>
  )
}