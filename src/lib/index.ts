import { SessionModel } from '@/models'
import { cookies } from 'next/headers'
import { headers } from 'next/headers'
import texts from '@/utils/texts.json'
import type { Languages } from '@/types'
import { getTextsLang } from './controllers'
import { DISCORD_END_POINT } from '@/utils/config'
export const  controllers = { getTextsLang } 

export async function getSession() {
  const cookieStore = cookies()
  return await SessionModel.findById(cookieStore.get('sessionId')?.value)
}

export async function getMessage(channelId: string, messageId: string): Promise<{content: string}> {
  return fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`, {
    headers: {
      'Authorization': `Bot ${process.env.BOT_TOKEN}`
    }
  }).then(prom=> prom.json())
}

export function getSSRLanguage(): Languages {
  const headersList = headers()
  const languages = headersList.get('accept-language')
  if(languages) return languages.split('-')[0] as (Languages | undefined) ?? 'en'
  else return 'en'
  
}

export function getSSRTextByLang() {
  return texts[getSSRLanguage()]
}

export async function discordFetch (path: string, init?: RequestInit) {
  const response = await fetch('https://discord.com/api/v10/' + path, init)
  const contentType = response.headers.get('content-type')

  if (contentType !== 'application/json') {
    return {
      message: 'The response is not json'
    }
  }

  return await response.json()
}

export async function customBotFetch(path: string) {
  return fetch(DISCORD_END_POINT+path, {
    headers: {
      'Authorization': `Bot ${process.env.BOT_TOKEN}`
    }
  }).then(prom=> prom.json())
}