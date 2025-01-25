import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Zod schema for validation
export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  stockQuantity: z.number().min(0, 'Stock quantity must be non-negative'),
  category: z.string(),
  images: z.string(),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  stockQuantity: z.number().min(0).optional(),
  category: z.string().optional(),
  images: z.string().optional(),
});

// Mongoose Product Schema
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    images: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Mongoose Product Model
const Product = mongoose.model<ProductDocument>('Product', productSchema);

// Type for the product document
export interface ProductDocument extends Document {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  images: string;
}

export default Product;
