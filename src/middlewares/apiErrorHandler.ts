import { Request, Response, NextFunction } from 'express';

import ApiError from '../helpers/apiError';
import logger from '../util/logger';

export default function (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.source) {
    logger.error(error.source);
  }

  //const statusCode = error.statusCode || 500;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: error.message
  });
}
