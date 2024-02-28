import type { NextApiRequest, NextApiResponse } from "next"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.json({message: 'Hello'})  
}