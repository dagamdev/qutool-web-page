import { getTextsLang } from "@/lib/controllers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function PrivacyPilicies(req: NextApiRequest, res: NextApiResponse) {
  try {
    const PP = await getTextsLang('PP')

    if(!PP) return res.status(400).json({message: 'Content not found'})
    
    res.json(PP)

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}