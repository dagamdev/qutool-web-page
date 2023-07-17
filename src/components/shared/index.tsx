'use client'

import { useDialog, useTooltips } from "@/hooks"
import Tooltip from "./tooltip"
import Header from "./header"
import CursorTarget from "./cursorTarget"
import ConsenNotice from "../dialog/ConsentNotice"

export default function SharedComponents(){
  const { tooltips } = useTooltips()
  const { showDialog } = useDialog()
  
  return (
    <>
      <Header />
      <CursorTarget />
      {tooltips && tooltips.map(t=> <Tooltip key={t.id} tooltip={t} />)}
      {showDialog && <ConsenNotice />}
    </>
  )
}