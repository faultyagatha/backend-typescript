import express from 'express'
import passport from 'passport'

import {
  findById,
  deleteUser,
  findAll,
  updateUser,
  updateMyAccount,
  deleteMyAccount,
} from '../controllers/user'
import {
  signup,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/auth'
import {
  isLoggedin, restrictTo
} from '../middlewares/authHandlers'


const router = express.Router()

router.post(
  '/login/google',
  passport.authenticate('google-id-token'),
  // function (req, res) {
  //   res.send(req.user ? 200 : 401).json()
  // }
  googleLogin
)

router.post('/signup', signup)
router.post('/login', login)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.send(req.user))


//KEEP THESE ROUTES ON TOP!!
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

// router.use(isLoggedin) //remove for testing
router.patch('/updatePassword', updatePassword)
router.patch('/updateMyAccount', updateMyAccount)
router.patch('/deleteMyAccount', deleteMyAccount)

// router.use(restrictTo('admin')) //remove for testing
router.get('/', findAll)
router.get('/:userId', findById)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
