import { z } from 'zod';

export const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required'),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
