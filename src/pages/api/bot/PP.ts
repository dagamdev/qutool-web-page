import { NextApiRequest, NextApiResponse } from "next";
import { getMessage } from "@/lib";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const PPEs = await getMessage('1017921717261312040', '1127790049048666172')
    const PPEn = await getMessage('1017921717261312040', '1127791687234756669')

    if(!PPEn.content && PPEs.content) return res.status(400).json({message: 'Content not found'})
    
    res.json({en: PPEn.content, es: PPEs.content})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}