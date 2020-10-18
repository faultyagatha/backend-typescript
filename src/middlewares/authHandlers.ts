import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import {
  BadRequestError,
  AppError,
  UnauthorizedError,
  JWTError,
} from '../helpers/apiError'

import User from '../models/User'
import { AdminPayload } from '../types/fbgraph'

/** Middleware Access handlers */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1) Get a token and check of it's in the DB
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //take only 'Bearer'
      token = req.headers.authorization.split(' ')[1]
      console.log('token in headers from backend: ', token)
      if (!token) {
        return next(new UnauthorizedError('You are not logged in'))
      }
      // 2) Verification token
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(token, process.env['JWT_SECRET'] as string)
      console.log('decoded: ', decoded)
      // 3) Check if a user still exists
      const currentUser = await User.findById(decoded.id).select('-password')
      console.log('currentUser with token: ', currentUser)
      if (!currentUser) {
        return next(
          new JWTError('The user with this token does no longer exist.')
        )
      }
      // 4) Grant access to protected route and pass the role to the next middleware
      req.user = currentUser
      next()
    } catch (err) {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid Request', err))
      } else {
        next(new AppError())
      }
    }
  }
  else {
    return next(new UnauthorizedError('No token in the header'))
  }
}

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminReq = await req.user as AdminPayload
  if (req.user && adminReq.isAdmin) {
    next()
  } else {
    return next(new UnauthorizedError('You do not have permissions'))
  }
}
