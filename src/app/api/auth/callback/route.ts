import { SessionModel } from '@/models'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import type { Oauth2Data } from '@/types'

export async function GET (req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  try {
    if (!code) {
      throw new Error('Te code param is undefined')
    }
  
    const body = new URLSearchParams({
      'client_id': process.env.CLIENT_ID as string,
      'client_secret': process.env.CLIENT_SECRET as string,
      'grant_type': 'authorization_code',
      code,
      'redirect_uri': url.origin + url.pathname
    })
    
    const authRes = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })

    if (authRes.status !== 200) {
      throw new Error('Failed response | status code != 200')
    }

    const authData: Oauth2Data = await authRes.json()

    const newSession = await SessionModel.create({
      accessToken: authData.access_token,
      refreshToken: authData.refresh_token
    })

    const cookieStore = cookies()
    cookieStore.set('sessionId', newSession.id)

  } catch (error) {
    console.log('Error in callback: ', error)
  }

  redirect('/')
}