import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: '935707268090056734',
      clientSecret: process.env.SECRET as string,
    })
  ]
})

export { handler as GET, handler as POST}
