import { Request, Response, NextFunction } from 'express';
import {
  NotFoundError,
  BadRequestError,
  AppError,
} from '../helpers/apiError';

import Product from '../models/Product';
import ProductService from '../services/product';

//GET / products
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findAll());
  } catch (err) {
    next(new NotFoundError('Products not found', err));
  }
};

//GET / products/:productId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findById(req.params.productId));
  } catch (err) {
    next(new NotFoundError('Product not found', err));
  }
};

//PATCH / products/:productId
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const productId = req.params.productId;
    // console.log(productId)
    const updatedProduct = await ProductService.update(productId, update);
    res.status(201).json(updatedProduct);
  } catch (err) {
    next(new NotFoundError('Product not found', err));
  }
};

//DELETE / products/:productId
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProduct(req.params.productId);
    res.status(204).end();
  } catch (err) {
    next(new NotFoundError('Product not found', err));
  }
};

// POST /products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      imageCover,
      description,
      duration,
      distance,
      price,
    } = req.body;

    const product = new Product({
      name,
      imageCover,
      description,
      duration,
      distance,
      price,
    });

    await ProductService.create(product);
    res.json(product);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(new AppError());
    }
  }
};

//POST / products/order
export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, userId } = req.body;
    console.log('PLACE ORDER REQ BODY: ', req.body);
    const order = await ProductService.placeOrder(productId, userId);
    console.log('ORDER: ', order);
    res.json(order);
  } catch (err) {
    next(new NotFoundError('Product or user is not found', err));
  }
};
