import styles from './page.module.css'

import LogInOrDashboard from '@/components/button/LogInButton'
import { transformText } from '@/utils/services'
import { getSSRLanguage, getSSRTextByLang, controllers } from '@/lib'

export default async function Home() {
  const lang = getSSRLanguage()
  const text = getSSRTextByLang()
  const description = await controllers.getTextsLang('description', lang)

  return (
    <main className={styles.home}>
      <h2>{text.title}</h2>
      <p className={styles.paragraph} dangerouslySetInnerHTML={{__html: transformText(description)}}></p>
      <LogInOrDashboard />
    </main>
  )
}
