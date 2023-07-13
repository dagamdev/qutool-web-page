'use client'

import { useTooltips } from "@/hooks"
import Tooltip from "./tooltip"
import Header from "./header"
import CursorTarget from "./cursorTarget"

export default function SharedComponents(){
  const { tooltips } = useTooltips()
  
  return (
    <>
      <Header />
      <CursorTarget />
      {tooltips && tooltips.map(t=> <Tooltip key={t.id} tooltip={t} />)}
    </>
  )
}