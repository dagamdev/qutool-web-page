import styles from './servers.module.css'
import Guilds from './components/Guilds'
import { discordFetch, getSSRTextByLang, getSession } from '@/lib'

export default async function ServersPage(){
  const text = getSSRTextByLang()
  const session = await getSession()
  const guilds = await discordFetch('users/@me/guilds?with_counts=true', {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`
    }
  })

  return (
    <main className={styles.servers}>
      <h2>{text.servers}</h2>

      {guilds
        ? <Guilds guilds={guilds} />
        : <p>Error</p>
      }
    </main>
  )
}