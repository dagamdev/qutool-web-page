import { Metadata } from 'next'
import { getSession } from '@/lib'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s | Servers',
    default: 'Servers 🦾'
  }
}

export default async function ServersLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (session === null) redirect('/')

  return (
    <>
      {children}
    </>
  )
}