import { getTextsLang } from "@/lib/controllers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function TermsOfUse(req: NextApiRequest, res: NextApiResponse) {
  try {
    const TOS = await getTextsLang('TOS')

    if(!TOS) return res.status(400).json({message: 'Content not found'})
    
    res.json(TOS)
    
  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}