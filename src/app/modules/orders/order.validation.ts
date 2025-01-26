import { z } from 'zod';

export const createOrderZodSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    productId: z.string().min(1, 'Product ID is required'),
    productName: z.string().min(1, 'Product name is required'),
    userName: z.string().min(1, 'User name is required'),
    userAddress: z.string().min(1, 'User Address is required'),
    email: z.string().email('Valid email is required'),
    quantity: z.number().positive('Quantity must be a positive number'),
    price: z.number().positive('Price must be a positive number'),
    isDeleted: z.boolean().optional(),
  }),
});

export const updateOrderZodSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    productId: z.string().optional(),
    productName: z.string().min(1, 'Product name is required').optional(),
    userName: z.string().optional(),
    userAddress: z.string().optional(),
    email: z.string().email('Valid email is required').optional(),
    quantity: z
      .number()
      .positive('Quantity must be a positive number')
      .optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    isDeleted: z.boolean().optional(),
  }),
});
