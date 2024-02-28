import type { NextApiRequest, NextApiResponse } from "next";
import { getMessage } from "@/lib";
import { getTextsLang } from "@/lib/controllers";

export default async function botDescription(req: NextApiRequest, res: NextApiResponse) {
  try {
    const description = await getTextsLang('description')

    if(description) return res.status(400).json({message: 'Content not found'})
    
    res.json(description)

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}