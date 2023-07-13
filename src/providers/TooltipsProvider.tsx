import { useState, type ReactNode } from 'react'
import { TooltipsContext } from "../contexts"
import type { Tooltip } from '@/utils/types'

export default function TooltipsProvider({ children }: { children: ReactNode }){
  const [tooltips, setTooltips] = useState<Tooltip[]>([])
  const [deleteId, setDeleteId] = useState<string>()

  const createTooltip = (newData: Omit<Tooltip, 'id'>) => {
    const newTooltip = {
      id: crypto.randomUUID(),
      ...newData
    }

    setTooltips(ts=> [
      ...ts, 
      newTooltip
    ])

    return newTooltip
  }

  const deleteTooltip = (id: string) => {
    setTooltips(ts=> ts.filter(f=> f.id != id))
  }

  return (
    <TooltipsContext.Provider value={{ 
      tooltips, 
      createTooltip,
      deleteTooltip,
      deleteId,
      setDeleteId
    }}>
      {children}
    </TooltipsContext.Provider>
  )
}