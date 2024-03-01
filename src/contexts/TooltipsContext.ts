import { createContext } from 'react'
import type { Tooltip } from '@/types'

export interface TooltipsContextData {
  tooltips: Tooltip[]
  createTooltip: (newData: Omit<Tooltip, 'id'>) => Tooltip
  deleteTooltip: (id: string) => void
  deleteId?: string
  setDeleteId: (id?: string) => void
}

export const TooltipsContext = createContext<TooltipsContextData | undefined>(undefined)