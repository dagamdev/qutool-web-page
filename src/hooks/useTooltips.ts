import { useContext, type MouseEvent } from 'react'
import { TooltipsContext, type TooltipsContextData } from "@/contexts"
import type { ElementDirection, TooltipOption } from '@/types'

export function useTooltips() {
  const tooltipsContext = useContext(TooltipsContext) as TooltipsContextData

  const createTooltip = (event?: MouseEvent<HTMLElement>, config?: {
    options?: TooltipOption[]
    position?: {
      y: number
      x: number
    }
  }) => {
    if(event){
      const { currentTarget } = event
      if(!currentTarget.dataset.id){
        const direction = (currentTarget.dataset.direction || 'top') as ElementDirection
  
        const newTooltip = tooltipsContext.createTooltip({
          content: currentTarget.dataset.name ?? 'undefined',
          direction,
          ...config,
          targetElement: currentTarget
        })
    
        currentTarget.dataset.id = newTooltip.id
      }

    }else{
      tooltipsContext.createTooltip({
        content: 'undefined',
        direction: 'bottom',
        ...config,
      })
    }

  }

  return {
    ...tooltipsContext,
    createTooltip,
    events: {
      onMouseEnter(event: MouseEvent<HTMLElement>){
        const { innerWidth } = window
        if(innerWidth <= 700) return
        createTooltip(event)
      },
      onMouseLeave({currentTarget}: MouseEvent<HTMLElement>) {
        const id = currentTarget.dataset.id 
        tooltipsContext.setDeleteId(id)
      }
    }
  }
}