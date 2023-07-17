import { getMessage } from "."

const MESSAGE_BY_TYPE = {
  description: {
    en: '1129955066082762832',
    es: '1129955027902013462'
  },
  TOS: {
    en: '1127790049048666172',
    es: '1127791687234756669'
  },
  PP: {
    en: '1127792344238919680',
    es: '1127792290858012813'
  }
} as const

export async function getTextsLang(messageType: 'description' | 'TOS' | 'PP') {
  const descriptionEn = await getMessage('1017921717261312040', MESSAGE_BY_TYPE[messageType].en)
  const descriptionEs = await getMessage('1017921717261312040', MESSAGE_BY_TYPE[messageType].es)

  return {
    en: descriptionEn.content,
    es: descriptionEs.content
  }
}