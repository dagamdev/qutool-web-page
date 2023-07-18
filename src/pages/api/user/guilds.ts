import { getClient, isAuthenticate, withSessionRoute } from "@/lib";
import { customDiscordFetch } from "@/utils/services";

export default withSessionRoute(async (req, res)=> {
  
  if(req.method == 'GET'){
    if(isAuthenticate(req, res)) return
    try {
      const { query } = req
      const client = await getClient(req)
      
      if(!client) return res.status(404).json({message: 'Client session not found'})
      let queryes: string[] = []
      for(let k in query){
        queryes.push(`${k}=${query[k]}`)
      }
      
      const guilds = await customDiscordFetch('users/@me/guilds'+(queryes.length ? 
        '?'+queryes.join('&') : 
        ''
      ), client.accessToken)

      if(!guilds) return res.status(404).json({message: 'Guilds not found'})
      res.status(200).json(guilds)
    
    } catch (error: any) {
      res.status(400).json({message: error.message})
    }
  } else res.status(404).json({message: 'Incorrect method'})
})