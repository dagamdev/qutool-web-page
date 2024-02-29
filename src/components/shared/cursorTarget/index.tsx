import styles from './cursorTarget.module.css'

import { useEffect, useState } from 'react'
import { documentExist } from '@/utils/services'

export default function CursorTarget(){
  const [cursorRef, setCursorRef] = useState<HTMLDivElement | null>(null)
  
  useEffect(()=> {
    if(cursorRef){
      if(documentExist){
        const handleMousemove = (event: MouseEvent) => {
          const { clientX, clientY } = event
          cursorRef.style.background = `radial-gradient(100px at ${clientX}px ${clientY}px, rgba(45, 137, 160, 0.120), transparent 50%)`
        }
        
        document.addEventListener('mousemove', handleMousemove)

        return () => {
          document.removeEventListener('mousemove', handleMousemove)
        }
      }
    }

  }, [cursorRef])

  return (
    <div ref={setCursorRef} className={styles.target} />
  )
}