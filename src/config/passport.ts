import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import GoogleTokenStrategy from 'passport-google-id-token'

import User from '../models/User'
import UserService from '../services/user'

const GOOGLE_CLIENT_ID = '66461290434-jd6st0fq3gulg1rpi1dchp9ll42hnsl5.apps.googleusercontent.com'

//determines which data of the user object should be stored in the session
//result is attached to the session as req.session.passport.user = {}.
passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new GoogleTokenStrategy({
  clientID: GOOGLE_CLIENT_ID
},
  async function (parsedToken: any, googleId: string, done: any) {
    const { userName, email, firstName, lastName, role, id } = parsedToken
    try {
      console.log(parsedToken)
      const currentUser = User.findOne({ googleId })
      if (currentUser) {
        done(null, currentUser)
      }
      const user = new User({
        googleId,
        // userName,
        // email,
        // firstName,
        // lastName,
        // role
      }).save()
      // await UserService.create(user)
      console.log(user)
      done(null, user) //req.user
    } catch (err) {
      console.log('error')
      done(err)
    }
  }
))

