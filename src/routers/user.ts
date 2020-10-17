import express from 'express'
import passport from 'passport'
import '../config/passport'

import {
  findById,
  deleteUser,
  findAll,
  getProfile,
  updateUser,
  updateProfile
} from '../controllers/user'
import {
  signup,
  login,
  googleLogin,
  // forgotPassword,
  // resetPassword,
} from '../controllers/auth'
import {
  protect, admin
} from '../middlewares/authHandlers'


const router = express.Router()

router.post(
  '/login/google',
  passport.authenticate('google-id-token'),
  (req, res) => {
    // console.log('req.body: ', req.body, 'res: ', res)
  })
// googleLogin)

router.post('/signup', signup)
router.post('/login', login)

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => res.send(req.user))


//KEEP THESE ROUTES ON TOP!!
// router.post('/forgotPassword', forgotPassword)
// router.patch('/resetPassword/:token', resetPassword)

router.use(protect) //remove for testing
router.get('/profile', getProfile)
router.patch('/profile', updateProfile)

router.use(admin) //remove for testing
router.get('/', findAll)
router.get('/:userId', findById)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
