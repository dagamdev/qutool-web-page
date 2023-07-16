import { withSessionRoute, isAuthenticate, getClient } from "@/lib"

export default withSessionRoute(async (req, res)=> {
  if(isAuthenticate(req, res)) return
  
  const client = await getClient(req)
  if(!client) return res.status(404).json({message: 'Client session not found'})

  res.status(200).json(client)
})