import { NextApiRequest, NextApiResponse } from "next";
import { getMessage } from "@/lib";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const TOSEs = await getMessage('1017921717261312040', '1127792290858012813')
    const TOSEn = await getMessage('1017921717261312040', '1127792344238919680')

    if(!TOSEn.content && TOSEs.content) return res.status(400).json({message: 'Content not found'})
    
    res.json({en: TOSEn.content, es: TOSEs.content})
    
  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}