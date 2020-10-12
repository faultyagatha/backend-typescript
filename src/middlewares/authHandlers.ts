import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  JWTError,
} from '../helpers/apiError'

import User from '../models/User'

/** Middleware Access handlers */
export const isLoggedin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) Get a token and check of it's there
    let token = null
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      //take only 'Bearer'
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return next(new UnauthorizedError('You are not logged in'))
    }

    // 2) Verification token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt.verify(token, process.env['JWT_SECRET'] as string)

    // 3) Check if a user still exists
    const currentUser = await User.findById(decoded.id).select('-password')
    // console.log(currentUser)
    if (!currentUser) {
      return next(
        new JWTError('The user with this token does no longer exist.')
      )
    }

    // // 4) Check if a user changed the password
    // if (currentUser.isChangedPassAfterJwt(decoded.iat)) {
    //   return next(
    //     new JWTError('The user has changed the password. Please login again.')
    //   )
    // }

    // 5) Grant access to protected route and pass the role to the next middleware
    req.user = currentUser
    req.body.isAdmin = currentUser.isAdmin
    next()
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', err))
    } else {
      next(new InternalServerError('Internal Server Error', err))
    }
  }
}

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new BadRequestError('Invalid Request'))
    }
    const role = req.body.role as string
    console.log(role)
    if (!roles.includes(role)) {
      return next(new UnauthorizedError('You do not have permissions'))
    } else {
      next()
    }
  }
}
