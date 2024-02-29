import styles from './tooltip.module.css'

import { useRef, useState, useEffect } from 'react'
import { useTooltips } from '@/hooks'
import { documentExist, setFixedAbsolutePosition, setPositionByTarget, windowExist } from '@/utils/services'
import { Tooltip } from '@/utils/types'

export default function Tooltip({tooltip}: {
  tooltip: Tooltip
}){
  const [thisRef, setThisRef] = useState<HTMLDivElement | null>(null)
  const [background, setBackground] = useState(false)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { deleteTooltip, deleteId, setDeleteId } = useTooltips()

  const minWidth = windowExist ? window.innerWidth <= 500 : false

  const closeTooltip = () => {
    if(thisRef && thisRef.classList.contains(styles.show)) {
      thisRef.classList.remove(styles.show)
    }

    if(backgroundRef.current && backgroundRef.current.classList.contains(styles.show)){
      backgroundRef.current?.classList.remove(styles.show)
    }
    
    tooltip.targetElement?.removeAttribute('data-id')

    setTimeout(()=> {
      deleteTooltip(tooltip.id)
      setDeleteId()
    }, 400)
  }

  useEffect(()=> {
    if(tooltip && thisRef){
      if(tooltip.targetElement && !minWidth){
        setPositionByTarget(tooltip.targetElement.getBoundingClientRect(), thisRef, tooltip.direction)
      }

      if(tooltip.position) setFixedAbsolutePosition(thisRef, tooltip.position)

      if(tooltip.options) {
        if(minWidth){
          setBackground(true)
          backgroundRef.current?.classList.add(styles.show)
        }
        
      }
      if(!minWidth) thisRef.classList.add(styles.show)
    }

    const handleGlobalClick = (event: MouseEvent) => {
      if(thisRef && event.target && !thisRef.contains(event.target as Node)){
        closeTooltip()
      }
    }

    if(documentExist){
      document.addEventListener('click', handleGlobalClick)
      
      return () => {
        document.removeEventListener('click', handleGlobalClick)
      }
    }

  }, [thisRef, tooltip])

  useEffect(()=> {
    // console.log({deleteId})
    if(deleteId == tooltip.id) closeTooltip()
    

  }, [deleteId, thisRef])

  const tooltipElement = tooltip && (
    <div ref={setThisRef} className={`${styles.tooltip} ${tooltip.options ? styles.options : ''} ${styles[tooltip.direction || 'top']} tlp`} >
      {tooltip.targetElement && <div className={styles['tooltip-arrow']} />}
      {tooltip.options ?
        tooltip.options.map(o=> <li key={o.name} className={styles['tooltip-option']} onClick={()=> {
          o.function()
          closeTooltip()
        }} >
          <div>
            {typeof o.icon == 'string' ? 
              <p>{o.icon}</p> :
              <div className={styles['tooltip-option-icon']}>{o.icon}</div>
            }
            <p>{o.name}</p> 
          </div>
        </li>) :
        <p>{tooltip.content}</p>
      }
    </div>
  )

  return (
    <>
      {background ? 
        <div ref={backgroundRef} className={styles.background} >
          {tooltipElement}
        </div> :
        tooltipElement
      }
    </>
  )
}