import express from 'express';
import passport from 'passport';

import '../config/passport';

import {
  findById,
  deleteUser,
  findAll,
  getProfile,
  updateUser,
  updateProfile
} from '../controllers/user';
import {
  signup,
  login,
  googleLogin
} from '../controllers/auth';
import {
  protect, admin
} from '../middlewares/authHandlers';


const router = express.Router();

router.post(
  '/login/google',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin);

router.post('/signup', signup);
router.post('/login', login);

router.use(protect);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);

router.use(admin);
router.get('/', findAll);
router.get('/:userId', findById);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
