import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createCategoryZodSchema,
  updateCategoryZodSchema,
} from './category.validation';
import { categoryController } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(createCategoryZodSchema),
  categoryController.createCategory
);

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getSingleCategory);

router.patch(
  '/:id',
  validateRequest(updateCategoryZodSchema),
  categoryController.updateCategory
);

router.delete('/:id', categoryController.deleteCategory);

export const CategoryRouter = router;
