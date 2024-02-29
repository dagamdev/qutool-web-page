import { customBotFetch } from '@/lib'

export async function GET (req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const guild = await customBotFetch(`guilds/${id}`)
    return new Response(JSON.stringify(guild))

  } catch (error: any) {
    return new Response(JSON.stringify(error))
  }
}