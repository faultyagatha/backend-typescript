import express from 'express'

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
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/auth'
import { isLoggedin } from '../middlewares/authHandlers'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

//KEEP THESE ROUTES ON TOP!!
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updatePassword', isLoggedin, updatePassword)
router.patch('/updateMyAccount', isLoggedin, updateMyAccount)
router.patch('/deleteMyAccount', isLoggedin, deleteMyAccount)

router.get('/', findAll)
router.get('/:userId', findById)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
