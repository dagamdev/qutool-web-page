import styles from './servers.module.css'
import Guilds from './components/Guilds'
import { discordFetch, getSSRTextByLang, getSession } from '@/lib'

export default async function ServersPage(){
  const text = getSSRTextByLang()
  const session = await getSession()
  const guilds = await discordFetch('users/@me/guilds?with_counts=true', session?.accessToken)

  return (
    <main className={styles.servers}>
      <h2>{text.servers}</h2>

      {Array.isArray(guilds)
        ? <Guilds guilds={guilds.filter(g => (+g.permissions & 0x0000000000000008) === 0x0000000000000008)} />
        : <p>Error</p>
      }
    </main>
  )
}