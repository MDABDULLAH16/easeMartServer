// import mongoose, { Schema, Document } from 'mongoose';

// interface IOrder extends Document {
//     user: {
//         name: string,
//         email: string,
//         phone: string,
//         address: string
//     };
//     products: Array<{
//         product: mongoose.Schema.Types.ObjectId;
//         quantity: number;
//     }>;
  
//     totalPrice: number;
//     status: string;
//     paymentStatus: string;
//     transactionId: string;
// }

// const OrderSchema: Schema = new Schema({
//     user: {
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         phone: { type: String, required: true },
//         address: { type: String, required: true },
//     },
//     products: [
//         {
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Product',
//                 required: true
//             },
//             quantity: {
//                 type: Number,
//                 required: true
//             },
//         }
//     ],
//     totalPrice: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
//         default: 'Pending'
//     },
//     paymentStatus: {
//         type: String,
//         enum: ['Pending', 'Paid', 'Failed'],
//         default: 'Pending'
//     },
//     transactionId: {
//         type: String,
//         required: true
//   },
//   isDeleted: { type: Boolean, default: false },
// }, {
//     timestamps: true
// });

// export default mongoose.model<IOrder>('Order', OrderSchema);

// models/Order.ts
import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for the Order document
export interface IOrder extends Document {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: Array<{
    product: Types.ObjectId; // Reference to the Product model
    quantity: number;
  }>;
  totalPrice: number;
  paymentMethod?: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  status: "Pending" | "Shipped" | "Completed" | "Cancelled";
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const OrderSchema = new Schema<IOrder>(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    // paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transactionId: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Create and export the model
export const Order = mongoose.model<IOrder>("Order", OrderSchema);