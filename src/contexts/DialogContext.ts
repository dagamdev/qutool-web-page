import { createContext } from 'react'

export interface DialogContextData {
  showDialog: boolean
  openDialog: () => void
  closeDialog: () => void
}

export const DialogContext = createContext<DialogContextData | undefined>(undefined)