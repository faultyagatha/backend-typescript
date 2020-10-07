import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import GoogleTokenStrategy from 'passport-google-id-token'

import User from '../models/User'

const GOOGLE_CLIENT_ID = '66461290434-jd6st0fq3gulg1rpi1dchp9ll42hnsl5.apps.googleusercontent.com'

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
    console.log(parsedToken)
    try {

    } catch (err) {
      done(err)
    }

    // User.findOne({ googleId }, function (err, user) {
    //   return done(err, user);
    // });
    // }
  }
))

