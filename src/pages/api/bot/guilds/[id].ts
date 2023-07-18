import { customBotFetch } from '@/lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getGuildById(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method == 'GET'){
    const { id } = req.query

    try {
      const guild = await customBotFetch(`guilds/${id}`)
      res.status(200).json(guild)

    } catch (error: any) {
      res.status(400).json({message: error.message})
    }
    
  }else res.status(404).json({message: 'Incorrect method'})
}