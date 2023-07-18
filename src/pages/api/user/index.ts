import { getClient } from "@/lib"
import { isAuthenticate } from "@/lib/middlewares"
import { withSessionRoute } from "@/lib/withSession"
import { customDiscordFetch } from "@/utils/services"

export default withSessionRoute(async (req, res)=> {
  if(isAuthenticate(req, res)) return
  
  if(req.method == 'GET'){
    const client = await getClient(req)

    if(!client) return res.status(404).json({message: 'Client session not found'})
    const user = await customDiscordFetch('users/@me', client.accessToken)

    if(!user) return res.status(404).json({message: 'User not found'})
    res.status(200).json(user)

  }else{
    res.status(404).json({message: 'Incorrect method'})
  }
  
})

