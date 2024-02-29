export interface Oauth2Data {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface Session {
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
  bot?: boolean
  flags?: number
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

export interface Guild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
  features: string[]
  approximate_member_count?: number
  approximate_presence_count?: number
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

export type Languages = 'en' | 'es'

export interface LanguageData {
  en: string
  es: string
}