import { withSessionRoute } from "@/lib";
import type { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute((req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session
  if(!user) return res.status(401).json({message: 'No authenticated'})
  
  req.session.destroy()
  res.status(200).json({ok: true}) 
})