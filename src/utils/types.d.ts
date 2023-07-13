export interface Session {
  userId: string
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
  bot?: boolean
  flags?: number
  email?: string
  locale?: string
  avatar: string | null
  banner: string | null
  username: string
  verified?: boolean
  global_name: string | null
  mfa_enabled: boolean | null
  premium_type?: number
  public_flags?: number
  accent_color: string | null 
  banner_color: string | null 
  discriminator: string
  avatar_decoration: string | null
}

export type ElementDirection = 'top' | 'left' | 'bottom' | 'right'

export interface TooltipOption {
  icon: string | JSX.Element
  name: string
  function: ()=> void
}

export interface Tooltip {
  id: string
  content: string
  options?: TooltipOption[]
  direction: ElementDirection
  position?: {
    y: number
    x: number
  }
  targetElement?: EventTarget & HTMLElement
}