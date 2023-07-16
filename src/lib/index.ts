import { ClientModel } from '@/models'
import type { Session } from '@/utils/types'
import { NextApiRequest } from 'next'

export { isAuthenticate } from './middlewares'
export { withSessionRoute, withSessionSsr } from './withSession'

export async function getClient(req: NextApiRequest): Promise<Session | null> {
  return await ClientModel.findOne({userId: req.session.user?.id})
}