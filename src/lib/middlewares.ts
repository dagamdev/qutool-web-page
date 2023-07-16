import { NextApiRequest, NextApiResponse } from "next"

export function isAuthenticate(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session
  
  if(!user) {
    res.status(401).json({error: 'Unauthorized'})
    return true
  }

  return false
}