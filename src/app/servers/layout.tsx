import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Servers'
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}