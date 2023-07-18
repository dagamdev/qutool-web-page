import styles from './dashboard.module.scss'
import Guilds from './components/Guilds'
import { getSSRTextByLang } from '@/lib'


export default async function DashboardPage(){
  const text = getSSRTextByLang()


  return (
    <main className={styles.dashboard}>
      <h2>{text.dashboard}</h2>

      <Guilds />
    </main>
  )
}