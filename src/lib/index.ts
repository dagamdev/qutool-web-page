import { ClientModel } from '@/models'
import { NextApiRequest } from 'next'
import { headers } from 'next/headers'
import texts from '@/utils/texts.json'
import type { Languages, Session } from '@/utils/types'

export { isAuthenticate } from './middlewares'
export { withSessionRoute, withSessionSsr } from './withSession'
import { getTextsLang } from './controllers'
export const  controllers = { getTextsLang } 

export async function getClient(req: NextApiRequest): Promise<Session | null> {
  return await ClientModel.findOne({userId: req.session.user?.id})
}

export function getMessage(channelId: string, messageId: string): Promise<{content: string}> {
  return fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`, {
    headers: {
      'Authorization': `Bot ${process.env.BOT_TOKEN}`
    }
  }).then(prom=> prom.json())
}

export function getSSRLanguage(): Languages {
  const headersList = headers()
  const languages = headersList.get('accept-language')
  if(languages) return languages.split('-')[0] as (Languages | undefined) || 'en'
  else return 'en'
  
}

export function getSSRTextByLang() {
  return texts[getSSRLanguage()]
}