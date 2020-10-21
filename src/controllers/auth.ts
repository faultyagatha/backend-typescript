import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import {
  BadRequestError,
  AppError,
  JWTError
} from '../helpers/apiError'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'

/** JWT handlers */
const signToken = (id: string): string => {
  try {
    return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
      expiresIn: process.env['JWT_EXPIRES_IN'] as string,
    })
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new JWTError('Invalid Token. Please login again', err)
    } else {
      throw new AppError()
    }
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
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' })
    }
    const user: UserDocument = new User({
      email,
      password,
      passwordConfirm,
    })
    await UserService.create(user)
    createSendToken(user, 201, res)

  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Passwords do not match', err))
    }
    else next(new AppError())
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
    if (!email || !password) {
      return next(new BadRequestError('Please provide email and password'))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || !user.isCorrectPassword(password)) {
      return next(new BadRequestError('Invalid login data'))
    }
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
    const user = req.user as UserDocument
    if (!user) {
      return next(new BadRequestError('You are not autorised with google'))
    }
    createSendToken(user, 200, res)
    // res.send(user)
  } catch (err) {
    next(new BadRequestError('User is not found'))
  }
}
/*
PATCH/ users/forgotPassword
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
      new AppError('Error sending the email. Try again later')
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
*/