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
  googleLogin
} from '../controllers/auth'
import {
  protect, admin
} from '../middlewares/authHandlers'


const router = express.Router()

router.post(
  '/login/google',
  passport.authenticate('google-id-token', { session: false }),
  // (req, res) => {
  //     try {
  //       console.log('req.user:', typeof (req.user))
  //       res.status(200).json(req.user)
  //     } catch (err) {
  //       console.log('ERROR OVER HERE:', Object.keys(err))
  //     }
  //   }
  // )
  googleLogin)

router.post('/signup', signup)
router.post('/login', login)

router.use(protect) //remove for testing
router.get('/profile', getProfile)
router.patch('/profile', updateProfile)

router.use(admin) //remove for testing
router.get('/', findAll)
router.get('/:userId', findById)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
