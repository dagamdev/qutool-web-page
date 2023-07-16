import { withSessionRoute } from "@/lib";
import type { Session } from "@/utils/types";
import passport from 'passport'

export default withSessionRoute(async (req, res) =>{
  await passport.authenticate('discord', async (error: any, user: Session) => {
    if (error) {
      console.log(error)
      res.redirect('http://localhost:3000')

    } else if (!user) {
      console.log('user not authenticat')
      res.redirect('http://localhost:3000')

    } else {
      console.log(user)
      req.session.user = {
        id: user.userId
      }

      await req.session.save()
      res.redirect('http://localhost:3000/dashboard')
    }
  })(req, res)
})