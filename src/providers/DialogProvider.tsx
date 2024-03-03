import { useState, type ReactNode } from 'react'
import { DialogContext } from '../contexts'

export default function DialogProvider({ children }: { children: ReactNode }){
  const [showDialog, setsHowDialog] = useState(false)
  const [loadDialog, setLoadDialog] = useState(false)

  return (
    <DialogContext.Provider value={{
      showDialog,
      openDialog() {
        setsHowDialog(true)
      },
      closeDialog() {
        setsHowDialog(false)
      },
      loadDialog,
      setLoadDialog () {
        if (!loadDialog) setLoadDialog(true)
      }
    }} >
      {children}
    </DialogContext.Provider>
  )
}