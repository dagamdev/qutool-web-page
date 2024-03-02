import { getMessage } from '.'

const MESSAGE_BY_TYPE: Record<'description' | 'TOS' | 'PP', {[key: string]: string}> = {
  description: {
    en: '1129955066082762832',
    es: '1129955027902013462'
  },
  TOS: {
    en: '1127791687234756669',
    es: '1127790049048666172'
  },
  PP: {
    en: '1127792344238919680',
    es: '1127792290858012813'
  }
} as const

export async function getTextsLang(messageType: 'description' | 'TOS' | 'PP', language: string) {
  const description = await getMessage('1017921717261312040', MESSAGE_BY_TYPE[messageType][language])

  return description.content
}