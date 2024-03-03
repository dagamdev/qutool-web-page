import { createContext } from 'react'

export interface DialogContextData {
  showDialog: boolean
  loadDialog: boolean
  openDialog: () => void
  closeDialog: () => void
  setLoadDialog: () => void
}

export const DialogContext = createContext<DialogContextData | undefined>(undefined)