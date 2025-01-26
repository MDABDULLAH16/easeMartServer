import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  image?: string;
  isDeleted: boolean;
}

const CategorySchema: Schema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  isDeleted: { type: Boolean, default: false }, // Default to false
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
