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
});

export const Order = mongoose.model<TOrder>('Order', CategorySchema);

// import mongoose, { Document, Schema } from 'mongoose';

// // Define the interface for individual items in the order summary
// interface IOrderItem {
//   name: string;
//   quantity: number;
//   price: string;
// }

// // Define the interface for shipping details
// interface IShippingDetails {
//   address: string;
//   email: string;
//   name: string;
//   paymentMethod: string;
//   phone: string;
// }

// // Define the interface for the order (including order items, shipping details, and total price)
// export interface IOrder extends Document {
//   orderSummary: IOrderItem[];
//   shippingDetails: IShippingDetails;
//   totalPrice: string; // Store price as string for precision (you could also use Number if you prefer)
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Create the Mongoose schema for order item
// const OrderItemSchema = new Schema<IOrderItem>({
//   name: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   price: { type: String, required: true }, // Storing price as string for accuracy
// });

// // Create the Mongoose schema for shipping details
// const ShippingDetailsSchema = new Schema<IShippingDetails>({
//   address: { type: String, required: true },
//   email: { type: String, required: true },
//   name: { type: String, required: true },
//   paymentMethod: { type: String, required: true },
//   phone: { type: String, required: true },
// });

// // Create the Mongoose schema for the order
// const OrderSchema = new Schema<IOrder>(
//   {
//     orderSummary: { type: [OrderItemSchema], required: true },
//     shippingDetails: { type: ShippingDetailsSchema, required: true },
//     totalPrice: { type: String, required: true }, // Store price as string
//   },
//   { timestamps: true }
// ); // `timestamps` will automatically add `createdAt` and `updatedAt` fields

// // Create the Mongoose model for the order
// const Order = mongoose.model<IOrder>('Order', OrderSchema);

// export default Order;
