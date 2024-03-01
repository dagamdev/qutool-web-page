import { DISCORD_END_POINT } from "./config"
import type { ElementDirection, Languages } from "../types"

export const documentExist = typeof document != 'undefined'
export const windowExist = typeof window != 'undefined'

export async function customDiscordFetch(path: string, token: string) {
  return fetch(DISCORD_END_POINT+path, {
    headers: {
      'Authorization': `${token}`
    }
  }).then(prom=> prom.json())
}

export async function customFetch(path: string, method?: string, body?: object) {
  return fetch('api/'+path, {
    method,
    headers: body ? {
      'Content-Type': 'application/json',
    } : undefined,
    body: body ? JSON.stringify({
      body
    }) : undefined
  }).then(prom=> prom.json())
}

export const transformText = (text: string) => {
  text = text.replace(/> /g, ``)

  if(text.includes('**')){
    const sep = text.split('**')
    if(sep.length % 2 != 0){
      text = sep.map((m, i) => i+1 == sep.length ? m : i%2 ? m+'</strong>' : m+'<strong>').join('')
    }
  }
  
  if(text.includes('*')){
    const sep = text.split('*')
    if(sep.length % 2 != 0){
      text = sep.map((m, i) => i+1 == sep.length ? m : i%2 ? m+'</em>' : m+'<em>').join('')
    }
  }

  text = text.split(' ').map(m=> {
    if(m.includes('http')){
      const start = m.indexOf('http')
      const preLink = m.slice(start, m.length)
      const end = (preLink.includes('<') ? preLink.indexOf('<') : preLink.length)+start
      const link = m.slice(start, end)

      return `${start == 0 ? '' : m.slice(0, start)}<a href="${link}" target="_blank">${link}</a>`+m.slice(end, m.length)
    }else return m
  }).join(' ')

  return text
}

export function setPositionByTarget(targetRect: DOMRect, element: HTMLDivElement, elementDirection: ElementDirection) {
  const { innerWidth } = window
  const pdd = 10, ed = 20

  if(innerWidth <= 500) return
  // console.log(thisRef)

  const hHalf = (targetRect.height/2)
  const wHalf = (targetRect.width/2) 
  let y = targetRect.top+hHalf
  let x = targetRect.left+wHalf

  const rect = element.getBoundingClientRect()
  const thHalf = rect.height/2
  const thWalf = rect.width/2

  const firstChild = element.childNodes.item(0) as HTMLDivElement
  const arrowRect = firstChild.getBoundingClientRect()
  
  // let aY = 0
  let aX = 0

  if(elementDirection == 'top'){
    y-=hHalf+rect.height+ed
    x-=thWalf
  }
  
  if(elementDirection == 'bottom'){
    y+=hHalf+ed
    x-=thWalf

  }

  if(elementDirection == 'left'){
    y-=thHalf
    x-=rect.width+ed

  }

  if(elementDirection == 'right'){
    y+=hHalf+ed
    x+=rect.width+ed

  }

  aX = (thWalf-arrowRect.width/2)

  if(x < pdd) {
    aX = (aX-((-x)+pdd))
    
    x=pdd
  }

  if(x+rect.width > innerWidth-pdd) {
    aX = (aX+(x+rect.width - (innerWidth-pdd)))

    x-= x+rect.width - (innerWidth-pdd)
  }

  element.style.top = y+'px'
  element.style.left = x+'px'
  // firstChild.style.top = aY ? aY+'px' : ''
  firstChild.style.left = aX ? aX+'px' : ''
}

export function setFixedAbsolutePosition(element: HTMLElement, position: {
  y: number
  x: number
}) {
  const { innerWidth, innerHeight } = window

  let { y, x} = position

  const rect = element.getBoundingClientRect()

  if(x+rect.width > innerWidth) element.style.left = x-rect.width+'px'
  else element.style.left = x+'px'

  if(y+rect.height > innerHeight) element.style.top = y-rect.height+'px'  
  else element.style.top = y+'px'  
}

export function getCSRLanguage(): Languages {
  return typeof navigator == 'undefined' ? 'en' : navigator.language.split('-')[0] as (Languages | undefined) || 'en'
}