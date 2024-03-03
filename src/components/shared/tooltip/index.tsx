import styles from './tooltip.module.css'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useTooltips } from '@/hooks'
import { documentExist, setFixedAbsolutePosition, setPositionByTarget, windowExist } from '@/utils/services'
import { Tooltip } from '@/types'

export default function Tooltip({tooltip}: {
  tooltip: Tooltip
}){
  const [thisRef, setThisRef] = useState<HTMLDivElement | null>(null)
  const [background, setBackground] = useState(false)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { deleteTooltip, deleteId, setDeleteId } = useTooltips()

  const minWidth = windowExist ? window.innerWidth <= 500 : false

  const closeTooltip = useCallback(() => {
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
  }, [thisRef, deleteTooltip, setDeleteId, tooltip.id, tooltip.targetElement])

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
      if(thisRef && event.target instanceof Node && !thisRef.contains(event.target)){
        closeTooltip()
      }
    }

    if(documentExist){
      document.addEventListener('click', handleGlobalClick)
      
      return () => {
        document.removeEventListener('click', handleGlobalClick)
      }
    }

  }, [thisRef, tooltip, closeTooltip, minWidth])

  useEffect(()=> {
    if(deleteId === tooltip.id) closeTooltip()
  }, [deleteId, thisRef, tooltip.id, closeTooltip])

  const tooltipElement = tooltip && (
    <div ref={setThisRef} className={`${styles.root} ${tooltip.options ? styles.options : ''} ${styles[tooltip.direction ?? 'top']} tlp`} >
      {tooltip.targetElement && <div className={styles.arrow} />}
      {tooltip.options ?
        tooltip.options.map(o => <li key={o.name} className={styles.option}
          onClick={o.events.onClick ? (ev) => {
            o.events.onClick?.(ev)
            if (o.closeAfterEvent === true || typeof o.closeAfterEvent === 'object' && o.closeAfterEvent.onClick) {
              closeTooltip()
            }
          } : undefined}
          onMouseEnter={o.events.onMouseEnter ? (ev) => {
            o.events.onMouseEnter?.(ev)
            if (o.closeAfterEvent === true || typeof o.closeAfterEvent === 'object' && o.closeAfterEvent.onMouseEnter) {
              closeTooltip()
            }
          } : undefined}
        >
          {typeof o.icon == 'string' ? 
            <p>{o.icon}</p> :
            <div className={styles['tooltip-option-icon']}>{o.icon}</div>
          }
          <p>{o.name}</p> 
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