import styles from './server.module.css'

import { Metadata } from 'next'
import { getSSRLanguage } from '@/lib'

export const metadata: Metadata = {
  title: 'Dashboard'
}

console.log('page')

export default async function DashboardPage({params: {id}}: {params: {id: string}}){
  const lang = getSSRLanguage()
  const isEnglish = lang === 'en'

  return (
    <main className={styles.dashboard}>
      <p>{isEnglish ? 'Dashboard in development...' : 'Panel en desarrollo...' + id}</p>
    </main>
  )
}