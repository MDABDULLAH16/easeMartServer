import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const CategorySchema: Schema = new Schema<TOrder>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: { type: String, required: true },
  userAddress: { type: String, required: true },
  email: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number },
  isDeleted: { type: Boolean },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
    default: 'Pending'
},
paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
},
transactionId: {
    type: String,
    required: true
},
});

export const Order = mongoose.model<TOrder>('Order', CategorySchema);
