import mongoose, { Document, Schema, Types } from 'mongoose';

export interface TProduct extends Document {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Types.ObjectId;
  image: string;
  isDeleted: boolean;
}

// Mongoose Product Schema
const CreateProductSchema: Schema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number },
  stockQuantity: { type: Number },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  isDeleted: { type: Boolean, default: false }, // Default to false
});

export const Product = mongoose.model<TProduct>('Product', CreateProductSchema);
