import { END_POINT } from "@/utils/config"
import { cookies } from "next/headers"

export async function customFetch(path: string) {
  const cookieStore = cookies()
  const cookie = cookieStore.get('qutool-discord-oauth2')

  return fetch(END_POINT+path, {
    headers: {
      cookie: `qutool-discord-oauth2=${cookie?.value}`
    }
  }).then(prom=> prom.json())
}