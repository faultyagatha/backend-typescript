import { Request, Response, NextFunction } from 'express'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'

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
        message: 'user deleted',
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
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    products } = req.body

  const allowedToUpdate = {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    products,
  }
  try {
    const userReq = req.user as Payload
    const updatedUser = await UserService.updateProfile(
      userReq.id,
      allowedToUpdate
    )
    res.status(200).json({
      updatedUser
    })
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}