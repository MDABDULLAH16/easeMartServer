import { z } from 'zod';

// Zod schema for creating a product
export const createProductZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string(),
    price: z.number().min(0, 'Price must be non-negative'),
    stockQuantity: z.number().min(0, 'Stock quantity must be non-negative'),
    category: z.string().min(1, 'Category is required'),
    image: z.string().min(1, 'Images field is required'),
    isDeleted: z.boolean().optional(),
  }),
});
// export const createCategoryZodSchema = z.object({
//   body: z.object({
//     name: z.string().min(1, 'Category name is required'),
//     description: z.string().optional(),
//     image: z.string().optional(),
//   }),
// });

// Zod schema for updating a product
export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  stockQuantity: z.number().min(0).optional(),
  category: z.string().optional(),
  image: z.string().optional(),
});

// Export types for parsed input data

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
