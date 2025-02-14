import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    userName: z.string().min(1, 'User Name is required'),
    productId: z.string().min(1, 'Product ID is required'),
    description: z.string().min(1, 'Description is required'),
    star: z
      .number()
      .min(1, 'Star must be at least 1')
      .max(5, 'Star cannot exceed 5'),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    star: z.number().min(1).max(5).optional(),
  }),
});
