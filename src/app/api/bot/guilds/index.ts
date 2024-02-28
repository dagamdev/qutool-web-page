import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getGuilds(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method == 'GET'){
    try {
      const preGuilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
        headers: {
          'Authorization': `Bot ${process.env.BOT_TOKEN}`
        }
      })
      const guilds = await preGuilds.json()

      res.json(guilds)

    } catch (error: any) {
      res.status(400).json({message: error.message})
    }

  }else res.status(404).json({message: 'Incorrect method'})
}