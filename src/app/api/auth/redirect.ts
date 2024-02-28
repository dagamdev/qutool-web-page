import { withSessionRoute } from "@/lib";
import type { Session } from "@/utils/types";
import passport from 'passport'

export default withSessionRoute(async (req, res) =>{
  await passport.authenticate('discord', async (error: any, user: Session) => {
    const domainPath = process.env.DOMAIN_PATH || 'http://localhost:3000'
    
    if (error) {
      console.log(error)
      res.redirect(domainPath)

    } else if (!user) {
      console.log('user not authenticat')
      res.redirect(domainPath)

    } else {
      console.log(user)
      req.session.user = {
        id: user.userId
      }

      await req.session.save()
      res.redirect(domainPath+'/servers')
    }
  })(req, res)
})