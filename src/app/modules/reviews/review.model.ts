import mongoose, { Schema } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    userName: { type: String, required: true },
    productId: { type: String, required: true },
    description: { type: String, required: true },
    star: { type: Number, required: true, min: 1, max: 5 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', reviewSchema);
