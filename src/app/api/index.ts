import type { NextApiRequest, NextApiResponse } from "next"

export default function index(req: NextApiRequest, res: NextApiResponse) {
  res.json({message: 'Hello'})  
}