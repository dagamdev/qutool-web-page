import { useContext } from 'react'
import { DialogContext, type DialogContextData } from "@/contexts";

export function useDialog() {
  return useContext(DialogContext) as DialogContextData
}