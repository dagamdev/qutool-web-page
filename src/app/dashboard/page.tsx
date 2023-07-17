'use client'

import { useLanguage } from "@/hooks"
import { useEffect } from "react"

export default function DashboardPage(){
  const { textLang } = useLanguage()

  useEffect(()=> {
  }, [])

  return (
    <main>
      <h2>{textLang.dashboard}</h2>

    </main>
  )
}