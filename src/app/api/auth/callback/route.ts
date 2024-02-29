import { redirect } from "next/navigation"

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
      'redirect_uri': 'http://localhost:3000/api/auth/callback'
    })
    
    const authRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })

    console.log(authRes)

    if (authRes.status !== 200) {
      throw new Error('Failed response | status code != 200')
    }

    const authData = await authRes.json()
    console.log(authData)
  } catch (error) {
    console.log('Error in callback: ', error)
  }

  redirect('/')
}