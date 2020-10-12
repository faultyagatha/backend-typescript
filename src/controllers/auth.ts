import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  JWTError,
  UnauthorizedError,
} from '../helpers/apiError'

import { sendEmail } from '../util/email'
import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import { Payload } from '../types/fbgraph'

/** JWT handlers */
const signToken = (id: string): string => {
  try {
    return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
      expiresIn: process.env['JWT_EXPIRES_IN'] as string,
    })
  } catch (err) {
    if (err.name === 'JsonWebTokenError')
      throw new JWTError('Invalid Token. Please login again', err)
    else throw new InternalServerError('Internal Server Error', err)
  }
}

const createSendToken = (
  user: UserDocument,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user._id)
  const JWT_COOKIE_EXPIRES_IN = process.env['JWT_COOKIE_EXPIRES_IN'] as unknown
  const cookieOptions = {
    expires: new Date(
      Date.now() + (JWT_COOKIE_EXPIRES_IN as number) * 24 * 60 * 60 * 1000 //convert to milsec
    ),
    secure: false,
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  // Remove password from output
  const { email, products, firstName, lastName, isAdmin } = user
  res.status(statusCode).json({
    email,
    products,
    firstName,
    lastName,
    isAdmin,
    token
  })
}

/** RESTful handlers */
//POST / users/signup
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, passwordConfirm } = req.body
    const user: UserDocument = new User({
      email,
      password,
      passwordConfirm,
    })

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' })
    }
    //TODO: check this one
    //await UserService.create(user)
    createSendToken(user, 201, res)
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Passwords do not match', err))
    }
    else next(new InternalServerError('Internal Server Error', err))
  }
}

//POST / users/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    //1). Check if email & password exist
    if (!email || !password) {
      return next(new BadRequestError('Please provide email and password'))
    }

    //2). Check is user exists & the password is correct
    const user = await User.findOne({ email }).select('+password')
    if (!user || !user.isCorrectPassword(password, user.password)) {
      return next(new BadRequestError('Invalid login data'))
    }

    //3). If successful send token to a client
    createSendToken(user, 200, res)

  } catch (err) {
    new BadRequestError('User is not found')
  }
}

//POST/ users/login/google
export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body
    console.log(user)
    //1). Check if there is a response
    if (!user) {
      return next(new BadRequestError('Please provide email and password'))
    }
    //3). If successful send token to a client
    res.send(user)
    //createSendToken(user, 200, res)
  } catch (err) {
    new BadRequestError('User is not found')
  }
}

//PATCH/ users/forgotPassword
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1). Get a user based on POSTed email
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(
      new BadRequestError('There is no user with this email address')
    )
  }
  // 2). Generate random reset token
  const resetToken = user.createPasswordResetToken()
  //important: set <validateBeforeSave> to false to bypass the validators
  await user.save({ validateBeforeSave: false })
  // console.log(user)

  // 3). Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}` //TODO: refactor later
  const message = `Submit a request with your new password to: ${resetURL} if you forgot your password.`
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    })
    res.json({
      status: 'success',
      message: 'Token sent to email.',
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(
      new InternalServerError('Error sending the email. Try again later')
    )
  }
}

//POST / users/resetPassword
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1). Get a user based on the token and check if the token has not expired
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex')
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })

    // 2). If token is valid and there is a user set a new password
    if (!user) {
      return next(new BadRequestError('Token is invalid or has expired'))
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // 3). Update changedPasswordAt: implemented on a User model

    // 4). Log the user in and send JWT
    createSendToken(user, 200, res)
  } catch (err) {
    next(new BadRequestError('Invalid Request', err))
  }
}

//PATCH / users/updatePassword
export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1). Get a user from the collection
    const { passwordCurrent, password, passwordConfirm } = req.body
    const userReq = req.user as Payload //thanks @Giang for this!
    const user = await User.findById(userReq.id).select('+password')
    if (!user) {
      return next(new NotFoundError('Please login to update your password'))
    }
    // 2). Check if the POSTed password is correct (security matters)
    if (!user.isCorrectPassword(passwordCurrent, user.password)) {
      return next(new UnauthorizedError('Your current password is wrong.'))
    }
    // 3). Update the password
    user.password = password
    user.passwordConfirm = passwordConfirm
    await user.save()
    // 4). Login the user and send a Jwt
    createSendToken(user, 200, res)
  } catch (err) {
    next(new BadRequestError('Invalid Request', err))
  }
}
