import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalProviders from '@/providers/globalProviders'
import SharedComponents from '@/components/shared'
import { getSession, getUser } from '@/lib'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Qutool 🦾',
    default: 'Qutool 🦾'
  },
  description: 'Página Web de Qutool bot de Discord verificado con caracteristicas utiles para tu servidor.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  const user = await getUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProviders session={session ? {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken
        } : undefined} user={user ?? undefined}>
          <SharedComponents />
          {children}
        </GlobalProviders>
      </body>
    </html>
  )
}
