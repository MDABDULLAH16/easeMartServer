import mongoose, {  Schema,  } from 'mongoose';
import { TProduct } from './products.interface';

// export interface TProduct extends Document {
//   name: string;
//   description: string;
//   price: number;
//   stockQuantity: number;
//   category: Types.ObjectId;
//   image: string;
//   isDeleted: boolean;
// }

// Mongoose Product Schema
const CreateProductSchema: Schema = new Schema<TProduct>({
  name: { type: String,  },
  description: { type: String },
  image: { type: String },
  price: { type: Number },
  stockQuantity: { type: Number },
  // category: {type:String},
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  isDeleted: { type: Boolean, default: false }, // Default to false
});

export const Product = mongoose.model<TProduct>('Product', CreateProductSchema);
