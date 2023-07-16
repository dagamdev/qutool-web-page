import passport from 'passport'
import { Strategy as DiscordStrategy } from 'passport-discord'
import { NextRequest, NextResponse } from 'next/server'
import { ClientModel } from '@/models'

passport.serializeUser((user: any, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await ClientModel.findById(id)
    return user ? done(null, user) : done(null, null)
    
  } catch (error: any) {
    return done(error)
  }
})

passport.use(new DiscordStrategy({
  clientID: '935707268090056734',
  clientSecret: process.env.SECRET || '',
  callbackURL: (process.env.DOMAIN_PATH || 'http://localhost:3000')+'/api/auth/redirect',
  scope: ['identify', 'email', 'guilds.join']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const client = await ClientModel.findOneAndUpdate({userId: profile.id}, {
      accessToken, refreshToken
    }, {new: true})

    if(client) return done(null, client)

    const newClient = await ClientModel.create({
      userId: profile.id,
      accessToken, 
      refreshToken
    })

    await newClient.save()
    return done(null, newClient)

  } catch (error: any) {
    done(error)
  }
}))

export default function auth(req: NextRequest, res: NextResponse) {
  passport.authenticate('discord')(req, res)
}