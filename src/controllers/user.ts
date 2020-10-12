import { Request, Response, NextFunction } from 'express'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import { Payload } from '../types/fbgraph'

//GET / users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (err) {
    next(new NotFoundError('Not found', err))
  }
}

//GET / users/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//PATCH / users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const { userId } = req.params

    const updatedUser = await UserService.updateUser(userId, update)
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//DELETE / users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res
      .status(204)
      .json({
        status: 'success',
        data: null,
      })
      .end()
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//GET / users/profile
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userReq = req.user as Payload
    const user = await UserService.findById(userReq.id)
    if (user) {
      res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      })
    }
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//PATCH / users/profile
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, passwordConfirm } = req.body
  if (password || passwordConfirm) {
    return next(
      new UnauthorizedError('For password update, use updatePassword option.')
    )
  }
  // 2) Leave only fields that are allowed to be updated
  const { firstName, lastName, email, products } = req.body
  const allowedToUpdate = {
    firstName,
    lastName,
    email,
    products,
  }
  try {
    // 3) Update user document
    const userReq = req.user as Payload
    const updatedUser = await UserService.updateProfile(
      userReq.id,
      allowedToUpdate
    )
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      },
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('User name and email cannot be empty', err))
    }
    next(new NotFoundError('User not found', err))
  }
}

//DELETE / users/deleteMyAccount
export const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userReq = req.user as Payload
    console.log('userReq: ', userReq)
    await UserService.deleteProfile(userReq.id)
    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}
