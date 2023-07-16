import type { NextApiRequest, NextApiResponse } from "next";
import { getMessage } from "@/lib";

export default async function botDescription(req: NextApiRequest, res: NextApiResponse) {
  try {
    const descriptionEs = await getMessage('1017921717261312040', '1129955027902013462')
    const descriptionEn = await getMessage('1017921717261312040', '1129955066082762832')

    if(!descriptionEs.content && descriptionEn.content) return res.status(400).json({message: 'Content not found'})
    
    res.json({en: descriptionEn.content, es: descriptionEs.content})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}