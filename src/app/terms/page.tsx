import '@/styles/docs.css'

import { getSSRLanguage, getSSRTextByLang, controllers } from '@/lib'
import { transformText } from '@/utils/services'

export default async function TermsPage(){
  const lang = getSSRLanguage()
  const text = getSSRTextByLang()
  const termsOfUse = await controllers.getTextsLang('TOS')
  
  console.log({termsOfUse})

  return (
    <main className='doc'>
      <section id='bot' className='doc-section'>
        <h2>{text.bot.TOS}</h2>
        <p dangerouslySetInnerHTML={{__html: transformText(termsOfUse[lang] || '')}}></p>
      </section>

      {/* <section id='web' className='doc-section'>
        <h2>Términos de Uso de la Página</h2>
        <p>Working</p>
      </section> */}
    </main>
  )
}