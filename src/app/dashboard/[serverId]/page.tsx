'use client'

import styles from '../dashboard.module.scss'
import { useLanguage } from '@/hooks'

export default function DashboardPage({params: {serverId}}: {params: {serverId: string}}){
  const { lang } = useLanguage()
  const isEnglish = lang == 'en'

  return (
    <main className={styles.dashboard}>
      <p>{isEnglish ? 'Dashboard in development...' : 'Panel en desarrollo...'}</p>
    </main>
  )
}