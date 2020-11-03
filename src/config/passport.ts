/* eslint-disable @typescript-eslint/camelcase */
import passport from 'passport';
import GoogleTokenStrategy from 'passport-google-id-token';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import User from '../models/User';
import UserService from '../services/user';
import { BadRequestError } from '../helpers/apiError';

const GOOGLE_CLIENT_ID = '66461290434-jd6st0fq3gulg1rpi1dchp9ll42hnsl5.apps.googleusercontent.com';

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleTokenStrategy({
  clientID: GOOGLE_CLIENT_ID
},
  async function (parsedToken: any, googleId: string, done: any) {
    if (!parsedToken) { new BadRequestError('parsedToken is not supplied in pass config'); }
    try {
      const { email, given_name, family_name } = parsedToken.payload;
      const googleUser = await User.findOne({ email });
      if (googleUser) {
        console.log('from pass config: GOOGLE USER EXISTS', googleUser);
        done(null, googleUser);
      }

      const randomPassword = crypto.randomBytes(16).toString('hex');
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      const user = new User({
        googleId: googleId,
        email: email,
        firstName: given_name,
        lastName: family_name,
        password: hashedPassword,
        passwordConfirm: hashedPassword,
        isAdmin: false
      });
      // console.log('from pass config: USER IS ABOUT TO BE CREATED', user)
      await UserService.create(user);
      // console.log('from pass config: NEW GOOGLE USER CREATED', user)
      done(null, user); //req.user
    } catch (err) {
      new BadRequestError('Bad passport config');
      done(err);
    }
  }
));