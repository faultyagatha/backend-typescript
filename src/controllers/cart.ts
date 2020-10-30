import { Request, Response, NextFunction } from 'express';

import {
  NotFoundError,
  BadRequestError,
  AppError,
} from '../helpers/apiError';
import Cart from '../models/Cart';
import CartService from '../services/cart';

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CartService.findAll());
  } catch (err) {
    next(new NotFoundError('User cart is not found', err));
  }
};