import styles from './servers.module.scss'
import Guilds from './components/Guilds'
import { getSSRTextByLang } from '@/lib'


export default async function ServersPage(){
  const text = getSSRTextByLang()

  return (
    <main className={styles.servers}>
      <h2>{text.servers}</h2>

      <Guilds />
    </main>
  )
}