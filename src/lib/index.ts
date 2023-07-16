import { ClientModel } from '@/models'
import type { Session } from '@/utils/types'
import { NextApiRequest } from 'next'

export { isAuthenticate } from './middlewares'
export { withSessionRoute, withSessionSsr } from './withSession'

export async function getClient(req: NextApiRequest): Promise<Session | null> {
  return await ClientModel.findOne({userId: req.session.user?.id})
}

export function getMessage(channelId: string, messageId: string) {
  return fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`, {
    headers: {
      'Authorization': `Bot ${process.env.BOT_TOKEN}`
    }
  }).then(prom=> prom.json())
}