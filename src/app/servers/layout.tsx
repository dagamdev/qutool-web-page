import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Servers'
}

export default async function ServersLayout({
  children
}: {
  children: React.ReactNode
}) {
  console.log('Servers layout')

  return (
    <>
      {children}
    </>
  )
}