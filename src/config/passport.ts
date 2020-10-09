import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import GoogleTokenStrategy from 'passport-google-id-token'
import passportGoogle from 'passport-google-oauth'

import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'

const GOOGLE_CLIENT_ID = '66461290434-jd6st0fq3gulg1rpi1dchp9ll42hnsl5.apps.googleusercontent.com'
// const GOOGLE_CLIENT_SECRET = '-ozQ0WGNLiVy72cdzh_mnlUk'
// const GoogleStrategy = passportGoogle.OAuth2Strategy

// passport.serializeUser<any, any>((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user)
//   })
// })

// passport.use(new GoogleStrategy(
//   {
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: '/login/google/redirect'
//   }, (accessToken, refreshToken, profile, done) => {
//     User.findOne({ googleId: profile.id }).then(currentUser => {
//       if (currentUser) {
//         //if we already have a record with the given profile ID
//         done(null, currentUser)
//       } else {
//         //if not, create a new user 
//         new User({
//           googleId: profile.id,
//         }).save().then((newUser) => {
//           done(null, newUser)
//         })
//       }
//     })
//   }
// ))

//determines which data of the user object should be stored in the session
//result is attached to the session as req.session.passport.user = {}.
// passport.serializeUser<any, any>((user, done) => {
//   if (!user) { new BadRequestError('user is not found in pass config') }
//   done(undefined, user.id)
// })

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     if (!user) { new BadRequestError('user is not found in pass config') }
//     done(err, user)
//   })
// })

// passport.use(new GoogleTokenStrategy({
//   clientID: GOOGLE_CLIENT_ID
// },
//   async function (parsedToken: any, googleId: string, done: any) {
//     const { userName, email, firstName, lastName, role, id } = parsedToken
//     if (!parsedToken) { new BadRequestError('parsedToken is not supplied in pass config') }
//     try {
//       console.log(parsedToken)
//       const currentUser = User.findOne({ googleId })
//       if (currentUser) {
//         done(null, currentUser)
//       }
//       const user = new User({
//         googleId,
//         // userName,
//         // email,
//         // firstName,
//         // lastName,
//         // role
//       }).save()
//       // await UserService.create(user)
//       console.log(user)
//       done(null, user) //req.user
//     } catch (err) {
//       new BadRequestError('Bad passport config')
//       done(err)
//     }
//   }
// ))

passport.use(new GoogleTokenStrategy({
  clientID: GOOGLE_CLIENT_ID
},
  function (parsedToken: any, googleId: string, done: any) {
    User.findById({ id: googleId }, function (err, user) {
      return done(err, user)
    })
  }
))
