import styles from '../servers.module.css'

import { useState, useEffect } from 'react'
import DiscordImage from "@/components/image/DiscordImage"
import type { Guild } from "@/types"
import { customFetch } from '@/utils/services'
import { useLanguage } from '@/hooks'

export default function GuildCard ({ guild }: { guild: Guild }){
  const { textLang } = useLanguage()
  const [inGuild, setInGuild] = useState(false)

  useEffect(()=> {
    customFetch(`bot/servers/${guild.id}`).then(res=> {
      if(res.id) setInGuild(true)
    }).catch(e=> console.error(e))
  }, [])

  return (
    <ul className={styles.card}>
      <header>
        <picture>
          {guild.icon && 
            <DiscordImage type={'guild icon'} id={guild.id} image={guild.icon} alt={guild.name} width={60} height={60} /> 
          }
        </picture>

        <div>
          <strong>{guild.name}</strong>
          {guild.approximate_member_count &&
            <p>
              <strong>{guild.approximate_member_count.toLocaleString()}</strong> {textLang.members}
            </p>
          }
        </div>
      </header>

      {inGuild ? 
        <a className='button' href={'/dashboard/'+guild.id}>{textLang.manageServer}</a> :
        <a className='button invert' href={`https://discord.com/oauth2/authorize?client_id=935707268090056734&scope=bot&permissions=1374725470454&guild_id=${guild.id}&response_type=code&redirect_uri=http://localhost:3000/dashboard`} >{textLang.bot.add}</a>
      }

    </ul>
  )
}