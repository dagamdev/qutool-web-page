import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'TOS'
}

export default function TermsLayout({
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