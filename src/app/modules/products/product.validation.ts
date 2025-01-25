/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { createProductSchema, updateProductSchema } from './products.model';

const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createProductSchema.parse(req.body);
    next();
  } catch (error: any) {
    // Extracting error messages from Zod validation
    const validationErrors = error.errors
      ? error.errors.map((err: any) => err.message).join(', ')
      : 'Invalid data format';

    next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `Validation failed: ${validationErrors}`
      )
    );
  }
};

const validateUpdateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateProductSchema.parse(req.body);
    next();
  } catch (error: any) {
    // Extracting error messages from Zod validation
    const validationErrors = error.errors
      ? error.errors.map((err: any) => err.message).join(', ')
      : 'Invalid data format';

    next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `Validation failed: ${validationErrors}`
      )
    );
  }
};

export { validateCreateProduct, validateUpdateProduct };
