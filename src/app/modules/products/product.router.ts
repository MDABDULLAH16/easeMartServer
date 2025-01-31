import express from 'express';

// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';

import { productController } from './products.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  // createProductZodSchema,
  updateProductSchema,
} from './product.validation';

const router = express.Router();

// Create a product (Admin-only access)
router.post(
  '/',

  //   auth(USER_ROLE.admin),
  // validateRequest(createProductZodSchema),
  productController.createProduct
);

// Get all products (Public access)
router.get('/', productController.getAllProducts);

// Get a single product by ID (Public access)
router.get('/:_id', productController.getSingleProduct);

// Update a product by ID (Admin-only access)
router.put(
  '/:_id',
  validateRequest(updateProductSchema),
  //   auth(USER_ROLE.admin),
  productController.updateProduct
);

// Delete a product by ID (Admin-only access)
router.delete('/:_id',
  // auth(USER_ROLE.admin),
  productController.deleteProduct);

export const ProductRoute = router;
