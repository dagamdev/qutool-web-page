import '@/styles/docs.scss'

import { transformText } from '@/utils/services'
import { getSSRLanguage, getSSRTextByLang, controllers } from '@/lib'
import docs from '@/utils/documents.json'


export default async function PrivacyPage(){
  const lang = getSSRLanguage()
  const text = getSSRTextByLang()
  const privacyPolicies = await controllers.getTextsLang('PP')  

  return (
    <main className='doc'>
      <section id='bot' className='doc-section'>
        <h2>{text.bot.PP}</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(privacyPolicies[lang])}}></p>
      </section>

      <section id='web' className='doc-section'>
        <h2>Políticas de privacidad del la Página</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(docs[lang].PP)}} />
      </section>
    </main>
  )
}